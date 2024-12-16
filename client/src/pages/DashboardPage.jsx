import { useEffect, useState } from "react";
import axios from "../api/api.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TaskHelper from "../helper/taskHelper";
import CowHelper from '../helper/cowHelper.js';
import { Link } from "react-router-dom";


export const DashboardPage = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-8 mb-4 order-0">
                    <WelcomeCard />
                </div>
                <div className="col-md-4 mb-4 order-1">
                    <FinanceCard />
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 mb-4 order-0">
                    <StatusTasks />
                </div>
                <div className="col-md-4 mb-4 order-1">
                    <UpcomingDeadlineTask />
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 mb-4 order-0">
                    <Cows />
                </div>
                <div className="col-md-4 mb-4 order-1">
                    <Tasks />
                </div>
            </div>
        </>
    );
};

const WelcomeCard = () => {
    return (
        <>
            <div className="card">
                <div className="d-flex align-items-end row">
                    <div className="col-sm-7">
                        <div className="card-body">
                            <h3 className="card-title text-primary">
                                Selamat Datang Andrianto 🎉
                            </h3>
                            <p className="mb-4">
                                Anda telah melakukan 72% lebih banyak tugas hari ini.
                                Periksa tugas baru anda di Kalender anda.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                            <img aria-label='dsahboard icon image'
                                src="/assets/img/illustrations/man-with-laptop-light.png"
                                height="140"
                                alt="View Badge User"
                                data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                data-app-light-img="illustrations/man-with-laptop-light.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const FinanceCard = () => {
    return (
        <>
            <div className="row">
                {/* Pendapatan  */}
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img aria-label='dsahboard icon image'
                                        src="/assets/img/icons/unicons/profit.png"
                                        alt="chart success"
                                        className="rounded"
                                    />
                                </div>
                                <div className="dropdown">
                                    <button aria-label='Click me'
                                        className="btn p-0"
                                        type="button"
                                        id="cardOpt3"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="cardOpt3"
                                    >
                                        <a aria-label="view more" className="dropdown-item" href="#">
                                            View More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span className="fw-medium d-block mb-1">Pendapatan</span>
                            <h5 className="card-title text-nowrap mb-2">Rp. 24.000.000</h5>
                        </div>
                    </div>
                </div>

                {/* Pengeluaran card */}
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img aria-label='dsahboard icon image'
                                        src="/assets/img/icons/unicons/sales.png"
                                        alt="Credit Card"
                                        className="rounded"
                                    />
                                </div>
                                <div className="dropdown">
                                    <button aria-label='Click me'
                                        className="btn p-0"
                                        type="button"
                                        id="cardOpt6"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="cardOpt6"
                                    >
                                        <a aria-label="view more" className="dropdown-item" href="#">
                                            View More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span className="fw-medium d-block mb-1">Pengeluaran</span>
                            <h5 className="card-title text-nowrap mb-1">Rp. 24.000.000</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const StatusTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axios.get('/task');

                // categorize tasks based on status
                const tasks = {
                    total: response.data.data.length,
                    pending: response.data.data.filter(task => task.status === 0).length,
                    inProgress: response.data.data.filter(task => task.status === 1).length,
                    completed: response.data.data.filter(task => task.status === 2).length,
                };
    
                setTasks(tasks);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    
        getTasks();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between" style={{ paddingBottom:"1px" }}>
                    <h5 className="card-title m-0 me-2">Status</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {/* 3 rounded card with icon at left side for each card */}
                        <div className="col-md-3">
                            <div className="card bg-primary">
                                <div className="card-body d-flex align-items-center">
                                    <div className="avatar flex-shrink-0 me-3">
                                        <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                            <i className="bx bx-task text-primary"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-0 text-white">{tasks.total}</h4>
                                        <small className="text-white">Total Tugas</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card bg-primary">
                                <div className="card-body d-flex align-items-center">
                                    <div className="avatar flex-shrink-0 me-3">
                                        <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                            <i className="bx bx-task text-primary"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-0 text-white">{tasks.completed}</h4>
                                        <small className="text-white">Tugas Selesai</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card bg-primary">
                                <div className="card-body d-flex align-items-center">
                                    <div className="avatar flex-shrink-0 me-3">
                                        <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                            <i className="bx bx-task text-primary"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-0 text-white">{tasks.inProgress}</h4>
                                        <small className="text-white">Tugas Proses</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card bg-primary">
                                <div className="card-body d-flex align-items-center">
                                    <div className="avatar flex-shrink-0 me-3">
                                        <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                            <i className="bx bx-task text-primary"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-0 text-white">{tasks.pending}</h4>
                                        <small className="text-white">Tugas Pending</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const UpcomingDeadlineTask = () => {
    const [upcomingTask, setUpcomingTask] = useState(null);

    useEffect(() => {
        const getUpcomingTask = async () => {
            try {
                const response = await axios.get('/task/upcoming');
                if (response.data.data.length > 0) {
                    setUpcomingTask({
                        title: response.data.data[0].title,
                        deadline: response.data.data[0].deadline,
                        priority: response.data.data[0].priority,
                        status: response.data.data[0].status,
                    });
                } else {
                    setUpcomingTask(null);
                }
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getUpcomingTask();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            {upcomingTask === null
                                ? (
                                    <>
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title m-0 mb-2">Event -</h5>
                                        <h5 className="card-title m-0 mb-2 ms-2"><b>Title Event</b></h5>
                                    </div>
                                        <hr />
                                    <div className="d-flex align-items-center">
                                        <i class='bx bx-time me-3'></i>
                                    <div>
                                        <p className="text-start mb-0">Date : 9/12/2024 - 11/12/2024</p>
                                        <p className="text-start mb-0">Time : 2:00 PM - 3:00 PM</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-center">
                                    <i class='bx bx-list-ul me-3'></i>
                                    <p className="text-start mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit eius molestiae fugiat laboruptates deleniti.</p>
                                    </div>
                                    </>
                                )
                                :   (
                                    <>
                                        <div className="card-title d-flex align-items-start justify-content-between">
                                            <div className="flex-shrink-0">
                                                <h6 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0" }}>{upcomingTask.title}</h6>
                                                <small className="text-muted">{new Date(upcomingTask.deadline).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}</small>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className="text-start"><b>Date of Event:</b> {new Date(upcomingTask.deadline).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <hr />
                                        <p className="text-start"><b>Event Details:</b> {upcomingTask.details}</p>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar flex-shrink-0 me-3">
                                                    <i className='bx bx-list-check text-primary' style={{ fontSize: "40px" }}></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Status</h6>
                                                </div>
                                            </div>
                                            <div className="badge bg-primary rounded-pill">{TaskHelper.getStatusLabel(upcomingTask.status)}</div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar flex-shrink-0 me-3">
                                                    <i className='bx bxs-pin text-primary' style={{ fontSize: "35px" }}></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Priority</h6>
                                                </div>
                                            </div>
                                            <div className="badge bg-warning rounded-pill bg-primary">{TaskHelper.getPriorityLabel(upcomingTask.priority)}</div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Cows = () => {
    const [cows, setCows] = useState([]);

    useEffect(() => {
        const getCows = async () => {
            try {
                const response = await axios.get('/cow');
                setCows(response.data.data);
            } catch (error) {
                console.log(error);
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getCows();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between pb-0">
                    <div className="card-title mb-0">
                        <h5 className="m-0 me-2">Sapi</h5>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive text-nowrap">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nama</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cows.map((cow, index) => (
                                    <tr key={cow.id}>
                                        <td>{index + 1}</td>
                                        <td>                     
                                            <Link to={`/ternak/${cow.id}`} className="text-primary">
                                            {cow.name}
                                            </Link></td>
                                        <td>  
                                            {new Date(cow.birth_date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td>{CowHelper.getStatusLabel(cow.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axios.get('/task');
                response.data.data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
                response.data.data = response.data.data.slice(0, 3);
                setTasks(response.data.data);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getTasks();
    }, []);

    return (
        <>
            <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title m-0 me-2">Aktivitas</h5>
                </div>
                <div className="card-body">
                    <ul className="p-0 m-0">
                        {tasks.map((task, index) => (
                            <li className="d-flex mb-4 pb-1" key={task.id}>
                                <div className="d-flex flex-column w-100">
                                    <div className="d-flex align-items-center ">
                                        <div className="me-3">
                                            <h6 className="mb-0">
                                                {new Date(task.deadline).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="card bg-primary">
                                        <div className="card-body d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                                    <i className='bx bx-injection'></i>
                                                </div>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 text-white">{task.title}</h6>
                                                <small className="text-white">{task.details}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

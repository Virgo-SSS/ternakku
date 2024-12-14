import { useEffect, useState } from "react";
import axios from "../api/api.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TaskHelper from "../helper/taskHelper";

export const DashboardPage = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg-8 mb-4 order-0">
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
                </div>

                {/* <!--/ Vertical Scrollbar --> */}
                <div className="col-lg-4 col-md-4 order-1">
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
                                                <a aria-label="delete" className="dropdown-item" href="#">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="fw-medium d-block mb-1">Pendapatan</span>
                                    <h5 className="card-title text-nowrap mb-2">Rp. 24.000.000</h5>
                                    <small className="text-success fw-medium">
                                        <i className="bx bx-up-arrow-alt"></i> +72.80%
                                    </small>
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
                                                <a aria-label="delete" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="fw-medium d-block mb-1">Pengeluaran</span>
                                    <h5 className="card-title text-nowrap mb-1">Rp. 24.000.000</h5>
                                    <small className="text-success fw-medium">
                                        <i className="bx bx-up-arrow-alt"></i> +28.42%
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <StatusTasks />

                {/* Upcoming Deadline Task */}
                <UpcomingDeadlineTask />
            </div>

            <div className="row">
                {/* Cows */}
                <Cows />
                
                {/* Tasks */}
                <Tasks />
            </div>
          
        </>
    );
};

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
            {/* Status */}
            <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
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
            {/* Sapi card */}
            <div className="col-md-6 col-lg-8 order-0 mb-4">
                <div className="card h-100">
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
                                            <td>{cow.name}</td>
                                            <td>
                                                {new Date(cow.birth_date).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td>{cow.status === 1 ? 'Sehat' : 'Tidak Sehat'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
            <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card">
                            <div className="card-body">
                                {upcomingTask === null
                                ?   ( <p className="text-center">Tidak ada tugas yang akan datang</p> )
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
            <div className="col-md-6 col-lg-4 order-2 mb-4">
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
            </div>
        </>
    )
}

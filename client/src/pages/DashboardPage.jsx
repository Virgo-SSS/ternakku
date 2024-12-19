import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TaskHelper from "../helper/taskHelper";
import CowHelper from '../helper/cowHelper.js';
import useAuth from "../hooks/useAuth.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
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
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <StatusTasks />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Cows />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 order-1">
                    <UpcomingDeadlineTask />
                </div>
            </div>
        </>
    );
};

const WelcomeCard = () => {
    const { auth } = useAuth();

    return (
        <>
            <div className="card">
                <div className="d-flex align-items-end row">
                    <div className="col-sm-7">
                        <div className="card-body">
                            <h3 className="card-title text-primary">
                                Selamat Datang {auth.user.name || 'user'} 🎉
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
                                        src="/assets/img/icons/profit.png"
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
                                        src="/assets/img/icons/sales.png"
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
    const axiosPrivate = useAxiosPrivate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axiosPrivate.get('/task');

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
    const axiosPrivate = useAxiosPrivate();
    const [upcomingTask, setUpcomingTask] = useState(null);

    useEffect(() => {
        const getUpcomingTask = async () => {
            try {
                const response = await axiosPrivate.get('/task/upcoming');

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
                            <div className="d-flex align-items-center mb-5">
                                <h5 className="card-title m-0 mb-2">Daftar Tugas Mendatang</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className='bx bx-list-ul me-3'></i>
                            <div>
                                <p className="text-start mb-0">Pakan Sapi</p>
                                <p className="text-start mb-0">20/12/2024</p>
                            </div>
                                <div className="badge bg-label-danger ms-auto">High</div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center">
                                <i className='bx bx-list-ul me-3'></i>
                            <div>
                            <p className="text-start mb-0">Bersihkan Kandang</p>
                            <p className="text-start mb-0">20/12/2024</p>
                            </div>
                                <div className="badge bg-label-danger ms-auto">High</div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center">
                                <i className='bx bx-list-ul me-3'></i>
                            <div>
                            <p className="text-start mb-0">Vaksin Sapi</p>
                            <p className="text-start mb-0">20/12/2024</p>
                                </div>
                                <div className="badge bg-label-warning ms-auto">Medium</div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center">
                                <i className='bx bx-list-ul me-3'></i>
                            <div>
                            <p className="text-start mb-0">Bersihkan Sapi</p>
                            <p className="text-start mb-0">20/12/2024</p>
                                </div>
                                <div className="badge bg-label-warning ms-auto">Medium</div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center">
                                <i className='bx bx-list-ul me-3'></i>
                            <div>
                            <p className="text-start mb-0">Timbang Sapi</p>
                            <p className="text-start mb-0">20/12/2024</p>
                                </div>
                                <div className="badge bg-label-success ms-auto">Low</div>
                            </div>
                            <hr />
                            <p className="text-center mb-0">
                                <Link to='/task'>Lihat Semua Tugas</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Cows = () => {
    const axiosPrivate = useAxiosPrivate();
    const [cows, setCows] = useState([]);

    useEffect(() => {
        const getCows = async () => {
            try {
                const response = await axiosPrivate.get('/cow');
                setCows(response.data.data);
            } catch (error) {
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
    const axiosPrivate = useAxiosPrivate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axiosPrivate.get('/task');
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
            
        </>
    )
}

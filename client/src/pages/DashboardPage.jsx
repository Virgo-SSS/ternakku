import { useEffect } from "react";

export const DashboardPage = () => {
    useEffect(() => {
        dashboardAnalitics();
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-lg-8 mb-4 order-0">
                    <div className="card">
                        <div className="d-flex align-items-end row">
                            <div className="col-sm-7">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        Congratulations John! 🎉
                                    </h5>
                                    <p className="mb-4">
                                        You have done <span className="fw-medium">72%</span> more
                                        sales today. Check your new badge in your profile.
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

                <div className="col-lg-4 col-md-4 order-1">
                    <div className="row">
                        {/* Pendapatan  */}
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/chart-success.png"
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
                                    <h5 className="card-title mb-2">Rp. 24.000.000</h5>
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
                                                src="/assets/img/icons/unicons/wallet-info.png"
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
                                    <span>Pengeluaran</span>
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
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {/* 3 rounded card with icon at left side for each card */}
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <img src="/assets/img/icons/unicons/chart.png" alt="Chart Icon" className="rounded" />
                                            </div>
                                            <div>
                                                <h6 className="mb-0">10</h6>
                                                <small className="text-muted">Total Tugas</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <img src="/assets/img/icons/unicons/wallet.png" alt="Wallet Icon" className="rounded" />
                                            </div>
                                            <div>
                                                <h6 className="mb-0">6</h6>
                                                <small className="text-muted">Tugas Selesai</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <img src="/assets/img/icons/unicons/cc-success.png" alt="Credit Card Icon" className="rounded" />
                                            </div>
                                            <div>
                                                <h6 className="mb-0">4</h6>
                                                <small className="text-muted">Tugas Belum Selesai</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PAYMENTS */}
                <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="flex-shrink-0">
                                            <h3>Vaksin buat mega</h3>
                                            <small className="text-muted">Friday, 18 october</small>
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt4"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="cardOpt4"
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
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <img src="/assets/img/icons/unicons/chart.png" alt="Status Icon" className="rounded" />
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Status</h6>
                                            </div>
                                        </div>
                                        <div className="badge bg-primary rounded-pill">Active</div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <img src="/assets/img/icons/unicons/chart.png" alt="Priority Icon" className="rounded" />
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Priority</h6>
                                            </div>
                                        </div>
                                        <div className="badge bg-warning rounded-pill">High</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* Sapi card */}
                <div className="col-md-6 col-lg-8 order-0 mb-4">
                    <div className="card h-100">
                        <div className="card-header d-flex align-items-center justify-content-between pb-0">
                            <div className="card-title mb-0">
                                <h5 className="m-0 me-2">Sapi</h5>
                                {/* <small className="text-muted">42.82k Total Sales</small> */}
                            </div>
                            <div className="dropdown">
                                <button aria-label='Click me'
                                    className="btn p-0"
                                    type="button"
                                    id="orederStatistics"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="orederStatistics"
                                >
                                    <a aria-label="select all " className="dropdown-item" href="#">
                                        Select All
                                    </a>
                                    <a aria-label="refresh" className="dropdown-item" href="#">
                                        Refresh
                                    </a>
                                    <a aria-label="share" className="dropdown-item" href="#">
                                        Share
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <div class="table-responsive text-nowrap">
                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Project</th>
                                            <th>Client</th>
                                            <th>Users</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><i class="bx bxl-angular bx-sm text-danger me-3"></i><span class="fw-medium">Angular
                                                    Project</span></td>
                                            <td>Albert Cook</td>
                                            <td>
                                                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                                        class="avatar avatar-xs pull-up" aria-label="Lilian Fuller"
                                                        data-bs-original-title="Lilian Fuller"><img aria-label="table image"
                                                            src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle"/></li>
                                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                                        class="avatar avatar-xs pull-up" aria-label="Sophia Wilkerson"
                                                        data-bs-original-title="Sophia Wilkerson"><img aria-label="table image"
                                                            src="../assets/img/avatars/6.png" alt="Avatar" class="rounded-circle"/></li>
                                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                                        class="avatar avatar-xs pull-up" aria-label="Christina Parker"
                                                        data-bs-original-title="Christina Parker"><img aria-label="table image"
                                                            src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle"/></li>
                                                </ul>
                                            </td>
                                            <td><span class="badge bg-label-primary me-1">Active</span></td>
                                            <td>
                                                <div class="dropdown"><button aria-label="Click me" type="button"
                                                        class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i
                                                            class="bx bx-dots-vertical-rounded"></i></button>
                                                    <div class="dropdown-menu"><a aria-label="dropdown action option" class="dropdown-item"
                                                            href="#"><i class="bx bx-edit-alt me-1"></i> Edit</a><a
                                                            aria-label="dropdown action option" class="dropdown-item" href="#"><i
                                                                class="bx bx-trash me-1"></i> Delete</a></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><i class="bx bxl-react bx-sm text-info me-3"></i> <span class="fw-medium">React Project</span>
                                            </td>
                                            <td>Barry Hunter</td>
                                            <td>
                                                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                                        class="avatar avatar-xs pull-up" aria-label="Lilian Fuller"
                                                        data-bs-original-title="Lilian Fuller"><img aria-label="table image"
                                                            src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle"/></li>
                                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                                        class="avatar avatar-xs pull-up" aria-label="Sophia Wilkerson"
                                                        data-bs-original-title="Sophia Wilkerson"><img aria-label="table image"
                                                            src="../assets/img/avatars/6.png" alt="Avatar" class="rounded-circle"/></li>
                                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                                        class="avatar avatar-xs pull-up" aria-label="Christina Parker"
                                                        data-bs-original-title="Christina Parker"><img aria-label="table image"
                                                            src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle"/></li>
                                                </ul>
                                            </td>
                                            <td><span class="badge bg-label-success me-1">Completed</span></td>
                                            <td>
                                                <div class="dropdown"><button aria-label="Click me" type="button"
                                                        class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i
                                                            class="bx bx-dots-vertical-rounded"></i></button>
                                                    <div class="dropdown-menu"><a aria-label="dropdown action option" class="dropdown-item"
                                                            href="#"><i class="bx bx-edit-alt me-1"></i> Edit</a><a
                                                            aria-label="dropdown action option" class="dropdown-item" href="#"><i
                                                                class="bx bx-trash me-1"></i> Delete</a></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aktivitas */}
                <div className="col-md-6 col-lg-4 order-2 mb-4">
                    <div className="card h-100">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="card-title m-0 me-2">Aktivitas</h5>
                            <div className="dropdown">
                                <button aria-label='Transactions'
                                    className="btn p-0"
                                    type="button"
                                    id="transactionID"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="transactionID"
                                >
                                    <a aria-label="dropdown item Last 28 Days" className="dropdown-item" href="#">
                                        Last 28 Days
                                    </a>
                                    <a aria-label="dropdown item Last Month" className="dropdown-item" href="#">
                                        Last Month
                                    </a>
                                    <a aria-label="dropdown item Last Year" className="dropdown-item" href="#">
                                        Last Year
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <ul className="p-0 m-0">
                                <li className="d-flex mb-4 pb-1">
                                    <div className="d-flex flex-column w-100">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="me-3">
                                                <h6 className="mb-0">12 Oct 2023</h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body d-flex align-items-center">
                                                <div className="avatar flex-shrink-0 me-3">
                                                    <img src="/assets/img/icons/unicons/chart.png" alt="Chart Icon" className="rounded" />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Task Title</h6>
                                                    <small className="text-muted">Task Description</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 pb-1">
                                    <div className="d-flex flex-column w-100">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="me-3">
                                                <h6 className="mb-0">12 Oct 2023</h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body d-flex align-items-center">
                                                <div className="avatar flex-shrink-0 me-3">
                                                    <img src="/assets/img/icons/unicons/chart.png" alt="Chart Icon" className="rounded" />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Task Title</h6>
                                                    <small className="text-muted">Task Description</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 pb-1">
                                    <div className="d-flex flex-column w-100">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="me-3">
                                                <h6 className="mb-0">12 Oct 2023</h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body d-flex align-items-center">
                                                <div className="avatar flex-shrink-0 me-3">
                                                    <img src="/assets/img/icons/unicons/chart.png" alt="Chart Icon" className="rounded" />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Task Title</h6>
                                                    <small className="text-muted">Task Description</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 pb-1">
                                    <div className="d-flex flex-column w-100">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="me-3">
                                                <h6 className="mb-0">12 Oct 2023</h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body d-flex align-items-center">
                                                <div className="avatar flex-shrink-0 me-3">
                                                    <img src="/assets/img/icons/unicons/chart.png" alt="Chart Icon" className="rounded" />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Task Title</h6>
                                                    <small className="text-muted">Task Description</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 pb-1">
                                    <div className="d-flex flex-column w-100">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="me-3">
                                                <h6 className="mb-0">12 Oct 2023</h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body d-flex align-items-center">
                                                <div className="avatar flex-shrink-0 me-3">
                                                    <img src="/assets/img/icons/unicons/chart.png" alt="Chart Icon" className="rounded" />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Task Title</h6>
                                                    <small className="text-muted">Task Description</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
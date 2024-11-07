export const DashboardPage = () => {
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
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between" style={{ paddingBottom:"1px" }}>
                            <h5 className="card-title m-0 me-2">Status</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {/* 3 rounded card with icon at left side for each card */}
                                <div className="col-md-4">
                                    <div className="card bg-primary">
                                        <div className="card-body d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                                    <i className="bx bx-task text-primary"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="mb-0 text-white">10</h3>
                                                <small className="text-white">Total Tugas</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card bg-primary">
                                        <div className="card-body d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                                    <i className="bx bx-task text-primary"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="mb-0 text-white">6</h3>
                                                <small className="text-white">Tugas Selesai</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card bg-primary">
                                        <div className="card-body d-flex align-items-center">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                                    <i className="bx bx-task text-primary"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="mb-0 text-white">4</h3>
                                                <small className="text-white">Tugas Belum Selesai</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vaksin */}
                <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="flex-shrink-0">
                                            <h6 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0" }}>Vaksin Buat Mega</h6>
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
                                                {/* <i className='bx bx-list-check text-primary' ></i> */}
                                                <i className='bx bx-list-check text-primary' style={{ fontSize: "40px" }}></i>
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
                                                <i className='bx bxs-pin text-primary' style={{ fontSize: "35px" }}></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Priority</h6>
                                            </div>
                                        </div>
                                        <div className="badge bg-warning rounded-pill bg-primary">High Priority</div>
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
                                        <tr>
                                            <td>1</td>
                                            <td>John Doe</td>
                                            <td>12 Oct 2023</td>
                                            <td>Sehat</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>John Doe</td>
                                            <td>12 Oct 2023</td>
                                            <td>Sakit</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>John Doe</td>
                                            <td>12 Oct 2023</td>
                                            <td>Sehat</td>
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
                                        <div className="d-flex align-items-center ">
                                            <div className="me-3">
                                                <h6 className="mb-0">12 Oct 2023</h6>
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
                                                    <h6 className="mb-0 text-white">Vaksin buat mega</h6>
                                                    <small className="text-white">10.30 - 12.00</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 pb-1">
                                    <div className="d-flex flex-column w-100">
                                        <div className="d-flex align-items-center">
                                            <div className="me-3">
                                                <h6 className="mb-0">12 Oct 2023</h6>
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
                                                    <h6 className="mb-0 text-white">Vaksin buat mega & Bima</h6>
                                                    <small className="text-white">10.30 - 12.00</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 pb-1">
                                    <div className="d-flex flex-column w-100">
                                        <div className="d-flex align-items-center">
                                            <div className="me-3">
                                                <h6 className="mb-0">12 Oct 2023</h6>
                                            </div>
                                        </div>
                                        <div className="card bg-primary">
                                            <div className="card-body d-flex align-items-center">
                                                <div className="avatar flex-shrink-0 me-3">
                                                    <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                                        <i className="bx bx-task text-primary"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 text-white">Obat buat kencana</h6>
                                                    <small className="text-white">10.30 - 12.00</small>
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
import { useEffect } from "react";

export const KeuanganPage = () => {
    useEffect(() => {
        dashboardAnalitics();
    }, [])
    return (
        <>  
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    <div className="card">
                        <div className="row row-bordered g-0">
                            <div className="col-md-8">
                                <h5 className="card-header m-0 me-2 pb-3">Total Revenue</h5>
                                <div id="totalRevenueChart" className="px-2"></div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-body">
                                    <div className="text-center">
                                        <div className="dropdown">
                                            <button aria-label='Years selection 2022'
                                                className="btn btn-sm btn-outline-primary dropdown-toggle"
                                                type="button"
                                                id="growthReportId"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                2022
                                            </button>
                                            <div
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="growthReportId"
                                            >
                                                <a aria-label="dropdown item 2021" className="dropdown-item" href="#">
                                                    2021
                                                </a>
                                                <a aria-label="dropdown item 2020" className="dropdown-item" href="#">
                                                    2020
                                                </a>
                                                <a aria-label="dropdown item 2019" className="dropdown-item" href="#">
                                                    2019
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="growthChart"></div>
                                <div className="text-center fw-medium pt-3 mb-2">
                                    62% Company Growth
                                </div>

                                <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                                    <div className="d-flex">
                                        <div className="me-2">
                                            <span className="badge bg-label-primary p-2">
                                                <i className="bx bx-dollar text-primary"></i>
                                            </span>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <small>2022</small>
                                            <h6 className="mb-0">$32.5k</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="me-2">
                                            <span className="badge bg-label-info p-2">
                                                <i className="bx bx-wallet text-info"></i>
                                            </span>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <small>2021</small>
                                            <h6 className="mb-0">$41.2k</h6>
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

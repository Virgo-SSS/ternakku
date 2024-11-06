import { Link } from "react-router-dom"

export const TernakPage = () => {
    return (
        
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h2 className="h4">Data Sapi</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/ternak/create">
                        <button type="button" className="btn btn-primary">Tambah Sapi</button>
                    </Link>
                </div>
            </div>
        
            <div className="card">
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" name="all" id="all" />
                                </th>
                                <th>Nama</th>
                                <th>Status</th>
                                <th>Tanggal Lahir</th>
                                <th>Jenis Sapi</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td>Albert Cook</td>
                                <td><span className="badge bg-label-primary me-1">Active</span></td>
                                <td>2024-10-12</td>
                                <td>Sapi simental</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td>Barry Hunter</td>
                                <td><span className="badge bg-label-success me-1">Completed</span></td>
                                <td>2024-10-12</td>
                                <td>Sapi simental</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
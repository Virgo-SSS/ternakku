import { Link } from "react-router-dom"

export const PekerjaPage = () => {
    return (
        
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h2 className="h4">Pekerja</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/pekerja/create">
                        <button type="button" className="btn btn-primary bg-[#93A603] onClick=={() => ">Tambah Pekerja</button>
                    </Link>
                </div>
            </div>
        
            <div className="card">
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr className="bg-[#93A603]">
                                <th>
                                    <input type="checkbox" name="all" id="all" />
                                </th>
                                <th className="text-white">Nama</th>
                                <th className="text-white">Jenis Kelamin</th>
                                <th className="text-white">Nomor HP</th>
                                <th className="text-white">Email</th>
                                <th className="text-white">Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td>Novi Kristianti</td>
                                <td>Perempuan</td>
                                <td>081399777913</td>
                                <td>kristinaaovi@gmail.com</td>
                                <td>Aktif</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td>Virgo Stevanus</td>
                                <td>Laki-laki</td>
                                <td>082170796602</td>
                                <td>Virgostevanus@gmail.com</td>
                                <td>Aktif</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
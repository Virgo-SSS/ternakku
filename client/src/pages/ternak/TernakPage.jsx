import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "../../api/api.js";
import { useEffect, useState } from "react";

export const TernakPage = () => {
    const [cows, setCows] = useState([]);

    const getCows = async () => {
        try {
            const response = await axios.get('/cow');
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

    useEffect(() => {
        getCows();
    }, []);

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
                <div className="text-nowrap">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Status</th>
                                <th>Jenis Kelamin</th>
                                <th>Tanggal Lahir</th>
                                <th>Berat Badan</th>
                                <th>Jenis Sapi</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {cows.map((cow, index) => (
                                <tr key={index}>
                                    <td>{cow.name}</td>
                                    <td>{cow.status}</td>
                                    <td>
                                        {cow.gender === 'M' ? 'Jantan' : 'Betina'}
                                    </td>
                                    <td>
                                        {new Date(cow.birth_date).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td>{cow.weight} Kg</td>
                                    <td>{cow.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
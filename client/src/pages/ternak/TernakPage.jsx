import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "../../api/api.js";
import { useEffect, useState } from "react";
import Modal from "react-modal"

// Set elemen root agar modal di-overlay pada elemen utama
Modal.setAppElement('#root')

export const TernakPage = () => {
    const [cows, setCows] = useState([]);

    // Function to get the list of cows
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
    };

    // Delete function for cows
    const handleDelete = async (id) => {
        // Confirmation before deleting
        await withReactContent(Swal).fire({
            title: 'Konfirmasi',
            text: 'Apakah anda yakin ingin menghapus data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/cow/${id}`);
                    setCows(cows.filter(cow => cow.id !== id));
                    withReactContent(Swal).fire({
                        title: 'Success',
                        text: 'Data sapi berhasil dihapus',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                } catch (error) {
                    withReactContent(Swal).fire({
                        title: 'Error',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };

    // Load cows on component mount
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
                        <button type="button" className="btn btn-primary bg-primary ">Tambah Sapi</button>
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
                                <th>Action</th> {/* Action column for edit and delete */}
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {cows.map((cow, index) => (
                                <tr key={index}>
                                    <td>
                                    <Link to={`/ternak/${cow.id}`} className="text-primary">
                                        {cow.name}
                                    </Link>
                                    </td>
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
                                    <td>
                                        <Link to={`/ternak/edit/${cow.id}`} className="btn btn-sm btn-warning">
                                            <i className="bx bx-edit"></i>
                                        </Link>
                                        |
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cow.id)}>
                                            <i className="bx bx-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useState } from "react";
import CowHelper from "../../helper/cowHelper";
import Flatpickr from "react-flatpickr";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

export const CowPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [cows, setCows] = useState([]);
    const [isFilterLoading, setIsFilterLoading] = useState(false);

    const handleFilter = async (e) => {
        e.preventDefault();
        setIsFilterLoading(true);

        sleep(5000).then(() => {
            setIsFilterLoading(false);
        });
    }

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
                await axiosPrivate.delete(`/cow/${id}`);

                setCows(cows.filter((cow) => cow.id !== id));

                withReactContent(Swal).fire({
                    title: 'Success',
                    text: 'Data sapi berhasil dihapus',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text:
                        error.response?.data?.message ||
                        error.message ||
                        'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            }
        });
    };

    useEffect(() => {
        // Function to get the list of cows
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
        };

        getCows();
    }, []);

    return (
        <>
            <div className="row">
                <form onSubmit={handleFilter}>
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="name"><b>Nama</b></label>
                                        <input type="text" name="name" id="name" className="form-control" placeholder="Nama Sapi" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="status"><b>Status</b></label>
                                        <select name="status" id="status" className="form-select">
                                        <option value="" disabled selected>Pilih Status</option>
                                            <option value="1">Sehat</option>
                                            <option value="0">Tidak Sehat</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-2 p-auto">
                                        <label htmlFor="status" className="form-label"><b>Tanggal Lahir</b></label>
                                        <Flatpickr
                                            value={new Date()}
                                            options={{
                                                altInput: true,
                                                dateFormat: 'Y-m-d',
                                                enableTime: false,
                                                mode: 'range',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="gender"><b>Jenis Kelamin</b></label>
                                        <select name="gender" id="gender" className="form-select">
                                        <option value="" disabled selected>Pilih Jenis Kelamin</option>
                                            <option value="M">Jantan</option>
                                            <option value="F">Betina</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-secondary me-2">Reset</button>
                                <button type="submit" className="btn btn-primary">Search</button>
                                {
                                    isFilterLoading && (
                                        <div className="spinner-border text-primary ms-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="d-flex justify-content-between align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h2 className="h4 ">Data Sapi</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/ternak/create">
                        <button type="button" className="btn btn-primary bg-primary">Tambah Sapi</button>
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
                                <th>Action</th>
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
                                <td>{CowHelper.getStatusLabel(cow.status)}</td>
                                <td>{cow.gender === 'M' ? 'Jantan' : 'Betina'}</td>
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
                                    <Link
                                        to={`/ternak/edit/${cow.id}`}
                                        className="btn btn-sm btn-warning"
                                    >
                                        <i className="bx bx-edit"></i>
                                    </Link>
                                    |
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(cow.id)}
                                    >
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
    );
};

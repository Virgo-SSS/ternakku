import React, { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import workerHelper from "../../helper/workerHelper.js";

export const WorkerPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [workers, setWorkers] = useState([]);
    const [isFilterLoading, setIsFilterLoading] = useState(false);
    const [filterData, setFilterData] = useState({
        name: '',
        gender: '',
        status: ''
    });

    const handleFilterChange = (e) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        });
    }

    const handleFilter = async (e) => {
        e.preventDefault();
        setIsFilterLoading(true);

        try {
            const response = await axiosPrivate.get('/worker', {
                params: filterData
            });

            setWorkers(response.data.data);
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response?.data?.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        
        setIsFilterLoading(false);
    }

    const handleResetFilter = (e) => {
        setFilterData({
            name: '',
            gender: '',
            status: ''
        });

        handleFilter(e);
    }

    const handleDelete = async (id) => {
        // Confirm dialog
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
                    await axiosPrivate.delete(`/worker/${id}`);
                    
                    setWorkers(workers.filter(worker => worker.id !== id));

                    withReactContent(Swal).fire({
                        title: 'Success',
                        text: 'Data berhasil dihapus',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                } catch (error) {
                    withReactContent(Swal).fire({
                        title: 'Error',
                        text: error.response?.data?.message || error.message || 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });

    }

    useEffect(() => {
        const getWorkers = async () => {
            try {
                const response = await axiosPrivate.get('/worker');
                setWorkers(response.data.data);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response?.data?.message || error.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getWorkers();
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
                                        <input type="text" name="name" id="name" value={filterData.name} onChange={handleFilterChange} className="form-control" placeholder="Nama Pekerja" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="gender"><b>Jenis Kelamin</b></label>
                                        <select name="gender" id="gender" className="form-select" value={filterData.gender} onChange={handleFilterChange}>
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="M">Laki-Laki</option>
                                            <option value="F">Perempuan</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="status"><b>Status</b></label>
                                        <select name="status" id="status" className="form-select" value={filterData.status} onChange={handleFilterChange}>
                                            <option value="">Pilih Status</option>
                                            {
                                                Object.entries(workerHelper.getAllStatus()).map(([key, value]) => (
                                                    <option key={key} value={key}>{workerHelper.getStatusLabel(key)}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-secondary me-2" onClick={handleResetFilter}>Reset</button>
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

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h2 className="h4">Pekerja</h2>
                </div>

                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={`/pekerja/create`} className="btn btn-primary">
                        Tambah Pekerja
                    </Link>
                </div>
            </div>
        
            <div className="card">
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Jenis Kelamin</th>
                                <th>Nomor HP</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {workers.map((worker, index) => (
                                <tr key={index}>
                                    <td>{worker.name}</td>
                                    <td>
                                        {worker.gender === 'M' ? 'Laki-Laki' : 'Perempuan'}
                                    </td>
                                    <td>{worker.phone_number}</td>
                                    <td>{worker.email}</td>
                                    <td>
                                        {worker.status === 1 ? 'Aktif' : 'Tidak Aktif'}
                                    </td>
                                    <td>
                                        <Link to={`/pekerja/${worker.id}`} className="btn btn-sm btn-warning">
                                            <i className="bx bx-edit"></i>
                                        </Link>
                                        |
                                        <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(worker.id)}>
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
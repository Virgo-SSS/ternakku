import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

export const EditWorkerPage = () => {
    let { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const Navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [worker, setWorker] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        phone_number: '',
        email: '',
        status: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        const getWorker = async () => {
            try {
                const response = await axiosPrivate.get(`/worker/${id}`);

                setWorker(response.data.data);

                setFormData({
                    name: response.data.data.name,
                    gender: response.data.data.gender,
                    phone_number: response.data.data.phone_number,
                    email: response.data.data.email,
                    status: response.data.data.status
                });
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response?.data?.message || error.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });

                // redirect to worker list page
                Navigate('/pekerja');
            }
        }

        getWorker();
    }, [id]);
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axiosPrivate.put(`/worker/${id}`, formData);

            withReactContent(Swal).fire({
                title: 'Success',
                text: 'Data pekerja berhasil diupdate',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // redirect to worker list page
                Navigate('/pekerja');
            });
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response?.data?.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="card mb-6">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Edit Pekerja</h5> <small className="text-body float-end">{worker.name}</small>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdate}>
                        <div className="card-body">
                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="name"><b>Nama</b></label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="Komang Wiguna"/>
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="gender"><b>Jenis Kelamin</b></label>
                                <select name="gender" id="gender" required className="form-select" value={formData.gender} onChange={handleChange}>
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="M">Laki-Laki</option>
                                    <option value="F">Perempuan</option>
                                </select>
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="phone_number"><b>Nomor HP</b></label>
                                <input type="number" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required className="form-control" placeholder="08xxxxxxxxxx"/>
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="email"><b>Email</b></label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="peternak@gmail.com"/>
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="status"><b>Status</b></label>
                                <select name="status" id="status" required className="form-select" value={formData.status} onChange={handleChange}>
                                    <option value="">Pilih Status</option>
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            {
                                isLoading ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : <button type="submit" className="btn btn-primary">Update</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


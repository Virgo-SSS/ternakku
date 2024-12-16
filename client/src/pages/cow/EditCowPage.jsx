import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from "react-flatpickr";
import { Dropzone } from '../../components/dropzone/Dropzone.jsx';
import CowHelper from '../../helper/cowHelper.js';
import DateHelper from '../../helper/dateHelper.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

export const EditCowPage = () => {
    const axiosPrivate = useAxiosPrivate();
    let { id } = useParams();
    
    const Navigate = useNavigate();
    const [cow, setCow] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        gender: '',
        birth_date: '',
        weight: '',
        type: '',
        is_bought: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleFileChange = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData({
                ...formData,
                photo: reader.result 
            });
        };
    };

    useEffect(() => {
        const getCow = async () => {
            try {
                const response = await axiosPrivate.get(`/cow/${id}`);

                setCow(response.data.data);

                setFormData({
                    name: response.data.data.name,
                    status: response.data.data.status,
                    gender: response.data.data.gender,
                    birth_date: DateHelper.formatDate(response.data.data.birth_date, 'Y-m-d'),
                    weight: response.data.data.weight,
                    type: response.data.data.type,
                    is_bought: response.data.data.is_bought,
                });

            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message || error.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });

                Navigate('/ternak');
            }
        }

        getCow();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(id);
            const response = await axiosPrivate.put(`/cow/${id}`, formData);

            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                Navigate('/ternak');
            });
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-6">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Edit Sapi</h5> <small className="text-body float-end">{cow.name}</small>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="name"><b>Nama</b></label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="Komang Wiguna"/>
                                    </div>

                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="status"><b>Status</b></label>
                                        <select name="status" id="status" required className="form-select" value={formData.status} onChange={handleChange}>
                                            {
                                                Object.keys(CowHelper.getAllStatus()).map((key) => {
                                                    return (
                                                        <option key={key} value={key}>{CowHelper.getStatusLabel(key)}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="gender"><b>Jenis Kelamin</b></label>
                                        <select name="gender" id="gender" required className="form-select" value={formData.gender} onChange={handleChange}>
                                            <option value="M">Jantan</option>
                                            <option value="F">Betina</option>
                                        </select>
                                    </div>
                                    
                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="birth_date"><b>Tanggal Lahir</b></label>
                                        <Flatpickr
                                            value={formData.birth_date}
                                            onChange={(selectedDates, dateStr, instance) => { 
                                                setFormData({
                                                    ...formData,
                                                    birth_date: dateStr
                                                })
                                            }}
                                            className='form-control flatpickr-input active'
                                            name="birth_date"
                                            id="birth_date"
                                            required
                                            readOnly={false}
                                        />
                                        </div>
                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="weight"><b>Berat Badan</b></label>
                                        <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="form-control" required />
                                    </div>

                                    <div className="mb-2 p-auto">
                                        <label className="form-label" htmlFor="type"><b>Jenis Sapi</b></label>
                                        <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} className="form-control" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="fotoSapi" className="form-label">Foto Sapi</label>
                                        <Dropzone onFileChange={handleFileChange} />
                                    </div>

                                    <h5 className="text-primary mt-3 mb-2">Informasi Pembelian</h5>
                                    <div className="mb-3">
                                        <label htmlFor="is_bought" className="form-label">Pembelian</label>
                                        <select id="is_bought" name="is_bought" value={formData.is_bought} onChange={handleChange} required className="form-select">
                                            <option value="1">Ya</option>
                                            <option value="0">Tidak</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="submit" className="btn btn-primary" >Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


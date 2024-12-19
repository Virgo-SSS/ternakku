import React, { useState } from 'react';
import { Dropzone } from '../../components/dropzone/Dropzone.jsx';
import Flatpickr from "react-flatpickr";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CowHelper from '../../helper/cowHelper.js';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

export const CreateCowPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const Navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
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
        })
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axiosPrivate.post('/cow', formData);

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
                text: error.response?.data?.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setIsLoading(false);
    }

    return (
        <>
            <h5>Tambah Sapi</h5>

            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <h5 className="text-primary">Identifikasi</h5>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name='name' id="name" value={formData.name} onChange={handleChange} placeholder='Nama sapi' className="form-control" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select name="status" id="status" className="form-select" required value={formData.status} onChange={handleChange}>
                                        <option value="">Pilih Status</option>
                                        {
                                            Object.keys(CowHelper.getAllStatus()).map((key) => {
                                                return (
                                                    <option key={key} value={key}>{CowHelper.getStatusLabel(key)}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gender" className="form-label">Jenis Kelamin</label>
                                    <select name='gender' id="gender" className="form-select" required value={formData.gender} onChange={handleChange}>
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="M">Jantan</option>
                                        <option value="F">Betina</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="birth_date" className="form-label">Tanggal Lahir</label>
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
                                <div className="mb-3">
                                    <label htmlFor="weight" className="form-label">Berat Badan (kg)</label>
                                    <input type="number" name='weight' value={formData.weight} onChange={handleChange} className="form-control" id="weight" required placeholder='Berat badan sapi' min={0}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">Jenis Sapi</label>
                                    <input type="text" name='type' value={formData.type} onChange={handleChange} className="form-control" id="type" placeholder='Jenis sapi' required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fotoSapi" className="form-label">Foto Sapi</label>
                                    <Dropzone onFileChange={handleFileChange} />
                                </div>
                                <h5 className="text-primary mt-3 mb-2">Informasi Pembelian</h5>
                                <div className="mb-3">
                                    <label htmlFor="is_bought" className="form-label">Apakah sapi tersebut pembelian</label>
                                    <select id="is_bought" name="is_bought" value={formData.is_bought} onChange={handleChange} required className="form-select">
                                        <option value="">Apakah Pembelian ?</option>
                                        <option value="1">Ya</option>
                                        <option value="0">Tidak</option>
                                    </select>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    {
                                        isLoading ? (
                                            <div className="d-flex justify-content-center">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : <button type="submit" className="btn btn-primary" >Tambah</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
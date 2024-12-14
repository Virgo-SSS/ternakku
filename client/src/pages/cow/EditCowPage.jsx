import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/api.js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from "react-flatpickr";
import { Dropzone } from '../../components/dropzone/Dropzone.jsx';

export const EditCowPage = () => {
    let { id } = useParams();
    const Navigate = useNavigate();
    const [cows, setCows] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        jenisKelamin: '',
        tanggalLahir: '',
        beratBadan: '',
        jenisSapi: '',
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
        const getCows = async () => {
            try {
                const response = await axios.get(`/cow`, {
                    params: {
                        id: id
                    }
                });

                setCows(response.data.data[0]);
                setFormData({
                    name: response.data.data[0].name,
                    status: response.data.data[0].status,
                    jenisKelamin: response.data.data[0].jenisKelamin,
                    tanggalLahir: response.data.data[0].tanggalLahir,
                    beratBadan: response.data.data[0].beratBadan,
                    jenisSapi: response.data.data[0].jenisSapi
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

        getCows();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/cow/${id}`, formData);

            withReactContent(Swal).fire({
                title: 'Success',
                text: 'Data pekerja berhasil diupdate',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // redirect to cows list page
            Navigate('/cow');
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <>
            <div className="card mb-6">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Edit Ternak</h5> <small className="text-body float-end">{cows.name}</small>
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
                                    <option value="M">Sehat</option>
                                    <option value="F">Tidak Sehat</option>
                                </select>
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="gender"><b>Jenis Kelamin</b></label>
                                <select name="gender" id="gender" required className="form-select" value={formData.jenisKelamin} onChange={handleChange}>
                                    <option value="M">Jantan</option>
                                    <option value="F">Betina</option>
                                </select>
                            </div>
                            
                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="birth_date"><b>Tanggal Lahir</b></label>
                                <Flatpickr
                                        value={formData.tanggalLahir}
                                        onChange={(selectedDates, dateStr, instance) => { 
                                            setFormData({
                                                ...formData,
                                                tanggalLahir: dateStr
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
                                <label className="form-label" htmlFor="bb"><b>Berat Badan</b></label>
                                <input type="bb" id="bb" name="bb" value={formData.beratBadan} onChange={handleChange} className="form-control" />
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="Jenis"><b>Jenis Sapi</b></label>
                                <input type="Jenis" id="Jenis" name="Jenis" value={formData.jenisSapi} onChange={handleChange} className="form-control" />
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
        </>
    )
}


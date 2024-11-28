import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import axios from "../../api/api.js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Set elemen root agar modal di-overlay pada elemen utama
Modal.setAppElement('#root')

export const PekerjaPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [workers, setWorkers] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        phone_number: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/worker', formData);
            setWorkers([...workers, response.data.data]);

            // Reset the form
            setFormData({
                name: '',
                gender: '',
                phone_number: '',
                email: '',
            });

            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
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

        setModalIsOpen(false)
    }

    const getWorkers = async () => {
        try {
            const response = await axios.get('/worker');
            setWorkers(response.data.data);
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
        getWorkers();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h2 className="h4">Pekerja</h2>
                </div>

                <div className="btn-toolbar mb-2 mb-md-0">
                    <button onClick={() => setModalIsOpen(true)} className="btn btn-primary">Tambah Pekerja</button>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        style={{
                            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                            content: { maxWidth: '800px', maxHeight: '430px', margin: 'auto', padding: '30px' }
                        }}
                    >
                        <form action="" onSubmit={handleSubmit}>
                            <div className="card-header d-flex align-items-center justify-content-between">
                                <h5 className="mb-2 p-auto">Tambah Pekerja</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-2 p-auto">
                                    <label className="form-label" htmlFor="name"><b>Nama</b></label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="Komang Wiguna"/>
                                </div>

                                <div className="mb-2 p-auto">
                                    <label className="form-label" htmlFor="gender"><b>Jenis Kelamin</b></label>
                                    <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required className="form-select">
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
                                    <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="peternak@gmail.com"/>
                                </div>
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="reset" onClick={() => setModalIsOpen(false)} className="btn btn-secondary">Batal</button>                
                                <button type="submit" className="btn btn-primary" >Tambah Pekerja</button>
                            </div>
                        </form>
                    </Modal>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
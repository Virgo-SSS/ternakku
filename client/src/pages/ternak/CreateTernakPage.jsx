import React from 'react';
import { Dropzone } from '../../components/dropzone/Dropzone';
import Flatpickr from "react-flatpickr";

export const CreateTernakPage = () => {
    const date  =  new Date();
    return (
        <>
            <h5>Tambah Sapi</h5>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="text-primary">Identifikasi</h5>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder='Nama sapi' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select className="form-select" id="status">
                                    <option value="sehat">Sehat</option>
                                    <option value="tidak sehat">Tidak Sehat</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="jenisKelamin" className="form-label">Jenis Kelamin</label>
                                <select className="form-select" id="jenisKelamin">
                                    <option value="betina">Betina</option>
                                    <option value="jantan">Jantan</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tanggalLahir" className="form-label">Tanggal Lahir</label>
                                <Flatpickr
                                    value={date}
                                    className='form-control flatpickr-input active'
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="beratBadan" className="form-label">Berat Badan (kg)</label>
                                <input type="number" className="form-control" id="beratBadan" placeholder='Berat badan sapi' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fotoSapi" className="form-label">Foto Sapi</label>
                                <Dropzone />
                            </div>

                            <h5 className="text-primary mt-3 mb-2">Informasi Pembelian</h5>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlSelect3" className="form-label">Pembelian</label>
                                <select className="form-select" id="exampleFormControlSelect3"
                                    aria-label="Default select example">
                                    <option value="1">Ya</option>
                                    <option value="2">Tidak</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


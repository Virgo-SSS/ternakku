import React, { useState } from "react"
import Modal from "react-modal"
import "../landing-page/styles/Modal.css"

// Set elemen root agar modal di-overlay pada elemen utama
Modal.setAppElement('#root')

export const PekerjaPage = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    
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
                    content: { maxWidth: '500px', margin: 'auto', padding: '20px' }
                }}
                >
                <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="mb-0">Tambah Pekerja</h5>
                </div>
                <div class="card-body">
                    
        <form>
          <div class="row g-6">
            <label class="col-sm-2 col-form-label" for="basic-default-name">Nama</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="basic-default-name" placeholder="John Doe"/>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="basic-default-company">Jenis Kelamin</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="basic-default-company" placeholder="ACME Inc."/>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="basic-default-email">Nomor HP</label>
            <div class="col-sm-10">
              <div class="input-group input-group-merge">
                <input type="text" id="basic-default-email" class="form-control" placeholder="john.doe" aria-label="john.doe" aria-describedby="basic-default-email2"/>
              </div>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="basic-default-phone">Email</label>
            <div class="col-sm-10">
              <input type="text" id="basic-default-phone" class="form-control phone-mask" placeholder="658 799 8941" aria-label="658 799 8941" aria-describedby="basic-default-phone"/>
            </div>
          </div>

          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="basic-default-phone">Status</label>
            <div class="col-sm-10">
              <input type="text" id="basic-default-phone" class="form-control phone-mask" placeholder="658 799 8941" aria-label="658 799 8941" aria-describedby="basic-default-phone"/>
            </div>
          </div>

        </form>
      </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="reset" onClick={() => setModalIsOpen(false)} class="btn btn-primary" >Batal</button>                
                <button type="submit" onClick={() => setModalIsOpen(false)} class="btn btn-primary" >Tambah Pekerja</button>
            </div>
                </Modal>
            </div>
            </div>
        
            <div className="card">
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" name="all" id="all" />
                                </th>
                                <th>Nama</th>
                                <th>Jenis Kelamin</th>
                                <th>Nomor HP</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td>Novi Kristianti</td>
                                <td>Perempuan</td>
                                <td>081399777913</td>
                                <td>kristinaaovi@gmail.com</td>
                                <td>Aktif</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td>Virgo Stevanus</td>
                                <td>Laki-laki</td>
                                <td>082170796602</td>
                                <td>Virgostevanus@gmail.com</td>
                                <td>Aktif</td>
                            </tr>
                        </tbody>


                    </table>
                </div>
            </div>

        </>
    )
}
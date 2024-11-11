import React, { useState } from "react"
import Modal from "react-modal"


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
                    content: { maxWidth: '800px', maxHeight: '500px', margin: 'auto', padding: '30px' }
                }}
                >
                <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="mb-2 p-auto">Tambah Pekerja</h5>
                </div>
                <div class="card-body">
                    
        <form>
        <div class="mb-2 p-auto">
            <label class="form-label" for="modalEditUserFirstName"><b>Nama</b></label>
            <input type="text" id="modalEditUserFirstName" name="modalEditUserFirstName" class="form-control" placeholder="Komang Wiguna"/>
          </div>

          <div class="mb-2 p-auto">
            <label class="form-label" for="modalEditUserFirstName"><b>Jenis Kelamin</b></label>
            <input type="text" id="modalEditUserFirstName" name="modalEditUserFirstName" class="form-control" placeholder="Laki-laki"/>
          </div>

          <div class="mb-2 p-auto">
            <label class="form-label" for="modalEditUserFirstName"><b>Nomor HP</b></label>
            <input type="number" id="modalEditUserFirstName" name="modalEditUserFirstName" class="form-control" placeholder="08xxxxxxxxxx"/>
          </div>

          <div class="mb-2 p-auto">
            <label class="form-label" for="modalEditUserFirstName"><b>Email</b></label>
            <input type="email" id="modalEditUserFirstName" name="modalEditUserFirstName" class="form-control" placeholder="komangwiguna@gmail.com"/>
          </div>
          
          
          <div class="mb-2 p-auto">
          <label class="form-label" for="modalEditUserFirstName"><b>Status</b></label>
          <select class="form-select" id="basic-default-country" required="">
              <option value="aktif">Aktif</option>
              <option value="tidak-aktif">Tidak Aktif</option>
            </select>
          </div>

        </form>

      </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="reset" onClick={() => setModalIsOpen(false)} class="btn btn-secondary" >Batal</button>                
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
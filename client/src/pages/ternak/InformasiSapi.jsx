import React from 'react'
import { useLocation, useParams } from "react-router-dom"

const InformasiSapi = () => {

  return (
    <>
    <h6>Informasi Sapi</h6>
    <div className='row'>
      <div className="card d-flex justify-content-start" style={{ width: "450px", height: "570px"}}>
      <div class="card-body">
        <div class="user-avatar-section">
          <div class="d-flex align-items-center flex-column">
            <img class="img-fluid rounded mb-4" src="../../assets/img/avatars/1.png" height="120" width="120" alt="User avatar"/>
            <div class="user-info text-center">
              <h3 className='mb-0'><b>Asep</b></h3>
              <span className='text-primary'>Sehat</span>
            </div>
          </div>
        </div>

        <h5 className='text-primary'>Details</h5>
        <div class="info-container fs-6">
          <ul class="list-unstyled">

            <li class="mb-2">
              <div class="mb-3">
                <span class="h6">Nama</span>
                <span class="position-absolute start-50 mb-3">Asep</span>
            </div>
            </li>

            <li class="mb-2">
              <span class="h6">Status</span>
              <span class="position-absolute start-50 mb-3">Sehat</span>
            </li>
            <li class="mb-2">
              <span class="h6">Jenis Kelamin</span>
              <span class="position-absolute start-50 mb-3">Betina</span>
            </li>
            <li class="mb-2">
              <span class="h6">Tanggal Lahir</span>
              <span class="position-absolute start-50 mb-3">12-01-2021</span>
            </li>
            <li class="mb-2">
              <span class="h6">Berat Badan</span>
              <span class="position-absolute start-50 mb-3">510 kg</span>
            </li>
            <li class="mb-2">
              <span class="h6">Jenis Sapi</span>
              <span class="position-absolute start-50 mb-3">Sapi Simental</span>
            </li>

            <h5 className='text-primary'>Informasi Pembelian</h5>
            <li class="mb-2">
              <span class="h6">Pembelian</span>
              <span class="position-absolute start-50 mb-3">Tidak</span>
            </li>

          </ul>
        </div>
      </div>
    </div>
    
    <div class="col-xl-6 mt-5">
    <div class="nav-align-top mb-6">
      <ul class="nav nav-pills mb-4" role="tablist">
        <li class="nav-item" role="presentation">
          <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-home" aria-controls="navs-pills-top-home" aria-selected="true">Timeline</button>
        </li>
        <li class="nav-item" role="presentation">
          <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-profile" aria-controls="navs-pills-top-profile" aria-selected="false" tabindex="-1">Performa</button>
        </li>
        <li class="nav-item" role="presentation">
          <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-top-messages" aria-controls="navs-pills-top-messages" aria-selected="false" tabindex="-1">Kesehatan</button>
        </li>
      </ul>

      <div class="tab-content" style={{ width: "760px", height: "570px"}}>
        <div class="tab-pane fade active show" id="navs-pills-top-home" role="tabpanel">
        <ul class="timeline mb-0">

            

          <li class="timeline-item timeline-item-transparent">
          <span class="timeline-point"></span>
            <div class="timeline-event">
              <div class="timeline-header mb-3">
                <span class="mb-0"><h5 className='text-primary'>Tambah Aktivitas Baru</h5></span>
              </div>
            </div>
          </li>

          <li class="timeline-item timeline-item-transparent">
            <span class="timeline-point"></span>
            <div class="timeline-event">
              <div class="mb-3">
                <span class="mb-0 text-primary">20-10-2024</span>
                <span class="ms-5 ps-5 mb-3">Pemeriksaan Kesehatan, Status: Sehat</span>
              </div>
            </div>
          </li>

          <li class="timeline-item timeline-item-transparent">
            <span class="timeline-point timeline-point-primary"></span>
            <div class="timeline-event">
              <div class="mb-3">
                <span class="mb-0 text-primary">12-08-2024</span>
                <span class="ms-5 ps-5 mb-3">Penimbangan Berat Badan: 510 kg</span>
              </div>
            </div>
          </li>

          <li class="timeline-item timeline-item-transparent">
            <span class="timeline-point timeline-point-primary"></span>
            <div class="timeline-event">
              <div class="mb-3">
                <span class="mb-0 text-primary">05-07-2024</span>
                <span class="ms-5 ps-5 mb-3">Perubahan Pakan</span>
              </div>
            </div>
          </li>

          <li class="timeline-item timeline-item-transparent">
            <span class="timeline-point timeline-point-primary"></span>
            <div class="timeline-event">
              <div class="mb-3">
                <span class="mb-0 text-primary">05-07-2024</span>
                <span class="ms-5 ps-5 mb-3">Pemberian Obat Cacing</span>
              </div>
            </div>
          </li>

          <li class="timeline-item timeline-item-transparent">
            <span class="timeline-point timeline-point-primary"></span>
            <div class="timeline-event">
              <div class="mb-3">
                <span class="mb-0 text-primary">20-02-2024</span>
                <span class="ms-5 ps-5 mb-3">Pemeriksaan Kesehatan, Status: Sehat</span>
              </div>
            </div>
          </li>

          <li class="timeline-item timeline-item-transparent">
            <span class="timeline-point timeline-point-primary"></span>
            <div class="timeline-event">
              <div class="mb-3">
                <span class="mb-0 text-primary">08-12-2023</span>
                <span class="ms-5 ps-5 mb-3">Vaksinasi</span>
              </div>
            </div>
          </li>

          <li class="timeline-item timeline-item-transparent">
            <span class="timeline-point timeline-point-primary"></span>
            <div class="timeline-event">
              <div class="mb-3">
                <span class="mb-0 text-primary">15-10-2023</span>
                <span class="ms-5 ps-5 mb-3">Penimbangan Berat Badan: 478 kg</span>
              </div>
            </div>
          </li>

          <li class="timeline-item timeline-item-transparent">
          <span class="timeline-point timeline-point-primary"></span>
              <div class="mb-3">
                <span class="mb-0 text-primary">Tampilkan Lebih Banyak ...</span>
              </div>
          </li>
          
            </ul>
        </div>

        <div class="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
        <h5 class="pb-5 text-primary">Berat Badan</h5>

        <div class="card-body py-5" style={{position: "relative"}}>
        <div class="row">

          <div class="col d-flex">
            <div class="bg-light bg-opacity-25 shadow-sm rounded position-absolute top-50 start-0 translate-middle-y w-25 text-center">
              <h6 class="mb-0 mt-3">Terbaru</h6>
              <h5><b>510 kg</b></h5>
            </div>
          </div>

          <div class="col d-flex">
            <div class="bg-light bg-opacity-25 shadow-sm rounded position-absolute top-50 end-0 translate-middle-y w-25 text-center">
              <h6 class="mb-0 mt-3">Lahir</h6>
              <h5><b>18,9 kg</b></h5>
            </div>
          </div>
        </div>
        </div>
        

            <div className="pt-10">
                <div className="text-center pb-5 table-responsive text-nowrap">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Berat Badan</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            <tr>
                                <td className='text-primary'>12-08-2024</td>
                                <td>510 kg</td>
                            </tr>
                            <tr>
                                <td className='text-primary'>15-10-2023</td>
                                <td>478 kg</td>
                            </tr>
                            <tr>
                                <td className='text-primary'>14-9-2022</td>
                                <td>330 kg</td>
                            </tr>
                        </tbody>


                    </table>
                </div>
            </div>

        </div>

        <div class="tab-pane fade" id="navs-pills-top-messages" role="tabpanel">
        <h5 class="pb-5 text-primary">Pengobatan</h5>

        <div class="card-body py-5" style={{position: "relative"}}>
        <div class="row">

          <div class="col d-flex">
            <div class="bg-light bg-opacity-25 shadow-sm rounded position-absolute top-50 start-0 translate-middle-y w-25 text-center">
              <h6 class="mb-0 mt-3">Terakhir</h6>
              <h5><b>05-07-2024</b></h5>
            </div>
          </div>

          <div class="col d-flex">
            <div class="bg-light bg-opacity-25 shadow-sm rounded position-absolute top-50 end-0 translate-middle-y w-25 text-center">
              <h6 class="mb-0 mt-3">Selanjutnya</h6>
              <h5><b>-</b></h5>
            </div>
          </div>
          
        </div>
        </div>
        

            <div className="pt-10">
                <div className="text-center pb-5 table-responsive text-nowrap">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Kategori</th>
                                <th>Pengobatan</th>
                                <th>Tanggal selanjutnya</th>
                                <th>Dosis</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            <tr>
                                <td className='text-primary'>05-07-2024</td>
                                <td>Obat</td>
                                <td>Wormzol B</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td className='text-primary'>08-12-2023</td>
                                <td>Vaksin</td>
                                <td>Vaksin BHV-1</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td className='text-primary'>12-10-2023</td>
                                <td>Vitamin</td>
                                <td>Zilmax</td>
                                <td>-</td>
                                <td>2</td>
                            </tr>
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  </div>

    </div>
    </>
  )
}

export default InformasiSapi

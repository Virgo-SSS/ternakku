import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "../../api/api";
import Modal from "react-modal"


// Set elemen root agar modal di-overlay pada elemen utama
Modal.setAppElement('#root')

const InformasiSapi = () => {
    const { id } = useParams(); // Ambil ID sapi dari URL
    const [cow, setCow] = useState(null); // State untuk data sapi
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nestedModalIsOpen, setNestedModalIsOpen] = useState(false);

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

      setNestedModalIsOpen(false);
    }
     
    const fetchCowDetails = async () => {
        try {
            const response = await axios.get(`/cow/${id}`); // API endpoint untuk detail sapi
            setCow(response.data.data); // Set data sapi ke state
            setIsLoading(false);
        } catch (error) {
          withReactContent(Swal).fire({
              title: 'Error',
              text: error.response.data.message,
              icon: 'error',
              confirmButtonText: 'OK'
          });
        }
    };

    useEffect(() => {
        fetchCowDetails();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!cow) {
        return <p>Data sapi tidak ditemukan.</p>;
    }

    return (
        <>
            <h6>Informasi Sapi</h6>
            <div className='row'>
                <div className="card d-flex justify-content-start" style={{ width: "450px", height: "570px"}}>
                    <div className="card-body">
                        <div className="user-avatar-section">
                            <div className="d-flex align-items-center flex-column">
                                <img
                                    className="img-fluid rounded mb-4"
                                    src="../../assets/img/avatars/1.png"
                                    height="120"
                                    width="120"
                                    alt="User avatar"
                                />
                                <div className="user-info text-center">
                                    <h3 className="mb-0"><b>{cow.name}</b></h3>
                                    <span className="text-primary">{cow.status}</span>
                                </div>
                            </div>
                        </div>

                        <h5 className="text-primary">Details</h5>
                        <div className="info-container fs-6 ">
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <span className="h6">Nama</span>
                                    <span className="position-absolute start-50 mb-3">{cow.name}</span>
                                </li>
                                <li className="mb-2">
                                    <span className="h6">Status</span>
                                    <span className="position-absolute start-50 mb-3">{cow.status}</span>
                                </li>
                                <li className="mb-2">
                                    <span className="h6">Jenis Kelamin</span>
                                    <span className="position-absolute start-50 mb-3">{cow.gender === 'M' ? 'Jantan' : 'Betina'}</span>
                                </li>
                                <li className="mb-2">
                                    <span className="h6">Tanggal Lahir</span>
                                    <span className="position-absolute start-50 mb-3">
                                        {new Date(cow.birth_date).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </li>
                                <li className="mb-2">
                                    <span className="h6">Berat Badan</span>
                                    <span className="position-absolute start-50 mb-3">{cow.weight} kg</span>
                                </li>
                                <li className="mb-2">
                                    <span className="h6">Jenis Sapi</span>
                                    <span className="position-absolute start-50 mb-3">{cow.type}</span>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="col-xl-6 mt-5">
                    <div className="nav-align-top mb-6">
                        <ul className="nav nav-pills mb-4" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#timeline" aria-controls="timeline" aria-selected="true">Timeline</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#performance" aria-controls="performance" aria-selected="false">Performa</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#health" aria-controls="health" aria-selected="false">Kesehatan</button>
                            </li>
                        </ul>

                        <div className="tab-content" style={{ width: "760px", height: "570px" }}>

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
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
                            {/* Timeline */}
                            <div className="tab-pane fade active show" id="timeline" role="tabpanel">
                                <ul className="timeline mb-0">
                                <li className="timeline-item fs-4 mb-2 text-primary" onClick={() => setModalIsOpen(true)}>Tambah Aktivitas Baru</li>

                                <Modal
                                  isOpen={modalIsOpen}
                                  onRequestClose={() => setModalIsOpen(false)}
                                  style={{
                                      overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                                      content: { maxWidth: '650px', maxHeight: '300px', margin: 'auto', padding: '30px' }
                                  }}
                              >
                                  <section action="" onSubmit={handleSubmit} className='text-primary'>
                                      <div className="card-header d-flex align-items-center justify-content-between">
                                          <p className="mb-2 p-auto">Tambah Aktivitas Baru</p>
                                      </div>
                                      <div className="card-body">
                                      <div class="col-12">
                                          <div class="row g-6">

                                            <div class="col-md mb-md-0">
                                              <div class="form-check custom-option custom-option-icon checked">
                                                <label class="form-check-label custom-option-content">
                                                  <span class="custom-option-body">
                                                    <i class="bx bx-building-house"></i>
                                                    <span class="custom-option-title" onClick={() => setNestedModalIsOpen(true)}>Pengobatan</span>
                                                  </span>
                                                </label>
                                              </div>
                                            </div>

                                            <div class="col-md mb-md-0">
                                              <div class="form-check custom-option custom-option-icon">
                                                <label class="form-check-label custom-option-content">
                                                  <span class="custom-option-body">
                                                    <i class="bx bx-crown"></i>
                                                    <span class="custom-option-title">Pengukuran</span>
                                                  </span>
                                                </label>
                                              </div>
                                            </div>

                                            <div class="col-md mb-md-0">
                                              <div class="form-check custom-option custom-option-icon">
                                                <label class="form-check-label custom-option-content">
                                                  <span class="custom-option-body">
                                                    <i class="bx bx-briefcase-alt"></i>
                                                    <span class="custom-option-title">Tugas</span>
                                                  </span>
                                                </label>
                                              </div>
                                            </div>

                                          </div>
                                        </div>
                                      </div>

                                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                          <button type="reset" onClick={() => setModalIsOpen(false)} className="btn btn-secondary mt-5">Batal</button>                
                                      </div>
                                  </section>
                              </Modal>

                                    {/* Cek apakah cow.timeline ada dan merupakan array */}
                                    {Array.isArray(cow.timeline) && cow.timeline.length > 0 ? (
                                        cow.timeline.map((event, index) => (
                                            <li className="timeline-item timeline-item-transparent" key={index}>
                                                <span className={`timeline-point ${event.isHighlight ? 'timeline-point-primary' : ''}`}></span>
                                                <div className="timeline-event">
                                                    <div className="mb-3">
                                                        <span className="mb-0 text-primary">{new Date(event.date).toLocaleDateString('id-ID')}</span>
                                                        <span className="ms-5 ps-5 mb-3">{event.description}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="timeline-item">Tidak ada timeline untuk sapi ini.</li> // Menampilkan pesan jika tidak ada timeline
                                    )}
                                </ul>
                            </div>
                            </div>

                            {/* Performance */}
                          <div className="tab-pane fade" id="performance" role="tabpanel">
                          </div>

                            {/* Health */}
                            <div className="tab-pane fade" id="health" role="tabpanel">
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
};

export default InformasiSapi;

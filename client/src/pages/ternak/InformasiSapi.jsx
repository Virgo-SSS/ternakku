import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "../../api/api";
import Modal from "react-modal"
import CowHelper from "../../helper/cowHelper";

// Set elemen root agar modal di-overlay pada elemen utama
Modal.setAppElement('#root')

export const InformasiSapi = () => {
    const { id } = useParams(); // Ambil ID sapi dari URL

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
    //   try {
    //       const response = await axios.post('/worker', formData);
    //       setWorkers([...workers, response.data.data]);

    //       // Reset the form
    //       setFormData({
    //           name: '',
    //           gender: '',
    //           phone_number: '',
    //           email: '',
    //       });

    //       withReactContent(Swal).fire({
    //           title: 'Success',
    //           text: response.data.message,
    //           icon: 'success',
    //           confirmButtonText: 'OK'
    //       });
    //   } catch (error) {
    //       withReactContent(Swal).fire({
    //           title: 'Error',
    //           text: error.response.data.message,
    //           icon: 'error',
    //           confirmButtonText: 'OK'
    //       });
    //   }

    //   setNestedModalIsOpen(false);
    }
     
    return (
        <>
            <h6>Informasi Sapi</h6>
            <div className='row'>
                <div className="col-md-4">
                    <div className="card d-flex justify-content-start">
                        <div className="card-body">
                            <CowProfile id={id}/>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="col-md-8">
                    <div className="nav-align-top mb-6">
                        <ul className="nav nav-pills mb-4" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#timeline-tab" aria-controls="timeline-tab" aria-selected="true">Timeline</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#performance-tab" aria-controls="performance-tab" aria-selected="false" tabIndex="-1">Performance</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#health-tab" aria-controls="health-tab" aria-selected="false" tabIndex="-1">Kesehatan</button>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="timeline-tab" role="tabpanel">
                                <CowTimeline id={id}/>
                            </div>
                            <div className="tab-pane fade" id="performance-tab" role="tabpanel">
                                <CowPerformance id={id}/>
                            </div>
                            <div className="tab-pane fade" id="health-tab" role="tabpanel">
                                <CowHealth id={id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const CowProfile = ({ id }) => {
    const [cow, setCow] = useState({
        name: '',
        status: '',
        gender: '',
        birth_date: '',
        weight: '',
        type: ''
    }); // State untuk data sapi

    useEffect(() => {
        const getCow = async () => {
            try {
                console.log("id", id);
                const response = await axios.get(`/cow/${id}`); // API endpoint untuk detail sapi
                setCow(response.data.data); // Set data sapi ke state
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message || error.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        getCow();
    }, [id]);

    return (
        <>
            <div className="user-avatar-section">
                <div className="d-flex align-items-center flex-column">
                    <img
                        className="img-fluid rounded mb-4"
                        src="../../assets/img/cow.jpeg"
                        height="220"
                        width="220"
                        alt="User avatar"
                    />
                    <div className="user-info text-center">
                        <h3 className="mb-0"><b>{cow.name}</b></h3>
                        <span className="text-primary">
                            {
                                CowHelper.getStatusLabel(cow.status)
                            }
                        </span>
                    </div>
                </div>
            </div>

            <h5 className="text-primary">Detail</h5>
            <div className="info-container fs-6 ">
                <ul className="list-unstyled">
                    <li className="mb-2">
                        <span className="h6">Nama</span>
                        <span className="position-absolute start-50 mb-3">{cow.name}</span>
                    </li>
                    <li className="mb-2">
                        <span className="h6">Status</span>
                        <span className="position-absolute start-50 mb-3">
                            {
                                CowHelper.getStatusLabel(cow.status)
                            }
                        </span>
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
        </>
    )
}

const CowTimeline = ({ id }) => {
    return (
        <>
            <ul className="timeline mb-0">
                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point"></span>
                    <div className="timeline-event">
                        <div className="timeline-header mb-3">
                            <span className="mb-0"><h5 className='text-primary'>Tambah Aktivitas Baru</h5></span>
                        </div>
                    </div>
                </li>

                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point"></span>
                    <div className="timeline-event">
                        <div className="mb-3">
                            <span className="mb-0 text-primary">20-10-2024</span>
                            <span className="ms-5 ps-5 mb-3">Pemeriksaan Kesehatan, Status: Sehat</span>
                        </div>
                    </div>
                </li>

                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary"></span>
                    <div className="timeline-event">
                        <div className="mb-3">
                            <span className="mb-0 text-primary">12-08-2024</span>
                            <span className="ms-5 ps-5 mb-3">Penimbangan Berat Badan: 510 kg</span>
                        </div>
                    </div>
                </li>

                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary"></span>
                    <div className="timeline-event">
                        <div className="mb-3">
                            <span className="mb-0 text-primary">05-07-2024</span>
                            <span className="ms-5 ps-5 mb-3">Perubahan Pakan</span>
                        </div>
                    </div>
                </li>

                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary"></span>
                    <div className="timeline-event">
                        <div className="mb-3">
                            <span className="mb-0 text-primary">05-07-2024</span>
                            <span className="ms-5 ps-5 mb-3">Pemberian Obat Cacing</span>
                        </div>
                    </div>
                </li>

                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary"></span>
                    <div className="timeline-event">
                        <div className="mb-3">
                            <span className="mb-0 text-primary">20-02-2024</span>
                            <span className="ms-5 ps-5 mb-3">Pemeriksaan Kesehatan, Status: Sehat</span>
                        </div>
                    </div>
                </li>

                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary"></span>
                    <div className="timeline-event">
                        <div className="mb-3">
                            <span className="mb-0 text-primary">08-12-2023</span>
                            <span className="ms-5 ps-5 mb-3">Vaksinasi</span>
                        </div>
                    </div>
                </li>

                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary"></span>
                    <div className="timeline-event">
                        <div className="mb-3">
                            <span className="mb-0 text-primary">15-10-2023</span>
                            <span className="ms-5 ps-5 mb-3">Penimbangan Berat Badan: 478 kg</span>
                        </div>
                    </div>
                </li>

                <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary"></span>
                    <div className="mb-3">
                        <span className="mb-0 text-primary">Tampilkan Lebih Banyak ...</span>
                    </div>
                </li>
            </ul>
        </>
    )
}

const CowPerformance = ({ id }) => {
    return (
        <>
            <h5 className="pb-5 text-primary">Berat Badan</h5>

            <div className="card-body py-5" style={{position: "relative"}}>
                <div className="row">
                    <div className="col d-flex">
                        <div className="bg-light bg-opacity-25 shadow-sm rounded position-absolute top-50 start-0 translate-middle-y w-25 text-center">
                            <h6 className="mb-0 mt-3">Terbaru</h6>
                            <h5><b>510 kg</b></h5>
                        </div>
                    </div>

                    <div className="col d-flex">
                        <div className="bg-light bg-opacity-25 shadow-sm rounded position-absolute top-50 end-0 translate-middle-y w-25 text-center">
                            <h6 className="mb-0 mt-3">Lahir</h6>
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
        </>
    )
}

const CowHealth = ({ id }) => {
    return (
        <>
            <h5 className="pb-5 text-primary">Pengobatan</h5>

            <div className="card-body py-5" style={{position: "relative"}}>
                <div className="row">
                    <div className="col d-flex">
                        <div className="bg-light bg-opacity-25 shadow-sm rounded position-absolute top-50 start-0 translate-middle-y w-25 text-center">
                            <h6 className="mb-0 mt-3">Terakhir</h6>
                            <h5><b>05-07-2024</b></h5>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="bg-light bg-opacity-25 shadow-sm rounded position-absolute top-50 end-0 translate-middle-y w-25 text-center">
                            <h6 className="mb-0 mt-3">Selanjutnya</h6>
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
        </>
    )
}
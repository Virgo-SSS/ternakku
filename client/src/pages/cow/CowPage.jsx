import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "../../api/api.js";
import { useEffect, useState } from "react";
import CowHelper from "../../helper/cowHelper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const CowPage = () => {
  const [cows, setCows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true); // Menyembunyikan ikon ketika input difokuskan
  };

  const handleBlur = () => {
    setIsInputFocused(false); // Menampilkan ikon kembali jika input tidak difokuskan
  };

  // Delete function for cows
  const handleDelete = async (id) => {
    // Confirmation before deleting
    await withReactContent(Swal).fire({
        title: 'Konfirmasi',
        text: 'Apakah anda yakin ingin menghapus data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`/cow/${id}`);

            setCows(cows.filter((cow) => cow.id !== id));

            withReactContent(Swal).fire({
              title: 'Success',
              text: 'Data sapi berhasil dihapus',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          } catch (error) {
            withReactContent(Swal).fire({
              title: 'Error',
              text:
                error.response?.data?.message ||
                error.message ||
                'Something went wrong',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }
      });
  };

  useEffect(() => {
    // Function to get the list of cows
    const getCows = async () => {
      try {
        const response = await axios.get('/cow');

        setCows(response.data.data);
      } catch (error) {
        withReactContent(Swal).fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    getCows();
  }, []);

  return (
    <>
        <h5 className="mb-0">Filter</h5>
        <div className="d-flex gap-2">
                <div>
                <input type="text" placeholder='Nama' className="form-control form-control-sm text-start" isClearable/>
                </div>

                <div className="btn-group">
                <button type="button" className="btn btn-primary btn-sm">
                    Status
                </button>
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                    <li>
                    <a className="dropdown-item" href="#">
                        Sehat
                    </a>
                    </li>
                    <li>
                    <a className="dropdown-item" href="#">
                        Tidak Sehat
                    </a>
                    </li>
                </ul>
                </div>

                <div className="position-relative">
                {!isInputFocused && (
                <i
                    className="bi bi-calendar position-absolute top-50 start-0 translate-middle-y ms-3"
                    style={{pointerEvents: "none", zIndex: 1}}>
                </i>
                )}
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Pilih tanggal"
                        isClearable
                        className="form-control form-control-sm text-start ps-8 pb-2"
                        onFocus={handleFocus} // Menyembunyikan ikon ketika input difokuskan
                        onBlur={handleBlur}   // Menampilkan ikon kembali ketika input kehilangan fokus
                        />
                </div>

        <div className="btn-group">
          <button type="button" className="btn btn-primary btn-sm">
            Jenis Kelamin
          </button>
          <button
            type="button"
            className="btn btn-primary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Jantan
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Betina
              </a>
            </li>
          </ul>
        </div>

        </div>

      <div className="d-flex justify-content-between align-items-center py-4">
      <div className="d-block mb-4 mb-md-0">
        <h2 className="h4 ">Data Sapi</h2>
      </div>
      <div className="btn-toolbar mb-2 mb-md-0">
        <Link to="/ternak/create">
          <button type="button" className="btn btn-primary bg-primary">Tambah Sapi</button>
        </Link>
      </div>
      </div>

      <div className="card">
        <div className="text-nowrap">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Status</th>
                <th>Jenis Kelamin</th>
                <th>Tanggal Lahir</th>
                <th>Berat Badan</th>
                <th>Jenis Sapi</th>
                <th>Action</th> {/* Action column for edit and delete */}
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {cows.map((cow, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/ternak/${cow.id}`} className="text-primary">
                      {cow.name}
                    </Link>
                  </td>
                  <td>{CowHelper.getStatusLabel(cow.status)}</td>
                  <td>{cow.gender === 'M' ? 'Jantan' : 'Betina'}

                  </td>
                  <td>
                    {new Date(cow.birth_date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td>{cow.weight} Kg</td>
                  <td>{cow.type}</td>
                  <td>
                    <Link
                      to={`/ternak/edit/${cow.id}`}
                      className="btn btn-sm btn-warning"
                    >
                      <i className="bx bx-edit"></i>
                    </Link>
                    |
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cow.id)}
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
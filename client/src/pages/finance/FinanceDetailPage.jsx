import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FinanceHelper from "../../helper/FinanceHelper.js";
import { NumericFormat } from 'react-number-format';
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import Flatpickr from "react-flatpickr";

export const FinanceDetailPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [transactions, setTransactions] = useState([]);
    const [isFilterLoading, setIsFilterLoading] = useState(false);

    const handleFilter = async (e) => {
      e.preventDefault();
      setIsFilterLoading(true);
  
      sleep(5000).then(() => {
          setIsFilterLoading(false);
      });
    }

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axiosPrivate.get('/transaction');
                setTransactions(response.data.data);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.message || error.message || "Something went wrong",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getTransactions();
    }, []);

    const handleDelete = async (id) => {
        await withReactContent(Swal).fire({
            title: 'Apakah Anda yakin?',
            text: 'Data yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }
            
            try {
                await axiosPrivate.delete(`/transaction/${id}`);

                withReactContent(Swal).fire({
                    title: 'Success',
                    text: 'Data berhasil dihapus',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setTransactions(transactions.filter(transaction => transaction.id !== id));
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message || error.message || "Something went wrong",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    return (
        <>

            <div className="row">
                <form onSubmit={handleFilter}>
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-3">
                
                        <div className="col-md-3">
                        <div className="mb-2 p-auto">
                            <label htmlFor="status" className="form-label"><b>Tanggal</b></label>
                            <Flatpickr
                                value={new Date()}
                                options={{
                                    altInput: true,
                                    dateFormat: 'Y-m-d',
                                    enableTime: false,
                                    mode: 'range',
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-2 p-auto">
                            <label className="form-label" htmlFor="gender"><b>Type</b></label>
                            <select name="gender" id="gender" className="form-select">
                            <option value="" disabled selected>Pilih Type</option>
                                <option value="M">Income</option>
                                <option value="F">Expense</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-2 p-auto">
                            <label className="form-label" htmlFor="gender"><b>Category</b></label>
                            <select name="gender" id="gender" className="form-select">
                            <option value="" disabled selected>Pilih Category</option>
                                <option value="M">Category 1</option>
                                <option value="F">Category 2</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

                        <div className="card-footer">
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-secondary me-2">Reset</button>
                                <button type="submit" className="btn btn-primary">Search</button>
                                {
                                    isFilterLoading && (
                                        <div className="spinner-border text-primary ms-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="d-flex justify-content-end align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Link to="/keuangan/create">
                        <button className="btn btn-primary">Input Data</button>
                    </Link>
                </div>
            </div>

            <div className="card">
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Notes</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>
                                        {new Date(transaction.date).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td>{transaction.name}</td>
                                    <td>
                                        <NumericFormat 
                                            value={transaction.amount} 
                                            displayType={'text'} 
                                            thousandSeparator="." 
                                            decimalSeparator=","
                                            prefix={'Rp '} 
                                        />
                                    </td>
                                    <td>
                                        {FinanceHelper.getTransactionTypeLabel(transaction.type)}
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.notes ?? '-'}</td>
                                    <td>
                                        <Link to={`/keuangan/edit/${transaction.id}`} className="btn btn-sm btn-warning">
                                            <i className="bx bx-edit"></i>
                                        </Link>
                                        |
                                        <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(transaction.id)}>
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
    )
}
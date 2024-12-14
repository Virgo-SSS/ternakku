import { useEffect, useState } from "react";
import axios from "../../api/api.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FinanceHelper from "../../helper/FinanceHelper.js";
import { Link } from "react-router-dom";

export const FinanceDetailPage = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axios.get('/transaction');
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
                await axios.delete(`/transaction/${id}`);

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
            <div className="d-flex justify-content-end mb-4">
                <Link to="/keuangan/create">
                    <button className="btn btn-primary">Input Data</button>
                </Link>
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
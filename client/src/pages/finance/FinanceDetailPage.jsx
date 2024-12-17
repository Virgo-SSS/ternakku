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
    const [transactionCategories, setTransactionCategories] = useState([]);
    const [isFilterLoading, setIsFilterLoading] = useState(false);
    const [filterData, setFilterData] = useState({
        date: '',
        type: '',
        category: '',
    });

    const handleResetFilter = (e) => {
        e.preventDefault();

        setFilterData({
            date: '',
            type: '',
            category: '',
        });

        handleFilter(e);        
    }

    const handleFilterChange = (e) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        });
    }

    const handleFilter = async (e) => {
        e.preventDefault();
        setIsFilterLoading(true);

        let modifiedFilterData = {};

        // modify filterData date from "xxxx-xx-xx to xxxx-xx-xx" to "xxxx-xx-xx - xxxx-xx-xx" 
        if (filterData.date) {
            // check if date is in format "xxxx-xx-xx to xxxx-xx-xx" or single date
            if (filterData.date.includes('to')) {
                const [startDate, endDate] = filterData.date.split(' to ');
                modifiedFilterData.date = `${startDate} - ${endDate}`;
            }
        }

        modifiedFilterData.type = filterData.type;
        modifiedFilterData.category = filterData.category;
        
        try {
            const response = await axiosPrivate.get('/transaction', {
                params: modifiedFilterData
            });

            setTransactions(response.data.data);
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.message || error.message || "Something went wrong",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        finally {
            setIsFilterLoading(false);
        }
      
    }

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const [transactionResponse, transactionCategoryResponse] = await Promise.all([
                    axiosPrivate.get('/transaction'),
                    axiosPrivate.get('/transaction/category')
                ]);

                setTransactions(transactionResponse.data.data);
                setTransactionCategories(transactionCategoryResponse.data.data);
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
            <div>
                <form onSubmit={handleFilter}>
                    <div className="card">
                        <div className="card-body row" >
                            <div className="col-md-3">
                                <div className="mb-2 p-auto">
                                    <label htmlFor="status" className="form-label"><b>Tanggal</b></label>
                                    <Flatpickr
                                        value={filterData.date}
                                        options={{
                                            altInput: true,
                                            dateFormat: 'Y-m-d',
                                            enableTime: false,
                                            mode: 'range',
                                            altInputClass: 'form-control',
                                        }}
                                        onChange={(selectedDates, dateStr, instance) => {
                                            setFilterData({
                                                ...filterData,
                                                date: dateStr
                                            });
                                        }}
                                    />
                                </div>
                            </div>                            
                            <div className="col-md-3">
                                <div className="mb-2 p-auto">
                                    <label className="form-label" htmlFor="type"><b>Type</b></label>
                                    <select name="type" id="type" className="form-select" onChange={handleFilterChange} value={filterData.type}>
                                        <option value="">All</option>
                                        {
                                            Object.entries(FinanceHelper.getAllTransactionTypes()).map(([key, value]) => (
                                                <option key={key} value={key}>{FinanceHelper.getTransactionTypeLabel(key)}</option>
                                            ))
                                        }
                                   
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-2 p-auto">
                                    <label className="form-label" htmlFor="category"><b>Category</b></label>
                                    <select name="category" id="category" className="form-select" onChange={handleFilterChange} value={filterData.category}>
                                        <option value="">All</option>
                                        {
                                            transactionCategories.map((category, index) => (
                                                <option key={index} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-secondary me-2" onClick={handleResetFilter}>Reset</button>
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
                                    <td>{transaction.category_name}</td>
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
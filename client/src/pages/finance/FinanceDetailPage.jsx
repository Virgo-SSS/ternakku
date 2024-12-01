import { useEffect, useState } from "react";
import axios from "../../api/api.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FinanceHelper from "../../helper/FinanceHelper.js";
import { NumericFormat } from 'react-number-format';

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
                    text: error.response.data.message || error.message || "Something went wrong",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getTransactions();
    }, []);

    return (
        <>
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
                                    <td>{transaction.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
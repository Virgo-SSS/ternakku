import React, { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CreatableSelect from 'react-select/creatable';
import { NumericFormat } from 'react-number-format';
import Flatpickr from "react-flatpickr";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import { useNavigate } from "react-router-dom";

export const CreateTransactionPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isCreateCategoryLoading, setIsCreateCategoryLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        date: "",
        category: "",
        amount: "",
        notes: ""
    });

    const handleChangeData = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        const getTransacationCategories = async () => {
            try {
                const response = await axiosPrivate.get('/transaction/category');

                const data = [];

                response.data.data.forEach((category) => {
                    data.push({
                        value: category.id,
                        label: category.name
                    });
                });

                setCategories(data);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response?.data?.message || error.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getTransacationCategories();
    }, []);

    const handleCreateCategory = async (name) => {
        try {
            setIsCreateCategoryLoading(true);

            const response = await axiosPrivate.post('/transaction/category', {
                name: name
            });

            const data = {
                value: response.data.data.id,
                label: response.data.data.name
            };

            setCategories([...categories, data]);
            setIsCreateCategoryLoading(false);
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response?.data?.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axiosPrivate.post('/transaction', formData);

            setFormData({
                name: "",
                type: "",
                date: "",
                category: "",
                amount: "",
                notes: ""
            });
            
            setSelectedCategory(null);

            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/keuangan');
            });

        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response?.data?.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="col-xxl">
                <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">Create Transaction</h5>
                        <small className="text-muted float-end">TERNAKKU</small>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="name">Nama</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        name="name" 
                                        required 
                                        placeholder="John Doe" 
                                        value={formData.name}
                                        onChange={handleChangeData}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="type">Tipe</label>
                                <div className="col-sm-10">
                                    <select 
                                        className="form-select" 
                                        id="type" 
                                        name="type" 
                                        required 
                                        onChange={handleChangeData}
                                        value={formData.type}
                                    >
                                        <option value="">Pilih tipe</option>
                                        <option value="1">Income</option>
                                        <option value="2">Expense</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="category">Kategori</label>
                                <div className="col-sm-10">
                                    <CreatableSelect
                                        required
                                        isClearable
                                        isDisabled={isCreateCategoryLoading}
                                        isLoading={isCreateCategoryLoading}
                                        onCreateOption={handleCreateCategory}
                                        options={categories}
                                        placeholder="Pilih atau buat kategori"
                                        classNamePrefix="react-select"
                                        value={selectedCategory}
                                        onChange={(selected) => {
                                            setSelectedCategory(selected);
                                            setFormData({
                                                ...formData,
                                                category: selected ? selected.value : ''
                                            });
                                        }}
                                        name="category"
                                        id="category"

                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="date">Tanggal</label>
                                <div className="col-sm-10">
                                    <Flatpickr
                                        value={formData.date}
                                        onChange={(selectedDates, dateStr, instance) => { 
                                            setFormData({
                                                ...formData,
                                                date: dateStr
                                            })
                                        }}
                                        className='form-control flatpickr-input active'
                                        name="date"
                                        id="date"
                                        required
                                        readOnly={false}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="amount">Jumlah</label>
                                <div className="col-sm-10">
                                    <NumericFormat 
                                        id="amount"
                                        name="amount"
                                        className="form-control"
                                        placeholder="Jumlah"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        decimalScale={0}
                                        prefix="Rp. "
                                        allowNegative={false}
                                        allowLeadingZeros={false}
                                        required
                                        value={formData.amount}
                                        onValueChange={(values) => {
                                            const {formattedValue, value} = values;
                                            setFormData({
                                                ...formData,
                                                amount: value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label" htmlFor="notes">Catatan</label>
                                <div className="col-sm-10">
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        className="form-control"
                                        placeholder="Catatan"
                                        aria-label="Catatan"
                                        value={formData.notes}
                                        onChange={handleChangeData}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                {
                                    isLoading ? (
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : <button type="submit" className="btn btn-primary">Tambah</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
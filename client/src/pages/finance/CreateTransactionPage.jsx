import React, { useEffect, useRef, useState } from "react"
import axios from "../../api/api.js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CreatableSelect from 'react-select/creatable';
import { NumericFormat } from 'react-number-format';
import Flatpickr from "react-flatpickr";

export const CreateTransactionPage = () => {
    const [categories, setCategories] = useState([]);
    const [isCreateCategoryLoading, setIsCreateCategoryLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
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
                const response = await axios.get('/transaction/category');

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
                    text: error.response.data.message || error.message,
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
            const response = await axios.post('/transaction/category', {
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
                text: error.response.data.message || error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/transaction', formData);
            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setFormData({
                name: "",
                type: "",
                date: "",
                category: "",
                amount: "",
                notes: ""
            });
            setSelectedCategory(null);
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message || error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
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
                                            console.log(selected)
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
                            <div className="row justify-content-end">
                                <div className="col-sm-10">
                                    <button aria-label='Create the transaction' type="submit" className="btn btn-primary">Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
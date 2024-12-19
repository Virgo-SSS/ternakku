import { useState } from "react";
import { Link } from "react-router-dom"
import { AuthWrapper } from "./AuthWrapper";
import axios from "../../api/api"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // validate password
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Password and Confirm Password must be the same');
            }

            const response = await axios.post('/register', formData);

            // Reset the form
            setFormData({
                name: '',
                email: '',
                phone_number: '',
                password: '',
                confirmPassword: '',
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
                text: error.response?.data?.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setIsLoading(false);
    };

    return (
        <AuthWrapper>
            <h4 className="mb-2">Selamat Datang di Ternakku! 👋</h4>
            <p className="mb-4">Masuk dan kelola peternakan Anda dengan mudah!</p>

            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>

                <div className="mb-5">
                    <label htmlFor="name" className="form-label">Nama</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        placeholder="Enter your name"
                        autoFocus />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone_number" className="form-label">Nomer Handphone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        name="phone_number"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div className="mb-5 form-password-toggle">
                    <label className="form-label" htmlFor="password">Kata Sandi</label>
                    <div className="input-group input-group-merge">
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            name="password"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="password" />
                        <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    </div>
                </div>

                <div className="mb-5 form-password-toggle">
                    <label className="form-label" htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
                    <div className="input-group input-group-merge">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                            name="confirmPassword"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="confirmPassword"
                        />
                        <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    </div>
                </div>
                
                {
                    isLoading ? (
                        <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    ) : (
                        <button type="submit" aria-label='Click me' className="btn btn-primary d-grid w-100">Daftar</button>
                    )
                }
            </form>

            <p className="text-center">
                <span>Sudah punya akun? </span>
                <Link aria-label="Go to Login Page" to="/auth/login">
                    Masuk
                </Link>
            </p>

        </AuthWrapper>
    )
}
import { useState } from "react";
import { Link } from "react-router-dom"
import { AuthWrapper } from "./AuthWrapper";
import axios from "../../api/api.js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useAuth from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            setAuth({
                user: response.data.data.user,
                token: response.data.data.token
            });
            navigate('/Dashboard');
        } catch (error) {
            withReactContent(Swal).fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || 'Something went wrong!',
            })
        }
        setIsLoading(false);
    };
    
    return (
        <AuthWrapper>
            <h4 className="mb-2">Selamat Datang di Ternakku 👋</h4>
            <p className="mb-4">Masuk dan kelola peternakan Anda dengan mudah</p>

            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={formData.name}
                        onChange={handleChange}
                        name="email"
                        placeholder="Enter your email"
                        autoFocus 
                        required
                        />
                </div>
                <div className="mb-5 form-password-toggle">
                    <label className="form-label" htmlFor="password">Kata Sandi</label>
                    <div className="input-group input-group-merge">
                        <input
                            type="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            name="password"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="password" />
                        <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    </div>
                </div>
                <div className="mb-5 d-flex justify-content-between">
                    <div></div>
                    <Link aria-label="Go to Forgot Password Page" to="/auth/forgot-password">
                        <small style={{ fontSize:"18px" }}>Lupa kata sandi?</small>
                    </Link>
                </div>
                <div className="mb-5">
                    {
                        isLoading ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : <button className="btn btn-primary d-grid w-100" type="submit">
                                Masuk
                            </button>
                    }
                </div>
            </form>

            <p className="text-center">
                <span>Tidak punya akun? </span>
                <Link aria-label="Go to Register Page" to='/auth/register' className="registration-link">
                    <span>Buat akun</span>
                </Link>
            </p>
        </AuthWrapper>
    )
}
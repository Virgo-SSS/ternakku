import { useState } from "react";
import { Link } from "react-router-dom"
import { AuthWrapper } from "./AuthWrapper";

export const LoginPage = () => {
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
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
                        autoFocus />
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
                <div className="mb-5 d-flex justify-content-between">
                    <div></div>
                    <Link aria-label="Go to Forgot Password Page" to="/auth/forgot-password">
                        <small style={{ fontSize:"18px" }}>Lupa kata sandi?</small>
                    </Link>
                </div>
                <div className="mb-5">
                    <Link to="/dashboard" className="btn btn-primary d-grid w-100" type="submit" aria-label='Click me'>
                        Masuk
                    </Link>
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
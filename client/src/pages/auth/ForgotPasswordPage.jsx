import { useState } from "react";
import { Link } from "react-router-dom"
import { AuthWrapper } from "./AuthWrapper";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle the form submission (e.g., send reset link)
        console.log('Email submitted:', email);
    };
    
    return (
        <AuthWrapper>

            <h4 className="mb-2">Lupa kata sandi? 🔒</h4>
            <p className="mb-4">Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mereset kata sandi Anda.</p>
            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoFocus />
                </div>
                <button aria-label='Click me' className="btn btn-primary d-grid w-100">Kirim reset link</button>
            </form>
            <div className="text-center">
                <Link aria-label="Go to Login Page" to="/auth/login" className="d-flex align-items-center justify-content-center">
                    <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                    Kembali ke login
                </Link>
            </div>

        </AuthWrapper>
    )
}
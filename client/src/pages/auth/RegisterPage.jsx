import { useState } from "react";
import { Link } from "react-router-dom"
import { AuthWrapper } from "./AuthWrapper";

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nomerHandphone: '',
        password: '',
        confirmPassword: '',
        terms: false,
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
        setError(null);

        // Validasi awal
        if (formData.password !== formData.confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    nomerHandphone: formData.nomerHandphone,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                // Menampilkan pesan error dari server
                setError(result.message || 'Registrasi gagal. Silakan coba lagi.');
            } else {
                // Berhasil, redirect atau tampilkan pesan sukses
                alert('Registrasi berhasil!');
                setFormData({
                    name: '',
                    email: '',
                    nomerHandphone: '',
                    password: '',
                    confirmPassword: '',
                    terms: false,
                });
            }
        } catch (err) {
            setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
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
                    <label htmlFor="nomerHandphone" className="form-label">Nomer Handphone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nomerHandphone"
                        value={formData.nomerHandphone}
                        onChange={handleChange}
                        name="nomerHandphone"
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
                
                <button aria-label='Click me' className="btn btn-primary d-grid w-100" disabled={loading}>
                    {loading ? 'Loading...' : 'Daftar'}
                </button>
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
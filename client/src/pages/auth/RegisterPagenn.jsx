import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthWrapper } from "./AuthWrapper";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nomerHandphone, setnomerHandphone] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const Navigate = useNavigate();

    const RegisterPage = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: nomerHandphone,
                password: password,
                confPassword: confPassword
            });
            Navigate.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    
    return (
        <AuthWrapper>

            <h4 className="mb-2">Selamat Datang di Ternakku! 👋</h4>
            <p className="mb-4">Masuk dan kelola peternakan Anda dengan mudah!</p>

            <form id="formAuthentication" className="mb-3" onSubmit={RegisterPage}>
                <div className="mb-5">
                    <label htmlFor="name" className="form-label">Nama</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={nama}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        placeholder="Enter your name"
                        autoFocus
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="nomerHandphone" className="form-label">Nomor Handphone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nomerHandphone"
                        value={nomerHandphone}
                        onChange={(e) => setnomerHandphone(e.target.value)}
                        name="nomerHandphone"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="mb-5 form-password-toggle">
                    <label htmlFor="password" className="form-label">Kata Sandi</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="mb-5 form-password-toggle">
                    <label htmlFor="confPassword" className="form-label">Konfirmasi Kata Sandi</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confPassword"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        name="confPassword"
                        placeholder="Confirm your password"
                    />
                </div>

                <button type="submit" className="btn btn-primary d-grid w-100">
                    Daftar
                </button>
            </form>

            <p className="text-center">
                <span>Sudah punya akun? </span>
                <Link to="/auth/login">Masuk</Link>
            </p>
        </AuthWrapper>
    );
};
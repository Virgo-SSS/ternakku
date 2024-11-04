import React from 'react'
import { Link } from 'react-router-dom'
import './page-auth.css'

export const AuthWrapper = ({ children }) => {
    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="card">
                        <div className="card-body">
                            <div className="app-brand justify-content-center">
                                <Link aria-label='Go to Home Page' to="/" className="app-brand-link gap-2">
                                    <span className="app-brand-logo demo">
                                        <img src="/assets/img/ternakku-logo.png" alt="sneat-logo" style={{ height:"30px" }} />
                                    </span>
                                </Link>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

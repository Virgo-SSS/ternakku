import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="position-relative bg-white shadow-lg mx-md-4 p-md-3 rounded-3">
      <div className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="logo">
          <img
            src="/assets/img/ternakku-logo.png"
            className="img w-44 h-auto"
            alt="Tampilan Dashboard AgroForce"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="d-none d-lg-flex gap-4 align-items-center">
          <ul className="d-flex gap-5 list-unstyled mb-0">
            <li>
              <a href="#home" className="text-gray-900 text-decoration-none">
                Home
              </a>
            </li>
            <li>
              <a href="#courses" className="text-gray-900 text-decoration-none">
                Keunggulan
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-900 text-decoration-none">
                Paket Harga
              </a>
            </li>
            <li>
              <a href="#cta" className="text-gray-900 text-decoration-none">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <Link
          to="/auth/login"
          className="d-none d-lg-flex bg-primary-custom text-white px-4 py-3 rounded-3 text-decoration-none btn-primary-custom"
        >
          Login/Register
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="d-lg-none d-flex align-items-center px-3 py-2 border rounded text-gray-900 border-secondary bg-transparent"
          aria-label="Toggle menu"
        >
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`${isOpen ? 'd-block' : 'd-none'} d-lg-none bg-white shadow-lg rounded-3 mt-2 position-fixed end-0`}
      >
        <ul className="d-flex flex-column align-items-start gap-3 p-4 list-unstyled mb-0">
          <li>
            <a href="#home" className="text-gray-900 text-decoration-none">
              Home
            </a>
          </li>
          <li>
            <a href="#courses" className="text-gray-900 text-decoration-none">
              Keunggulan
            </a>
          </li>
          <li>
            <a href="#pricing" className="text-gray-900 text-decoration-none">
              Paket Harga
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-900 text-decoration-none">
              Contact
            </a>
          </li>
          <Link
            to="/auth/login"
            className="w-100 text-center bg-primary-custom text-white px-4 py-3 rounded-3 text-decoration-none btn-primary-custom"
          >
            Register
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-white shadow-lg md:mx-10 md:p-3 rounded-lg">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <img src="./logoagroforce.png" className="w-48 h-auto" alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-5 items-center">
          <ul className="flex gap-12">
            <li><a href="#home" className="text-gray-900">Home</a></li>
            <li><a href="#courses" className="text-gray-900">Keunggulan</a></li>
            <li><a href="#tutors" className="text-gray-900">Testimoni</a></li>
            <li><a href="#partners" className="text-gray-900">Tentang</a></li>
            <li><a href="#contact" className="text-gray-900">Contact</a></li>
          </ul>
        </nav>
        <a href="#" className="hidden lg:flex bg-tw-primary text-white px-5 py-3 rounded-lg hover:bg-[#7a8a07]">Login / Register</a>


        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center px-3 py-2 border rounded text-gray-900 border-gray-900"
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
      <nav className={`${isOpen ? 'block' : 'hidden'} lg:hidden bg-white shadow-lg rounded-lg mt-2 fixed right-0`}>
        <ul className="flex flex-col items-start gap-4 p-5">
          <li><a href="#home" className="text-gray-900">Home</a></li>
          <li><a href="#courses" className="text-gray-900">Keunggulan</a></li>
          <li><a href="#tutors" className="text-gray-900">Testimoni</a></li>
          <li><a href="#partners" className="text-gray-900">Tentang</a></li>
          <li><a href="#contact" className="text-gray-900">Contact</a></li>
          <a href="#" className="w-full text-center bg-tw-primary text-white px-5 py-3 rounded-lg hover:bg-[#7a8a07]">Login / Register</a>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

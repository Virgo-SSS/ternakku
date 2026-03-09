import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './landing-page/components/Navbar';
import Footer from './landing-page/components/Footer';
import Pricing from './landing-page/components/Pricing';
import Contact from './landing-page/components/Contact';

function Home() {
  const location = useLocation();

  useEffect(() => {
    // Only load the CSS when on the home route
    if (location.pathname === '/home') {
      import('../pages/landing-page/styles/Home.css').then();
      import('../pages/landing-page/styles/Tutors.css').then();
    }
  }, [location]);

  return (
    <>
      <div className="pt-3">
        <Navbar />
      </div>
      <div className="d-flex flex-column mt-40">
        {/* Home */}
        <section className="mx-3 mx-md-5 my-auto">
          <div>
            <h2 className="fs-2 text-center text-md-start fs-md-1 fw-bold text-primary-custom pe-3">
              Satu dashboard untuk mengelola ternak sapi anda
            </h2>
            <p className="text-justify text-center text-md-start pe-md-4">
              Rangkaian perangkat lunak yang unik dan kuat untuk menjalankan seluruh bisnis Anda,
              yang dihadirkan oleh perusahaan dengan visi jangka panjang untuk mengubah cara Anda
              bekerja.
            </p>
            <p className="text-center text-md-start">
              <a
                href="/auth/login"
                className="text-white bg-primary-custom btn-primary-custom fw-medium rounded-3 text-sm px-4 py-2"
              >
                Get started
              </a>
            </p>
          </div>
          <div>
            <img
              src="/assets/img/Dashboard.jpg"
              className="img"
              alt="Tampilan Dashboard AgroForce"
            />
          </div>
        </section>

        {/* Keunggulan */}
        <section className="d-flex flex-column" id="courses">
          <div className="tengah">
            <div className="kolom">
              <h2 className="fs-4 fs-md-2">Keunggulan Platform TERNAKKU</h2>
              <p>Membantu Peternak Mengelola Ternak Dengan Mudah Dan Efisien</p>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row">
            <div className="d-flex flex-column col-md-3 p-4">
              <div>
                <img
                  src="/assets/img/icons/folder.svg"
                  className="mx-auto w-12 h-12 grow py-2"
                  alt="Terorganisir"
                />
                <h4 className="text-center fw-bold py-3">Terorganisir</h4>
                <p className="text-center px-4">
                  Data sapi tersimpan rapi dalam satu platform untuk akses mudah dan pengelolaan
                  yang efisien.
                </p>
              </div>
            </div>

            <div className="d-flex flex-column col-md-3 p-4">
              <div>
                <img
                  src="/assets/img/icons/jam.svg"
                  className="mx-auto w-12 h-12 grow py-2"
                  alt="Hemat Waktu"
                />
                <h4 className="text-center fw-bold py-3">Hemat Waktu</h4>
                <p className="text-center px-4">
                  Kurangi waktu pencatatan manual dengan fitur otomatis dan akses data real-time.
                </p>
              </div>
            </div>

            <div className="d-flex flex-column col-md-3 p-4">
              <div>
                <img
                  src="/assets/img/icons/lamp.svg"
                  className="mx-auto w-12 h-12 grow py-2"
                  alt="Membuat Keputusan Yang Lebih Baik"
                />
                <h4 className="text-center fw-bold py-3">Membuat Keputusan Yang Lebih Baik</h4>
                <p className="text-center px-4">
                  Analisis data lengkap untuk strategi pengelolaan yang lebih tepat dan produktif.
                </p>
              </div>
            </div>

            <div className="d-flex flex-column col-md-3 p-4">
              <div>
                <img
                  src="/assets/img/icons/handshake.svg"
                  className="mx-auto w-12 h-12 grow py-2"
                  alt="Bekerja Bersama Dengan Lebih Baik"
                />
                <h4 className="text-center fw-bold py-3">Bekerja Bersama Dengan Lebih Baik</h4>
                <p className="text-center px-4">
                  Kolaborasi tim yang lebih efektif dengan akses data yang aman dan mudah diakses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing">
          <div className="tengah">
            <div className="kolom">
              <div className="d-flex mx-auto my-3">
                <span className="bg-primary-custom text-white text-center rounded-3 mx-auto px-4 py-2">
                  Paket Harga
                </span>
              </div>
              <span className="fs-2">
                <b>Paket harga yang disesuaikan</b> dirancang untuk Anda
              </span>
              <p className="p-0">
                Semua paket sudah termasuk fitur canggih untuk meningkatkan produk Anda. Pilih paket
                terbaik yang sesuai dengan kebutuhan Anda.
              </p>
              <Pricing />
            </div>
          </div>
        </section>

        {/* Cta */}
        <section id="cta" className="row px-3 px-md-5 bg-cta mx-0">
          <div className="col-12 col-md-6 my-auto">
            <h2 className="fs-2 text-primary-custom text-center text-md-start my-auto pb-0 pt-3">
              Siap Memulai
            </h2>
            <p className="text-center text-md-start pt-0">
              Mulai proyek Anda dengan produk kami
            </p>
            <div className="my-auto py-3 pt-md-4">
              <a
                href="/auth/login"
                className="bg-primary-custom btn-primary-custom text-white px-4 py-3 rounded-3"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img src="/assets/img/Keuangan.jpg" className="img w-100" alt="Tampilan Keuangan AgroForce" />
          </div>
        </section>
      </div>
      <Contact />
      <Footer />
    </>
  );
}

export default Home;

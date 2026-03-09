import '../styles/Contact.css';

function Contact() {
  return (
    <div id="contact">
      <div className="wrapper">
        <div className="footer">
          {/* Logo and Newsletter */}
          <div className="mx-auto">
            <img
              src="/assets/img/ternakku-logo.png"
              className="img w-44 h-auto"
              alt="logo ternakku"
            />
            <p>
              Membantu peternak dalam mengelola kegiatan
              <br />
              peternakan mereka dengan manajemen data
            </p>

            <form className="my-2 my-md-0" action="#">
              <p className="text-xs align-items-center d-sm-flex">
                Subscribe to newsletter
              </p>

              <div className="d-flex justify-content-start align-items-start">
                <label htmlFor="email" className="d-none">
                  Email address
                </label>
                <input
                  className="d-flex justify-content-center align-items-center p-2 text-sm text-gray-900 bg-cta rounded-3 rounded-end-0 border border-dark"
                  placeholder="Your email"
                  type="email"
                  id="email"
                  required
                  style={{ width: '80%' }}
                />
                <a
                  href=""
                  type="submit"
                  className="d-flex justify-content-center align-items-center border border-primary-custom p-2 text-sm fw-medium text-white rounded-3 rounded-start-0 cursor-pointer bg-primary-custom btn-primary-custom"
                >
                  Subscribe
                </a>
              </div>
            </form>
          </div>

          {/* Pages */}
          <div className="mx-auto">
            <h3 className="fw-bold pb-2">Pages</h3>
            <p className="pb-0">
              <a href="/home">Home</a>
            </p>
            <p className="pb-0">
              <a href="#courses">Keunggulan</a>
            </p>
            <p className="pb-0">
              <a href="#pricing">Paket Harga</a>
            </p>
            <p className="pb-0">
              <a href="#contact">Contact</a>
            </p>
          </div>

          {/* Fitur */}
          <div className="mx-auto">
            <h3 className="fw-bold pb-2">Fitur</h3>
            <p className="pb-0">Dashboard</p>
            <p className="pb-0">Ternak</p>
            <p className="pb-0">Keuangan</p>
            <p className="pb-0">Kalender</p>
            <p className="pb-0">Task</p>
          </div>

          {/* Contact */}
          <div className="mx-auto">
            <h3 className="fw-bold pb-2 text-center text-md-start">Contact</h3>
            <div className="d-flex justify-content-start align-items-start py-auto">
              <img src="/assets/img/icons/whatsapp.svg" className="w-7" alt="WhatsApp" />
              <p className="ps-3">+628-1399777913</p>
            </div>
            <div className="d-flex justify-content-start align-items-start pt-3">
              <img src="/assets/img/icons/facebook.svg" className="w-7" alt="Facebook" />
              <p className="ps-3">Ternakku</p>
            </div>
            <div className="d-flex justify-content-start align-items-start pt-3">
              <img src="/assets/img/icons/instagram.svg" className="w-7" alt="Instagram" />
              <p className="ps-3">Ternakku</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

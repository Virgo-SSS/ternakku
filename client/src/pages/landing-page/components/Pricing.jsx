import { useState } from 'react';

function Partner() {
  const [selectMonthly, setSelectMonthly] = useState(true);

  return (
    <div>
      {/* Toggle Switch */}
      <label className="d-inline-flex align-items-center cursor-pointer p-4">
        <span className="me-3 text-sm fw-medium text-gray-900">
          Bayar Bulanan
        </span>
        <div
          className={`toggle-switch ${!selectMonthly ? 'active' : ''}`}
          onClick={() => setSelectMonthly((prev) => !prev)}
          role="switch"
          aria-checked={!selectMonthly}
          tabIndex={0}
        />
        <span className="ms-3 text-sm fw-medium text-gray-900">
          Bayar Tahunan
        </span>
      </label>

      {/* Pricing*/}
      <div className="row g-4 pt-4">
        {/*Dasar*/}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column p-4 mx-auto text-center text-gray-900 bg-white rounded-3 border border-secondary shadow h-100">
            <img src="/assets/img/icons/dasar.svg" className="mx-auto w-20" alt="Dasar" />
            <h3 className="pt-4 fs-4">Dasar</h3>
            <div className="d-flex justify-content-center align-items-baseline mt-3 mb-1">
              <span className="fs-4 text-primary-custom fw-semibold">
                {selectMonthly ? 'Rp. 100.000' : 'Rp. 1.000.000'}
              </span>
              <span className="text-gray-500 mx-3 mb-4">
                {selectMonthly ? '/Bulan' : '/Tahun'}
              </span>
            </div>

            <ul className="list-unstyled mb-4 space-y-4 text-start">
              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Pencatatan dasar untuk jumlah sapi terbatas</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Catatan pertumbuhan dan kesehatan sederhana</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Dukungan teknis melalui email</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Akses laporan produktivitas</span>
              </li>
            </ul>
            <a
              href="/auth/login"
              className="text-white bg-primary-custom btn-primary-custom fw-medium rounded-3 text-sm px-4 py-2 text-center mt-auto"
            >
              Get started
            </a>
          </div>
        </div>

        {/*Tim*/}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column p-4 mx-auto text-center text-gray-900 bg-white rounded-3 border border-secondary shadow h-100">
            <img src="/assets/img/icons/team.svg" className="mx-auto w-20" alt="Tim" />
            <h3 className="pt-4 fs-4">Tim</h3>
            <div className="d-flex justify-content-center align-items-baseline mt-3 mb-1">
              <span className="fs-4 text-primary-custom fw-semibold">
                {selectMonthly ? 'Rp. 250.000' : 'Rp. 2.500.000'}
              </span>
              <span className="text-gray-500 mx-3 mb-4">
                {selectMonthly ? '/Bulan' : '/Tahun'}
              </span>
            </div>

            <ul className="list-unstyled mb-4 space-y-4 text-start">
              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Pencatatan dasar untuk jumlah 200 sapi</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Catatan pertumbuhan dan kesehatan sederhana</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Dukungan teknis melalui email</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Akses laporan produktivitas</span>
              </li>
            </ul>
            <a
              href="/auth/login"
              className="text-white bg-primary-custom btn-primary-custom fw-medium rounded-3 text-sm px-4 py-2 text-center mt-auto"
            >
              Get started
            </a>
          </div>
        </div>

        {/*Perusahaan*/}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column p-4 mx-auto text-center text-gray-900 bg-white rounded-3 border border-secondary shadow h-100">
            <img src="/assets/img/icons/perusahaan.svg" className="mx-auto w-20" alt="Perusahaan" />
            <h3 className="pt-4 fs-4">Perusahaan</h3>
            <div className="d-flex justify-content-center align-items-baseline mt-3 mb-1">
              <span className="fs-4 text-primary-custom fw-semibold">
                {selectMonthly ? 'Rp. 300.000' : 'Rp. 3.000.000'}
              </span>
              <span className="text-gray-500 mx-3 mb-4">
                {selectMonthly ? '/Bulan' : '/Tahun'}
              </span>
            </div>

            <ul className="list-unstyled mb-4 space-y-4 text-start">
              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Pencatatan dasar untuk jumlah 500 sapi</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Catatan pertumbuhan dan kesehatan sederhana</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Dukungan teknis melalui email</span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ms-3">Akses laporan produktivitas</span>
              </li>
            </ul>
            <a
              href="/auth/login"
              className="text-white bg-primary-custom btn-primary-custom fw-medium rounded-3 text-sm px-4 py-2 text-center mt-auto"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partner;

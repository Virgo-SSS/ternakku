import React, { useState } from 'react'

function Partner(props) {

    const [selectMonthly, setSelectMonthly] = useState(true);

    return (
        <div>
            {/* Toggle Switch */}
            <label className="inline-flex items-center cursor-pointer p-4">
                <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">Bayar Bulanan</span>
                <input type="checkbox" value="" className="sr-only peer" onChange={() => {
                    setSelectMonthly((prev) => !prev);
                    }}/>

                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tw-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tw-primary"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Bayar Tahunan</span>
            </label>

            {/* Pricing*/}
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 pt-5">
                {/*Dasar*/}
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <img src="/assets/img/icons/dasar.svg "className="mx-auto w-20" />
                    <h3 className="pt-10 text-2xl">Dasar</h3>
                    <div className="flex justify-center items-baseline mt-4 mb-1">
                        <span className="text-2xl text-tw-primary font-semibold">{selectMonthly ? 'Rp. 100.000' : 'Rp. 1.000.000'}</span>
                        <span className="text-gray-500 dark:text-gray-400 mx-3 mb-5">{selectMonthly ? '/Bulan' : '/Tahun'}</span>
                    </div>

                    <ul role="list" className="mb-8 space-y-4 text-left">

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Pencatatan dasar untuk jumlah sapi terbatas</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Catatan pertumbuhan dan kesehatan sederhana</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Dukungan teknis melalui email</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Akses laporan produktivitas</span>
                        </li>

                    </ul>
                    <a href="/auth/login" className="text-white bg-tw-primary hover:bg-[#7a8a07] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get started</a>
                </div>

                {/*Tim*/}
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <img src="/assets/img/icons/team.svg "className="mx-auto w-20" />
                    <h3 className="pt-10 text-2xl">Tim</h3>
                    <div className="flex justify-center items-baseline mt-4 mb-1" >
                        <span className="text-2xl text-tw-primary font-semibold">{selectMonthly ? 'Rp. 250.000' : 'Rp. 2.500.000'}</span>
                        <span className="text-gray-500 dark:text-gray-400 mx-3 mb-5">{selectMonthly ? '/Bulan' : '/Tahun'}</span>
                    </div>

                    <ul role="list" className="mb-8 space-y-4 text-left">

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Pencatatan dasar untuk jumlah 200 sapi</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Catatan pertumbuhan dan kesehatan sederhana</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Dukungan teknis melalui email</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Akses laporan produktivitas</span>
                        </li>

                    </ul>
                    <a href="/auth/login" className="text-white bg-tw-primary hover:bg-[#7a8a07] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get started</a>
                </div>
                
                {/*Perusahaan*/}
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <img src="/assets/img/icons/perusahaan.svg "className="mx-auto w-20" />
                    <h3 className="pt-10 text-2xl">Perusahaan</h3>
                    <div className="flex justify-center items-baseline mt-4 mb-1">
                        <span className="text-2xl text-tw-primary font-semibold">{selectMonthly ? 'Rp. 300.000' : 'Rp. 3.000.000'}</span>
                        <span className="text-gray-500 dark:text-gray-400 mx-3 mb-5">{selectMonthly ? '/Bulan' : '/Tahun'}</span>
                    </div>

                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Pencatatan dasar untuk jumlah 500 sapi</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Catatan pertumbuhan dan kesehatan sederhana</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Dukungan teknis melalui email</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Akses laporan produktivitas</span>
                        </li>
                    </ul>
                    <a href="/auth/login" className="text-white bg-tw-primary hover:bg-[#7a8a07] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get started</a>
                </div>
            </div>
        </div>
    )
}

export default Partner

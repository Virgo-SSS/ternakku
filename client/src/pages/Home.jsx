import React from 'react'
import parse from 'html-react-parser'
import { useLocation } from "react-router-dom";


{/*components*/}
import Navbar from '../components/landing-page/Navbar'
import Footer from '../components/landing-page/Footer'
import Pricing from '../components/landing-page/Pricing'
import Cta from '../components/landing-page/Cta'
import Contact from '../components/landing-page/Contact'

{/*CSS*/}
import '../styles/Home.css'
import '../styles/Tutors.css'

{/*data*/}
import { HomeSection } from '../data/HomeSection'
import { CourseSection, Keunggulan } from '../data/KeunggulanSection'
import { PricingSection } from '../data/PricingSection'
import { CtaSection, CtaList } from '../data/CtaSection'
import { ContactSection } from '../data/ContactSection'

{/*IMG/PNG*/}
import Gambar1 from '/img/Dashboard.jpg'
import Gambar2 from '/img/Keuangan.jpg'

function Home() {
  return (
    <>
        <div className='pt-3'>
        <Navbar />
        </div>
        <div className="flex flex-col mt-40">
            {/*Home*/}
            <section className="mx-5 md:mx-20 my-auto">
                <div>
                {parse(HomeSection.content)}
                </div>
                <div className="">
                    <img src={Gambar1} className='img' alt='Tampilan Dashboard AgroForce'/>
                </div>

            </section>

            {/*Keunggulan*/}
            <section className="flex flex-col" id="courses">
                <div className="tengah">
                    <div className="kolom">
                        {parse(CourseSection.Judulcontent)}
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                {
                    Keunggulan.map((item, index) => {
                        return (
                            <div>
                                {parse(item.content)}
                            </div>
                        )
                    }
                )}
                </div>
            </section>

            {/*Pricing*/}
            <section id="pricing">
            <div className="tengah">
                <div className="kolom">
                    {parse(PricingSection.content)}
                    <Pricing/>
                </div>
            </div>
            </section>

            {/*Cta*/}    
            <section className="grid md:grid-cols-2 px-10 md:px-80 bg-[#dde1bc]">
                <div className="my-auto">
                    {parse(CtaSection.content)}
                </div>
                <img src={Gambar2} className='py-3' alt='Tampilan Keuangan AgroForce'/>               
            </section>
        </div>
        <Contact ContactSection={ContactSection}/>
        <Footer />
    </>
  )
}

export default Home

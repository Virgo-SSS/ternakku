import React, { useEffect } from 'react'
import parse from 'html-react-parser'
import { Link, useLocation } from "react-router-dom"

{/*components*/}
import Navbar from './landing-page/components/Navbar'
import Footer from './landing-page/components/Footer'
import Pricing from './landing-page/components/Pricing'
import Contact from './landing-page/components/Contact'

{/*data*/}
import { HomeSection } from './landing-page/data/HomeSection'
import { CourseSection, Keunggulan } from './landing-page/data/KeunggulanSection'
import { PricingSection } from './landing-page/data/PricingSection'
import { CtaSection, } from './landing-page/data/CtaSection'
import { ContactSection } from './landing-page/data/ContactSection'

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
                <img src="/assets/img/Dashboard.jpg" className='img' alt='Tampilan Dashboard AgroForce'/>
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
                <img src="/assets/img/Keuangan.jpg" className='img' alt='Tampilan Keuangan AgroForce'/>               
            </section>
        </div>  
        <Contact ContactSection={ContactSection}/>
        <Footer />
    </>
  )
}

export default Home

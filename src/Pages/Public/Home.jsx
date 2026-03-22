import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import LoadingSpinner from '../../Component/LoadingSpinner';
import HeroBanner from '../../Component/Home/HeroBanner';
import TopBooking from '../../Component/Home/TopBooking';
import BrandShowcase from '../../Component/Home/BrandShowcase';
import HowItWorks from '../../Component/Home/HowItWorks';
import WhyChooseUs from '../../Component/Home/WhyChooseUs';
import Testimonials from '../../Component/Home/Testimonials';
import FAQ from '../../Component/Home/FAQ';
import Newsletter from '../../Component/Home/Newsletter';
import Statistics from '../../Component/Home/Statistics';

const Home = () => {
    const {loading}=use(AuthContext)
    if(loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className='bg-[var(--bg-main)]'>
            <HeroBanner />
            <TopBooking/>
            <BrandShowcase/>
            <HowItWorks/>
            <WhyChooseUs/>
            <Statistics />
            <Testimonials/>
            <FAQ/>
            <Newsletter/>  
        </div>
    );
};

export default Home;
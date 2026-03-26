import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import HeroBanner from '../../Component/Home/HeroBanner';
import TopBooking from '../../Component/Home/TopBooking';
import BrandShowcase from '../../Component/Home/BrandShowcase';
import HowItWorks from '../../Component/Home/HowItWorks';
import WhyChooseUs from '../../Component/Home/WhyChooseUs';
import Testimonials from '../../Component/Home/Testimonials';
import FAQ from '../../Component/Home/FAQ';
import Newsletter from '../../Component/Home/Newsletter';
import Statistics from '../../Component/Home/Statistics';
import LoadingSpinner from '../../Component/shared/LoadingSpinner';
import PromoBanner from '../../Component/Home/PromoBanner';

const Home = () => {
    const {loading}=use(AuthContext)
    if(loading) return <LoadingSpinner/>
    return (
        <div className='bg-[var(--bg-main)]'>
            <HeroBanner />
            <TopBooking/>
            <BrandShowcase/>
            <PromoBanner/>
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
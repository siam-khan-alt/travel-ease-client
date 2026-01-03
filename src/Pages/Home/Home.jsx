import React, { use } from 'react';
import Latestvehicles from '../../Component/Latestvehicles';
import AboutTravelEase from '../../Component/AboutTravelEase';
import TopCategories from '../../Component/TopCategories';
import HeroBanner from '../../Component/HeroBanner';
import TopBooking from '../../Component/TopBooking';
import { AuthContext } from '../../Context/AuthContext';
import LoadingSpinner from '../../Component/LoadingSpinner';
import Statistics from '../../Component/Statistics';
import WhyChooseUs from '../../Component/WhyChooseUs';
import FAQ from '../../Component/FAQ';
import Newsletter from '../../Component/Newsletter';
import HowItWorks from '../../Component/HowItWorks';
import Testimonials from '../../Component/Testimonials';

const Home = () => {
    const {loading}=use(AuthContext)
    if(loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className='bg-[#F4F1DE] dark:bg-[#1E293B]'>
            <HeroBanner />
            <HowItWorks />
            <TopCategories />
            <TopBooking />
            <Latestvehicles />
            <WhyChooseUs />
            <Statistics />
            <Testimonials />
            <FAQ />
            <Newsletter />
            <AboutTravelEase />
        </div>
    );
};

export default Home;
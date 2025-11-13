import React from 'react';
import Latestvehicles from '../../Component/Latestvehicles';
import AboutTravelEase from '../../Component/AboutTravelEase';
import TopCategories from '../../Component/TopCategories';
import HeroBanner from '../../Component/HeroBanner';
import TopBooking from '../../Component/TopBooking';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <TopBooking></TopBooking>
            <Latestvehicles></Latestvehicles>
            <TopCategories></TopCategories>
            <AboutTravelEase></AboutTravelEase>
            
        </div>
    );
};

export default Home;
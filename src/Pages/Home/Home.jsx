import React from 'react';
import Latestvehicles from '../../Component/Latestvehicles';
import AboutTravelEase from '../../Component/AboutTravelEase';
import TopCategories from '../../Component/TopCategories';
import HeroBanner from '../../Component/HeroBanner';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <Latestvehicles></Latestvehicles>
            <TopCategories></TopCategories>
            <AboutTravelEase></AboutTravelEase>
            
        </div>
    );
};

export default Home;
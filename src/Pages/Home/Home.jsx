import React from 'react';
import Latestvehicles from '../../Component/Latestvehicles';
import AboutTravelEase from '../../Component/AboutTravelEase';
import TopCategories from '../../Component/TopCategories';

const Home = () => {
    return (
        <div className='bg-[#F4F1DE]'>

            <Latestvehicles></Latestvehicles>
            <TopCategories></TopCategories>
            <AboutTravelEase></AboutTravelEase>
            
        </div>
    );
};

export default Home;
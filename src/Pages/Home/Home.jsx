import React, { use } from 'react';
import Latestvehicles from '../../Component/Latestvehicles';
import AboutTravelEase from '../../Component/AboutTravelEase';
import TopCategories from '../../Component/TopCategories';
import HeroBanner from '../../Component/HeroBanner';
import TopBooking from '../../Component/TopBooking';
import { AuthContext } from '../../Context/AuthContext';
import LoadingSpinner from '../../Component/LoadingSpinner';

const Home = () => {
    const {loading}=use(AuthContext)
    if(loading) return <LoadingSpinner></LoadingSpinner>
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
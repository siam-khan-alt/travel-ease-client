import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Component/shared/Navbar';
import Footer from '../Component/shared/Footer';


const MainLayout = () => {
    return (
        <div className='bg-[var(--bg-main)]'>
            <Navbar/>
            <div className='min-h-screen '>
                <Outlet></Outlet>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;
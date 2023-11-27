import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const DashLayout = () => {
    return (
        <div>
            <h3>DashBoard</h3>
            <Outlet/>
            <Toaster/>
            
        </div>
    );
};

export default DashLayout;
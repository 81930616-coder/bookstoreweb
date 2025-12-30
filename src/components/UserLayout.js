import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';

const UserLayout = () => {
    return (
        <>
            <Navbar />
            <CartDrawer />
            <Outlet />
        </>
    );
};

export default UserLayout;

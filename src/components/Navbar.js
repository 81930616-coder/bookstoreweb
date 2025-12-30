import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, BookOpen, user, ShieldCheck, Home } from 'lucide-react';
import { useMockData } from '../context/MockData';

const Navbar = () => {
    const { cart, toggleCart } = useMockData();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="glass-panel" style={{
            position: 'sticky',
            top: 20,
            zIndex: 100,
            borderRadius: '16px',
            padding: '1rem 2rem',
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px' }}>
                    <BookOpen color="white" size={24} />
                </div>
                <h2 style={{ margin: 0, color: 'white', fontWeight: 700, letterSpacing: '-0.5px' }}>BookStore<span style={{ color: 'var(--primary)' }}>.Pro</span></h2>
            </Link>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <NavLink to="/" icon={<Home size={18} />} text="Home" active={isActive('/')} />
                <NavLink to="/search" icon={<Search size={18} />} text="Browse" active={isActive('/search')} />
                <NavLink to="/request" icon={<BookOpen size={18} />} text="Request" active={isActive('/request')} />
                <NavLink to="/about" icon={<BookOpen size={18} />} text="About" active={isActive('/about')} />
            </div>


            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <button className="btn-primary" onClick={toggleCart} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingCart size={20} />
                    <span>Cart</span>
                    {cart.length > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'var(--accent)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            {cart.length}
                        </span>
                    )}
                </button>
            </div>
        </nav >
    );
};

const NavLink = ({ to, icon, text, active }) => (
    <Link to={to} style={{
        textDecoration: 'none',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 500,
        transition: 'color 0.3s'
    }}>
        {icon}
        {text}
    </Link>
);

export default Navbar;

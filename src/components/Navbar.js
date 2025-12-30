import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, BookOpen, user, ShieldCheck, Home } from 'lucide-react';
import { useMockData } from '../context/MockData';

const Navbar = () => {
    const { cart, toggleCart } = useMockData();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <nav className="glass-panel navbar" style={{
                position: 'sticky',
                top: 20, // Overridden by CSS for mobile
                zIndex: 100,
                borderRadius: '16px',
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s ease'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {/* Mobile Hamburger */}
                    <button
                        className="visible-mobile"
                        onClick={() => setIsMenuOpen(true)}
                        style={{ background: 'none', border: 'none', color: 'white', padding: 0, cursor: 'pointer' }}
                    >
                        <Search size={24} style={{ display: 'none' }} /> {/* Importing Menu icon would be better but re-using what we have or adding it */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>

                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px' }}>
                            <BookOpen color="white" size={24} />
                        </div>
                        <h2 className="logo" style={{ margin: 0, color: 'white', fontWeight: 700, letterSpacing: '-0.5px' }}>
                            BookStore<span style={{ color: 'var(--primary)' }}>.Pro</span>
                        </h2>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="nav-links-desktop" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <NavLink to="/" icon={<Home size={18} />} text="Home" active={isActive('/')} />
                    <NavLink to="/search" icon={<Search size={18} />} text="Browse" active={isActive('/search')} />
                    <NavLink to="/request" icon={<BookOpen size={18} />} text="Request" active={isActive('/request')} />
                    <NavLink to="/about" icon={<ShieldCheck size={18} />} text="About" active={isActive('/about')} />
                </div>


                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button className="btn-primary" onClick={toggleCart} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShoppingCart size={20} />
                        <span className="hidden-mobile">Cart</span>
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

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="mobile-menu-overlay">
                    <button
                        onClick={closeMenu}
                        style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <h2 onClick={closeMenu}><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></h2>
                    <h2 onClick={closeMenu}><Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>Browse</Link></h2>
                    <h2 onClick={closeMenu}><Link to="/request" style={{ color: 'white', textDecoration: 'none' }}>Request</Link></h2>
                    <h2 onClick={closeMenu}><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></h2>
                </div>
            )}
        </>
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

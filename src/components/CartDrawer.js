import React, { useEffect } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useMockData } from '../context/MockData';

const CartDrawer = () => {
    const { cart, removeFromCart, isCartOpen, toggleCart, purchasedBooks, confirmBuy } = useMockData();
    const [isPurchased, setIsPurchased] = React.useState(false);

    // Reset purchased state when opening drawer
    useEffect(() => {
        if (isCartOpen) setIsPurchased(false);
    }, [isCartOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') toggleCart();
        };
        if (isCartOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isCartOpen, toggleCart]);

    if (!isCartOpen) return null;

    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0).toFixed(2);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
            {/* Backdrop */}
            <div
                onClick={toggleCart}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    animation: 'fadeIn 0.3s ease'
                }}
            />

            {/* Drawer */}
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '400px',
                height: '100%',
                position: 'relative',
                zIndex: 1001,
                borderLeft: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideIn 0.3s ease-out'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <ShoppingBag /> Your Cart
                    </h2>
                    <button onClick={toggleCart} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {isPurchased ? (
                        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'rgba(74, 222, 128, 0.2)',
                                color: '#4ade80',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem auto'
                            }}>
                                <ShoppingBag size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Purchase Successful!</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your books are ready for download.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
                                {purchasedBooks.map((item, index) => (
                                    <div key={`purchased-${item.id}-${index}`} style={{
                                        display: 'flex',
                                        gap: '15px',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '12px',
                                        alignItems: 'center',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <img src={item.image} alt={item.title} style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: '0 0 5px 0', fontSize: '0.95rem' }}>{item.title}</h4>
                                            <a
                                                href={`http://localhost:5000/uploads/${item.pdf_file}`}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary"
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '5px 12px',
                                                    fontSize: '0.8rem',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Download PDF
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={toggleCart}
                                className="btn-primary"
                                style={{ marginTop: '2.5rem', width: '100%' }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : cart.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
                            <ShoppingBag size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={toggleCart}
                                className="btn-primary"
                                style={{ marginTop: '1rem' }}
                            >
                                Go Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} style={{ display: 'flex', gap: '15px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>
                                        <p style={{ margin: '0', color: 'var(--primary)', fontWeight: 'bold' }}>${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '5px' }}
                                        title="Remove"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {!isPurchased && cart.length > 0 && (
                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total:</span>
                            <span>${total}</span>
                        </div>
                        <button
                            className="btn-primary"
                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                            onClick={() => {
                                confirmBuy();
                                setIsPurchased(true);
                            }}
                        >
                            Confirm Buy
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
        </div>
    );
};

export default CartDrawer;

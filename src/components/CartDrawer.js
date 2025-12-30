import React, { useEffect } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useMockData } from '../context/MockData';

const CartDrawer = () => {
    const { cart, removeFromCart, isCartOpen, toggleCart } = useMockData();

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
                    {cart.length === 0 ? (
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

                {cart.length > 0 && (
                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total:</span>
                            <span>${total}</span>
                        </div>
                        <button className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }} onClick={() => alert('Checkout Logic Not Implemented in this Demo')}>
                            Checkout Now
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

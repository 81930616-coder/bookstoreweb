import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { useMockData } from '../context/MockData';

const BookCard = ({ book }) => {
    const { addToCart } = useMockData();

    return (
        <div className="glass-panel" style={{
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'transform 0.3s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <img
                    src={book.image ? `http://localhost:5000${book.image}` : 'https://via.placeholder.com/300x400?text=No+Cover'}
                    alt={book.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                />
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    color: 'var(--accent)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                }}>
                    {book.category}
                </div>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1.2rem' }}>{book.title}</h3>
                <p style={{ color: 'var(--primary)', margin: '0 0 0.8rem 0', fontSize: '0.9rem', fontWeight: 500 }}>
                    {book.author ? `by ${book.author}` : 'Unknown Author'}
                </p>
                <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0', fontSize: '0.9rem', flex: 1 }}>
                    {book.description?.substring(0, 80)}...
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>${book.price}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            className="btn-secondary"
                            onClick={() => addToCart(book)}
                            style={{ padding: '8px', borderRadius: '8px' }}
                            title="Add to Cart"
                        >
                            <ShoppingBag size={20} />
                        </button>
                        <button
                            className="btn-primary"
                            onClick={() => { addToCart(book); alert('Proceeding to checkout...'); }}
                            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;

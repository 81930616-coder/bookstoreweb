import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useMockData } from '../context/MockData';
import BookCard from '../components/BookCard';

const HomePage = () => {
    const { books } = useMockData();
    const featuredBooks = books.slice(0, 3);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section className="hero-section" style={{
                textAlign: 'center',
                padding: '6rem 2rem',
                marginBottom: '4rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h1 className="hero-title" style={{
                        fontSize: '4rem',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Discover Your Next<br />
                        <span style={{ color: 'var(--primary)', WebkitTextFillColor: 'var(--primary)' }}>Mind-Bending Read</span>
                    </h1>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.25rem',
                        maxWidth: '600px',
                        margin: '0 auto 3rem auto'
                    }}>
                        Explore our curated collection of bestsellers, classics, and hidden gems.
                        The pro way to manage your reading list.
                    </p>

                    <div className="btn-group" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/search" className="btn-primary btn-full-mobile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 30px', fontSize: '1.1rem' }}>
                            <Search size={20} />
                            Browse Library
                        </Link>
                        <Link to="/request" className="btn-secondary btn-full-mobile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 30px', fontSize: '1.1rem' }}>
                            Request a Book
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Featured Books</h2>
                        <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>Handpicked selection just for you</p>
                    </div>
                    <Link to="/search" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {featuredBooks.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useMockData } from '../context/MockData';
import BookCard from '../components/BookCard';

const SearchPage = () => {
    const { books } = useMockData();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Computer Science', 'Science', 'History', 'Stories', 'Math', 'Languages'];

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Browse Collection</h1>

                <div style={{ maxWidth: '600px', margin: '0 auto 2rem auto', position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '45px', fontSize: '1.1rem' }}
                    />
                </div>

                <div className="flex-stack-mobile" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={activeCategory === cat ? 'btn-primary' : 'btn-secondary'}
                            style={{ borderRadius: '20px', padding: '8px 20px', fontSize: '0.9rem' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>

            {filteredBooks.length === 0 && (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', borderRadius: '16px' }}>
                    <Filter size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                    <h3>No books found with these filters</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or category.</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;

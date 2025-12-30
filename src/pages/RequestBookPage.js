import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useMockData } from '../context/MockData';

const RequestBookPage = () => {
    const { requestBook } = useMockData();
    const [formData, setFormData] = useState({ title: '', author: '', notes: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        requestBook(formData);
        setSubmitted(true);
        setFormData({ title: '', author: '', notes: '' });
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="animate-fade-in" style={{ padding: '4rem 0', maxWidth: '600px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem' }}>Request a Book</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Can't find what you're looking for? Let us know!
                </p>

                {submitted ? (
                    <div style={{
                        background: 'rgba(52, 211, 153, 0.2)',
                        border: '1px solid #34d399',
                        color: '#34d399',
                        padding: '2rem',
                        borderRadius: '16px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <CheckCircle size={48} />
                        <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Request Sent Successfully!</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We'll look into adding this book to our collection.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Book Title</label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. The Hobbit"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Author (Optional)</label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={e => setFormData({ ...formData, author: e.target.value })}
                                placeholder="e.g. J.R.R. Tolkien"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Notes / Additional Info</label>
                            <textarea
                                rows="4"
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Any specific edition or details..."
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px', fontSize: '1.1rem' }}>
                            <Send size={20} />
                            Submit Request
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RequestBookPage;

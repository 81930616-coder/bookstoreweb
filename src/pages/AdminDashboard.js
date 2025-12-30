import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, List, Upload, FileText, CheckCircle } from 'lucide-react';
import { useMockData } from '../context/MockData';

const AdminDashboard = () => {
    const { isAdmin, addBook, requests } = useMockData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('add'); // 'add' or 'requests'
    const [newBook, setNewBook] = useState({
        title: '',
        price: '',
        category: 'Choice',
        description: '',
        image: '',
        pdfFile: null // Just a mock placeholder
    });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(newBook);
        setShowSuccess(true);
        setNewBook({ title: '', price: '', category: 'Choice', description: '', image: '', pdfFile: null });
        setTimeout(() => setShowSuccess(false), 3000);
    };

    if (!isAdmin) return null;

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className={activeTab === 'add' ? 'btn-primary' : 'btn-secondary'}
                        onClick={() => setActiveTab('add')}
                    >
                        <Plus size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                        Add Book
                    </button>
                    <button
                        className={activeTab === 'requests' ? 'btn-primary' : 'btn-secondary'}
                        onClick={() => setActiveTab('requests')}
                    >
                        <List size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                        Requests <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '10px', fontSize: '12px' }}>{requests.length}</span>
                    </button>
                </div>
            </div>

            {activeTab === 'add' ? (
                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Add New Book</h2>

                    {showSuccess && (
                        <div style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle size={20} /> Book Added Successfully!
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Book Title</label>
                            <input required type="text" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Price ($)</label>
                            <input required type="number" step="0.01" value={newBook.price} onChange={e => setNewBook({ ...newBook, price: e.target.value })} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Category</label>
                            <select value={newBook.category} onChange={e => setNewBook({ ...newBook, category: e.target.value })}>
                                <option>Computer Science</option>
                                <option>Science</option>
                                <option>History</option>
                                <option>Stories</option>
                                <option>Math</option>
                                <option>Languages</option>
                            </select>
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                            <textarea rows="3" value={newBook.description} onChange={e => setNewBook({ ...newBook, description: e.target.value })}></textarea>
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Cover Image URL</label>
                            <input type="text" placeholder="https://..." value={newBook.image} onChange={e => setNewBook({ ...newBook, image: e.target.value })} />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Book File (PDF)</label>
                            <div style={{ border: '2px dashed var(--glass-border)', padding: '2rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
                                <Upload style={{ marginBottom: '10px', color: 'var(--text-muted)' }} />
                                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Click to upload PDF file</p>
                                <input type="file" style={{ display: 'none' }} onChange={e => setNewBook({ ...newBook, pdfFile: e.target.files[0] })} />
                                {newBook.pdfFile && <p style={{ color: 'var(--primary)', marginTop: '10px' }}>{newBook.pdfFile.name}</p>}
                            </div>
                        </div>

                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Publish Book</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'rgba(0,0,0,0.2)' }}>
                            <tr>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Book Title</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Author</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Notes</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No requests found</td>
                                </tr>
                            ) : (
                                requests.map((req, idx) => (
                                    <tr key={idx} style={{ borderTop: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1.5rem' }}>{req.title}</td>
                                        <td style={{ padding: '1.5rem' }}>{req.author || '-'}</td>
                                        <td style={{ padding: '1.5rem' }}>{req.notes || '-'}</td>
                                        <td style={{ padding: '1.5rem' }}>
                                            <span style={{ background: 'rgba(255, 165, 0, 0.2)', color: 'orange', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem' }}>Pending</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

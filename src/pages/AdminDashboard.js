import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, List, Upload, CheckCircle, Trash2 } from 'lucide-react';
import { useMockData } from '../context/MockData';

const AdminDashboard = () => {
    const { isAdmin, addBook, updateBook, requests, books, deleteBook, deleteRequest } = useMockData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('add'); // 'add', 'requests', 'manage'
    const [editingBook, setEditingBook] = useState(null);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        price: '',
        category: 'Computer Science',
        description: '',
        image: null,
        pdfFile: null
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);

    useEffect(() => {
        if (!isAdmin) navigate('/admin');
    }, [isAdmin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addBook(newBook);
        if (success) {
            setShowSuccess(true);
            setNewBook({ title: '', author: '', price: '', category: 'Computer Science', description: '', image: null, pdfFile: null });
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const success = await updateBook(editingBook.id, editingBook);
        if (success) {
            setShowSuccess(true);
            setEditingBook(null);
            setTimeout(() => setShowSuccess(false), 3000);
            setActiveTab('manage');
        }
    };

    if (!isAdmin) return null;

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            {/* HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className={activeTab === 'add' ? 'btn-primary' : 'btn-secondary'} onClick={() => { setActiveTab('add'); setEditingBook(null); }}>
                        <Plus size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Add Book
                    </button>
                    <button className={activeTab === 'requests' ? 'btn-primary' : 'btn-secondary'} onClick={() => { setActiveTab('requests'); setEditingBook(null); }}>
                        <List size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Requests
                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '10px', fontSize: '12px', marginLeft: '8px' }}>{requests.length}</span>
                    </button>
                    <button className={activeTab === 'manage' ? 'btn-primary' : 'btn-secondary'} onClick={() => { setActiveTab('manage'); setEditingBook(null); }}>
                        <List size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Manage Books
                    </button>
                </div>
            </div>

            {showSuccess && (
                <div style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px', animation: 'slideDown 0.3s ease-out' }}>
                    <CheckCircle size={20} /> Action Completed Successfully!
                </div>
            )}

            {/* ADD BOOK TAB */}
            {activeTab === 'add' && !editingBook && (
                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Add New Book</h2>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Book Title</label>
                            <input required type="text" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Author</label>
                            <input required type="text" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
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

                        {/* IMAGE UPLOAD */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Cover Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setNewBook({ ...newBook, image: e.target.files[0] })}
                            />
                            {newBook.image && <p style={{ color: 'var(--primary)', marginTop: '10px' }}>Selected: {newBook.image.name}</p>}
                        </div>

                        {/* PDF UPLOAD */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Book File (PDF)</label>
                            <div
                                style={{ border: '2px dashed var(--glass-border)', padding: '2rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <Upload style={{ marginBottom: '10px', color: 'var(--text-muted)' }} />
                                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Click to upload PDF file</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf"
                                    style={{ display: 'none' }}
                                    onChange={e => setNewBook({ ...newBook, pdfFile: e.target.files[0] })}
                                />
                                {newBook.pdfFile && <p style={{ color: 'var(--primary)', marginTop: '10px' }}>{newBook.pdfFile.name}</p>}
                            </div>
                        </div>

                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Publish Book</button>
                        </div>
                    </form>
                </div>
            )}

            {/* EDIT BOOK UI (Inline-ish) */}
            {editingBook && (
                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Edit Book: {editingBook.title}</h2>

                    <form onSubmit={handleEditSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Book Title</label>
                            <input required type="text" value={editingBook.title} onChange={e => setEditingBook({ ...editingBook, title: e.target.value })} />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Author</label>
                            <input required type="text" value={editingBook.author} onChange={e => setEditingBook({ ...editingBook, author: e.target.value })} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Price ($)</label>
                            <input required type="number" step="0.01" value={editingBook.price} onChange={e => setEditingBook({ ...editingBook, price: e.target.value })} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Category</label>
                            <select value={editingBook.category} onChange={e => setEditingBook({ ...editingBook, category: e.target.value })}>
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
                            <textarea rows="3" value={editingBook.description} onChange={e => setEditingBook({ ...editingBook, description: e.target.value })}></textarea>
                        </div>

                        {/* IMAGE UPLOAD */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Cover Image (Leave empty to keep current)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setEditingBook({ ...editingBook, image: e.target.files[0] })}
                            />
                            {editingBook.image && typeof editingBook.image === 'string' && <img src={`http://localhost:5000${editingBook.image}`} alt="Current" style={{ marginTop: '10px', maxWidth: '100px', borderRadius: '4px' }} />}
                            {editingBook.image instanceof File && <p style={{ color: 'var(--primary)', marginTop: '10px' }}>New: {editingBook.image.name}</p>}
                        </div>

                        {/* PDF UPLOAD */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Book File (PDF - Leave empty to keep current)</label>
                            <div
                                style={{ border: '2px dashed var(--glass-border)', padding: '2rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => editFileInputRef.current.click()}
                            >
                                <Upload style={{ marginBottom: '10px', color: 'var(--text-muted)' }} />
                                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Click to replace PDF file</p>
                                <input
                                    ref={editFileInputRef}
                                    type="file"
                                    accept=".pdf"
                                    style={{ display: 'none' }}
                                    onChange={e => setEditingBook({ ...editingBook, pdfFile: e.target.files[0] })}
                                />
                                {editingBook.pdfFile instanceof File ? (
                                    <p style={{ color: 'var(--primary)', marginTop: '10px' }}>New: {editingBook.pdfFile.name}</p>
                                ) : (
                                    editingBook.pdf_file && <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Current: {editingBook.pdf_file.split('/').pop()}</p>
                                )}
                            </div>
                        </div>

                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem', display: 'flex', gap: '10px' }}>
                            <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Changes</button>
                            <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setEditingBook(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* REQUESTS TAB */}
            {activeTab === 'requests' && (
                <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'rgba(0,0,0,0.2)' }}>
                            <tr>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Book Title</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Author</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Notes</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Action</th>
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
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this request?')) {
                                                        deleteRequest(req.id);
                                                        setShowSuccess(true);
                                                        setTimeout(() => setShowSuccess(false), 3000);
                                                    }
                                                }}
                                                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}


            {/* MANAGE BOOKS TAB */}
            {activeTab === 'manage' && !editingBook && (
                <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'rgba(0,0,0,0.2)' }}>
                            <tr>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Book Title</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Author</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Category</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Price</th>
                                <th style={{ padding: '1.5rem', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No books found</td>
                                </tr>
                            ) : (
                                books.map((book) => (
                                    <tr key={book.id} style={{ borderTop: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1.5rem' }}>{book.title}</td>
                                        <td style={{ padding: '1.5rem' }}>{book.author || '-'}</td>
                                        <td style={{ padding: '1.5rem' }}>{book.category}</td>
                                        <td style={{ padding: '1.5rem' }}>${book.price}</td>
                                        <td style={{ padding: '1.5rem', display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => setEditingBook(book)}
                                                style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this book?')) deleteBook(book.id);
                                                }}
                                                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
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

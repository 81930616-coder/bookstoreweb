import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User } from 'lucide-react';
import { useMockData } from '../context/MockData';

const AdminLogin = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginAdmin } = useMockData();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await loginAdmin(username, password);
        if (success) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="animate-fade-in" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh'
        }}>
            <div className="glass-panel" style={{
                padding: '3rem',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'rgba(255, 101, 132, 0.2)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 1.5rem auto'
                }}>
                    <ShieldCheck size={30} color="var(--accent)" />
                </div>

                <h2 style={{ marginBottom: '0.5rem' }}>Admin Access</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Restricted area. Authorized personnel only.</p>

                <form onSubmit={handleLogin}>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>
                    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>

                    {error && <p style={{ color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
                        Verify Identity
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User } from 'lucide-react';
import { useMockData } from '../context/MockData';

const AdminSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { signupAdmin } = useMockData();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const result = await signupAdmin(email, password);
        if (result.success) {
            setSuccess('Admin account created successfully! You can now log in.');
            setTimeout(() => navigate('/admin'), 2000);
        } else {
            setError(result.message + (result.details ? `: ${result.details}` : ''));
        }
    };

    return (
        <div className="animate-fade-in" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
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

                <h2 style={{ marginBottom: '0.5rem' }}>Admin Signup</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Create a new administrator account.</p>

                <form onSubmit={handleSignup}>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            style={{ width: 'auto', margin: 0 }}
                        />
                        <label htmlFor="showPassword" style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>Show Password</label>
                    </div>

                    {error && <p style={{ color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
                    {success && <p style={{ color: '#4caf50', fontSize: '0.9rem', marginBottom: '1rem' }}>{success}</p>}

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', marginBottom: '1.5rem' }}>
                        Create Account
                    </button>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Already have an account? <span onClick={() => navigate('/admin')} style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 'bold' }}>Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;

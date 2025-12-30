import React from 'react';
import { BookOpen, Users, Globe } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>About BookStore.Pro</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                    Reimagining how you discover and experience literature.
                </p>
            </div>

            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', marginBottom: '2rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <BookOpen color="var(--primary)" /> Our Mission
                </h2>
                <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
                    We believe that books are more than just ink on paper; they are gateways to new worlds, ideas, and perspectives.
                    Our mission is to curate a collection that inspires, educates, and entertains. We use modern technology to make
                    finding your next favorite read seamless and enjoyable.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Users color="var(--accent)" /> The Community
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                        We're building a vibrant community of readers. From curated lists to request features, we listen to what our
                        readers want and deliver it.
                    </p>
                </div>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Globe color="#34d399" /> Global Access
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Digital or physical, we aim to bring the best literature to every corner of the globe.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

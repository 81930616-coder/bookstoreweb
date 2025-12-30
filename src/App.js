import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MockDataProvider } from './context/MockData';
import UserLayout from './components/UserLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import RequestBookPage from './pages/RequestBookPage';
import AboutPage from './pages/AboutPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';
import TestPage from './pages/TestPage.js';

// Inside <Routes>
<Route path="/test" element={<TestPage />} />


function App() {
    return (
        <MockDataProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        {/* User Routes */}
                        <Route path="/test" element={<TestPage />} />
                        <Route element={<UserLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/request" element={<RequestBookPage />} />
                            <Route path="/about" element={<AboutPage />} />
                        </Route>

                        {/* Admin Routes - Isolated */}
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </Router>
        </MockDataProvider>
    );
}

export default App;

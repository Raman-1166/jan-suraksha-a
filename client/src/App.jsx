import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MessageSquare, LayoutDashboard, ShieldCheck } from 'lucide-react';
import ReportingForm from './components/ReportingForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <header className="glass">
          <div className="container flex justify-between items-center w-full h-full" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
            <Link to="/" className="nav-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <ShieldCheck className="text-primary" size={32} color="var(--primary)" />
              <span style={{ color: 'var(--text-main)' }}>CivicAction AI</span>
            </Link>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'var(--text-main)', fontWeight: '500' }}>
                <MessageSquare size={18} /> Report
              </Link>
              <Link to="/dashboard" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'var(--text-main)', fontWeight: '500' }}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </nav>
          </div>
        </header>

        <main className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/" element={<ReportingForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 1.5rem', marginTop: 'auto', backgroundColor: 'white' }}>
          <div className="container text-center text-secondary" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>© 2026 Civic Action Intelligence Platform. Built for a better community.</p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <Link to="/" className="nav-link" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>About</Link>
              <Link to="/" className="nav-link" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link>
              <Link to="/" className="nav-link" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

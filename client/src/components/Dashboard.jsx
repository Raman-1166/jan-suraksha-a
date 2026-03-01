import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Filter, Map as MapIcon, List, Search, ExternalLink } from 'lucide-react';

const Dashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('/api/reports');
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredReports = filter === 'All'
        ? reports
        : reports.filter(r => r.category === filter);

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Civic Transparency Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Live feed of reported issues and community action status.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn glass" style={{ padding: '0.5rem 1rem' }}><MapIcon size={18} /> Map View</button>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><List size={18} /> List View</button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {['All', 'Pollution', 'Tree Cutting', 'Road Damage', 'Waste'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '0.5rem 1.2rem',
                            borderRadius: '20px',
                            border: '1px solid var(--border)',
                            background: filter === cat ? 'var(--primary)' : 'white',
                            color: filter === cat ? 'white' : 'var(--text-main)',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading transparency data...</p>
            ) : (
                <div className="grid grid-cols-3">
                    {filteredReports.length > 0 ? filteredReports.map(report => (
                        <div key={report._id} className="card glass" style={{ padding: '0' }}>
                            <img
                                src={report.imageUrl}
                                alt="Civic Issue"
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)' }}
                            />
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '0.2rem 0.6rem', borderRadius: '12px', backgroundColor: '#e2e8f0' }}>{report.category}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(report.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{report.description}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <Search size={14} /> {report.location?.address || 'Unknown Location'}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--primary)' }}>{report.status}</span>
                                    </div>
                                    <button className="nav-link" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--secondary)' }}>
                                        Details <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>No reports found for this category.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;

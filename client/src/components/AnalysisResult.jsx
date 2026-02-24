import React from 'react';
import { ArrowLeft, AlertCircle, Info, Shield, CheckCircle2 } from 'lucide-react';

const AnalysisResult = ({ report, onReset }) => {
    const { aiGuidance, imageUrl, category, severity, status, createdAt } = report;

    return (
        <div className="animate-fade-in">
            <button onClick={onReset} className="btn" style={{ marginBottom: '1rem', background: 'none', color: 'var(--text-secondary)' }}>
                <ArrowLeft size={18} /> Back to Report
            </button>

            <div className="grid grid-cols-2">
                <div className="card glass">
                    <img
                        src={imageUrl}
                        alt="Reported Issue"
                        style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', boxShadow: 'var(--shadow)' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            backgroundColor: '#d1fae5',
                            color: '#065f46'
                        }}>{category}</span>
                        <span style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            backgroundColor: severity === 'High' ? '#fee2e2' : '#fef3c7',
                            color: severity === 'High' ? '#991b1b' : '#92400e'
                        }}>{severity} Severity</span>
                    </div>
                    <p style={{ color: 'var(--text-main)' }}>{report.description}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Location: {report.location?.address} | Reported: {new Date(createdAt).toLocaleString()}
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="card glass" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af' }}>
                            <Shield size={20} /> Action Guidance Plan
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Immediate Local Action</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#1e3a8a' }}>{aiGuidance.level1}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Legal Complaint Process</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#1e3a8a' }}>{aiGuidance.level2}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1e40af', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Escalation & Advocacy</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#1e3a8a' }}>{aiGuidance.level3}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card glass">
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle2 size={20} className="text-primary" /> Case Status
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '2px', height: '40px', backgroundColor: 'var(--primary)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: '-4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                                <div style={{ position: 'absolute', bottom: 0, left: '-4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#cbd5e1' }}></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Report Filed: {new Date(createdAt).toLocaleDateString()}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Current Status: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{status}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResult;

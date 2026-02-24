import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
    return (
        <div className="card glass animate-fade-in" style={{
            backgroundColor: '#fff7ed',
            border: '1px solid #ffedd5',
            marginBottom: '2rem',
            padding: '1rem'
        }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <AlertTriangle color="#ea580c" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                    <h4 style={{ color: '#9a3412', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Legal Disclaimer & Safety Notice</h4>
                    <p style={{ color: '#c2410c', fontSize: '0.8rem', lineHeight: '1.4' }}>
                        CivicAction AI is a community guidance platform. The AI-generated action plans are for informational purposes only and do not constitute legal advice.
                        Always prioritize personal safety. Do not enter hazardous zones or private property without authorization.
                        Reports containing fake, defamatory, or harmful content will be removed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;

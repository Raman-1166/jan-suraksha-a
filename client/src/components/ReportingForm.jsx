import React, { useState } from 'react';
import { Camera, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import AnalysisResult from './AnalysisResult';
import Disclaimer from './Disclaimer';

const ReportingForm = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('location', JSON.stringify({ address: location }));

        try {
            setError(null);
            const response = await axios.post('/api/reports', formData);
            setResult(response.data);
        } catch (error) {
            console.error('Error submitting report:', error);
            setError(error.response?.data?.message || 'Failed to submit report. Ensure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return <AnalysisResult report={result} onReset={() => setResult(null)} />;
    }

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Disclaimer />
            <div className="card glass">
                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Camera className="text-primary" /> Report a Civic Problem
                </h2>

                {error && (
                    <div style={{ padding: '0.8rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid #fecaca' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="upload-container" style={{
                        border: '2px dashed var(--border)',
                        borderRadius: 'var(--radius)',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        position: 'relative'
                    }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                        />
                        {preview ? (
                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <Camera size={48} color="var(--text-secondary)" />
                                <p style={{ color: 'var(--text-secondary)' }}>Click or drag an image here to upload</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                        <textarea
                            className="glass"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                minHeight: '100px',
                                outline: 'none'
                            }}
                            placeholder="Describe the issue in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin style={{ position: 'absolute', left: '1rem', top: '1rem' }} size={18} color="var(--text-secondary)" />
                            <input
                                type="text"
                                className="glass"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 1rem 0.8rem 2.5rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                                placeholder="Enter address or landmark..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !image}
                        style={{ width: '100%', padding: '1rem' }}
                    >
                        {loading ? (
                            <><Loader2 className="animate-spin" /> Analyzing Issue...</>
                        ) : (
                            <><Send /> Submit Report & Get Action Plan</>
                        )}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                    <p style={{ fontSize: '0.85rem', color: '#92400e' }}>
                        <strong>Safety Warning:</strong> Please do not approach dangerous sites or enter private property. Use this platform to document from a safe distance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReportingForm;

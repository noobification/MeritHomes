import React from 'react';
import { MagicCard } from './magicui/magic-card';
import ConstellationBackground from './ConstellationBackground';
import './Contact.css';

const Contact = () => {
    const [formState, setFormState] = React.useState('idle'); // idle, submitting, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState('submitting');

        const myForm = e.target;
        const formData = new FormData(myForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => setFormState('success'))
            .catch((error) => {
                console.error(error);
                setFormState('error');
            });
    };

    return (
        <section className="contact-section" id="contact">
            <ConstellationBackground />
            <div className="container contact-container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="contact-info">
                    <h2 className="contact-title">Build with Merit.</h2>
                    <p className="contact-subtitle">
                        Ready to start your journey? Request a private consultation with our team to discuss your dream home.
                    </p>

                    <div className="detail-item">
                        <span className="detail-label">Direct</span>
                        <p>Dominik: (630) 656-8229<br />Matt: (630) 863-0868</p>
                    </div>
                </div>

                <MagicCard
                    className="contact-form-wrapper"
                    gradientColor="rgba(188, 155, 106, 0.08)"
                    gradientFrom="rgba(188, 155, 106, 0.5)"
                    gradientSize={500}
                >
                    {formState === 'success' ? (
                        <div className="success-message text-center p-8">
                            <h3 className="text-2xl font-display text-accent-gold mb-4">Vision Received.</h3>
                            <p className="text-white/70">Thank you for reaching out. Our team will review your outline and contact you shortly.</p>
                            <button
                                onClick={() => setFormState('idle')}
                                className="mt-8 text-accent-gold/60 text-sm uppercase tracking-widest hover:text-accent-gold transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form
                            className="contact-form"
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            onSubmit={handleSubmit}
                        >
                            {/* Netlify Hidden Fields */}
                            <input type="hidden" name="form-name" value="contact" />
                            <p className="hidden">
                                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                            </p>

                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="john@example.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="timeline">Expected Timeline</label>
                                <select id="timeline" name="timeline">
                                    <option>Within 6 months</option>
                                    <option>6 - 12 months</option>
                                    <option>1 - 2 years</option>
                                    <option>Exploring options</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Vision Outline</label>
                                <textarea id="message" name="message" rows="4" placeholder="Briefly describe your dream residence..." required></textarea>
                            </div>
                            <button
                                type="submit"
                                className={`submit-btn ${formState === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={formState === 'submitting'}
                            >
                                {formState === 'submitting' ? 'Sending...' : 'Request Consultation'}
                            </button>
                            {formState === 'error' && (
                                <p className="text-red-400 text-sm mt-4 text-center">Something went wrong. Please try again or call us directly.</p>
                            )}
                        </form>
                    )}
                </MagicCard>
            </div>
        </section>
    );
};

export default Contact;

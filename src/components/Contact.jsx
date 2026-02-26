import React from 'react';
import { MagicCard } from './magicui/magic-card';
import ConstellationBackground from './ConstellationBackground';
import './Contact.css';

const Contact = () => {
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
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeline">Expected Timeline</label>
                            <select id="timeline">
                                <option>Within 6 months</option>
                                <option>6 - 12 months</option>
                                <option>1 - 2 years</option>
                                <option>Exploring options</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Vision Outline</label>
                            <textarea id="message" rows="4" placeholder="Briefly describe your dream residence..."></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Request Consultation</button>
                    </form>
                </MagicCard>
            </div>
        </section>
    );
};

export default Contact;

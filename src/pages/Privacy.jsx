import React from 'react';
import Seo from '../components/Seo';
import { BUSINESS } from '../config/site';

function Privacy() {
    return (
        <main className="min-h-screen px-6 py-32">
            <Seo
                title="Privacy Policy | Merit Homes"
                description="How Merit Homes collects, uses, and protects the personal information you share with us."
                path="/privacy"
            />
            <div className="max-w-3xl mx-auto text-white/70 leading-relaxed">
                <h1 className="text-4xl font-display text-white mb-8">Privacy Policy</h1>
                <p className="mb-6 text-white/40 text-sm">Last updated: July 2026</p>

                <h2 className="text-xl text-white mt-10 mb-4">Information We Collect</h2>
                <p className="mb-4">
                    When you contact {BUSINESS.name} through our website, we collect the
                    information you provide: your name, email address, phone number,
                    project timeline, and the contents of your message.
                </p>

                <h2 className="text-xl text-white mt-10 mb-4">How We Use It</h2>
                <p className="mb-4">
                    We use your information solely to respond to your inquiry and discuss
                    your project. We do not sell, rent, or share your personal
                    information with third parties for marketing purposes.
                </p>

                <h2 className="text-xl text-white mt-10 mb-4">Forms and Hosting</h2>
                <p className="mb-4">
                    Our website is hosted on Netlify, and form submissions are processed
                    through Netlify Forms. Standard technical data (such as IP address
                    and browser type) may be logged by our hosting provider to operate
                    and secure the site.
                </p>

                <h2 className="text-xl text-white mt-10 mb-4">Your Choices</h2>
                <p className="mb-4">
                    You may request that we correct or delete the information you have
                    submitted at any time by calling us at (630) 656-8229.
                </p>

                <h2 className="text-xl text-white mt-10 mb-4">Contact</h2>
                <p className="mb-4">
                    Questions about this policy can be directed to {BUSINESS.name},
                    Lemont, IL — (630) 656-8229.
                </p>
            </div>
        </main>
    );
}

export default Privacy;

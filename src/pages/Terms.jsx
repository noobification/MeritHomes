import React from 'react';
import Seo from '../components/Seo';
import { BUSINESS } from '../config/site';

function Terms() {
    return (
        <main className="min-h-screen px-6 py-32">
            <Seo
                title="Terms of Service | Merit Homes"
                description="Terms governing the use of the Merit Homes website."
                path="/terms"
            />
            <div className="max-w-3xl mx-auto text-white/70 leading-relaxed">
                <h1 className="text-4xl font-display text-white mb-8">Terms of Service</h1>
                <p className="mb-6 text-white/40 text-sm">Last updated: July 2026</p>

                <h2 className="text-xl text-white mt-10 mb-4">Use of This Website</h2>
                <p className="mb-4">
                    This website is provided by {BUSINESS.name} for informational
                    purposes. The content, imagery, and design are the property of{' '}
                    {BUSINESS.name} and may not be reproduced without permission.
                </p>

                <h2 className="text-xl text-white mt-10 mb-4">No Offer or Guarantee</h2>
                <p className="mb-4">
                    Information on this site — including project imagery, descriptions,
                    and process outlines — is illustrative and does not constitute a
                    binding offer, quote, or guarantee of pricing, timeline, or
                    availability. All projects are governed by a written construction
                    agreement.
                </p>

                <h2 className="text-xl text-white mt-10 mb-4">Inquiries</h2>
                <p className="mb-4">
                    Submitting an inquiry through this website does not create a
                    contractual relationship. We will contact you to discuss your
                    project before any engagement begins.
                </p>

                <h2 className="text-xl text-white mt-10 mb-4">Contact</h2>
                <p className="mb-4">
                    {BUSINESS.name}, Lemont, IL — (630) 656-8229.
                </p>
            </div>
        </main>
    );
}

export default Terms;

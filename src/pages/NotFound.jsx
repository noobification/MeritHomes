import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { LOCATIONS } from '../config/site';

function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-6 py-32">
            <Seo
                title="Page Not Found | Merit Homes"
                description="The page you're looking for doesn't exist. Explore Merit Homes' custom home building services across Chicagoland."
                path="/404"
                noindex
            />
            <div className="max-w-2xl text-center">
                <p className="text-sm uppercase tracking-widest text-accent-gold mb-4">404</p>
                <h1 className="text-4xl md:text-5xl font-display text-white mb-6">
                    This page doesn't exist
                </h1>
                <p className="text-white/60 mb-10">
                    The page you're looking for may have moved. Head back home, or
                    explore where we build.
                </p>
                <Link
                    to="/"
                    className="inline-block border border-accent-gold text-accent-gold px-8 py-3 uppercase tracking-widest text-sm hover:bg-accent-gold hover:text-black transition-colors mb-12"
                >
                    Back to Home
                </Link>
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/40">
                    {LOCATIONS.map(({ path, label }) => (
                        <li key={path}>
                            <Link to={path} className="hover:text-accent-gold transition-colors">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default NotFound;

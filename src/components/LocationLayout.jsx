import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Seo from './Seo';
import { SITE_URL, BUSINESS } from '../config/site';

const LocationLayout = ({
    children,
    title,
    description,
    locality,
    image,
    faqSchemas = [],
    schemaOverride
}) => {
    const location = useLocation();
    // Normalize away trailing slashes so /hinsdale/ and /hinsdale produce
    // the identical canonical (and React can dedupe the hoisted tag against
    // the prerendered one).
    const pathname = location.pathname.replace(/\/+$/, '') || '/';
    const canonicalUrl = `${SITE_URL}${pathname}`;

    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${SITE_URL}/`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Chicagoland",
                "item": `${SITE_URL}/chicago`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": locality,
                "item": canonicalUrl
            }
        ]
    };

    const schemas = [breadcrumbList];

    if (faqSchemas.length > 0) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSchemas
        });
    }

    return (
        <>
            <Seo
                title={`${title} | ${BUSINESS.name}`}
                description={description}
                path={pathname}
                image={image}
                schemas={schemaOverride ? [schemaOverride] : schemas}
            />

            <div className="location-silo-wrapper min-h-screen">
                {/* Render a simple breadcrumb UI - Visually hidden but kept for SEO */}
                <div className="container mx-auto px-6 py-4 sr-only">
                    <p className="text-sm text-accent-gold/60 uppercase tracking-widest">
                        <Link to="/" className="hover:text-accent-gold transition-colors">Home</Link> &gt; <Link to="/chicago" className="hover:text-accent-gold transition-colors">Chicagoland</Link> &gt; {locality}
                    </p>
                </div>

                {children}
            </div>
        </>
    );
};

export default LocationLayout;

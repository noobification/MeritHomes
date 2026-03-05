import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const LocationLayout = ({
    children,
    title,
    description,
    locality,
    image = "https://yourdomain.com/default-share.jpg",
    faqSchemas = [],
    schemaOverride
}) => {
    const location = useLocation();
    const canonicalUrl = `https://yourdomain.com${location.pathname}`;

    // Default Breadcrumb
    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://yourdomain.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Chicagoland",
                "item": "https://yourdomain.com/chicago"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": locality,
                "item": canonicalUrl
            }
        ]
    };

    const localBusiness = {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": "Merit Homes",
        "image": image,
        "url": "https://yourdomain.com",
        "telephone": "+16306568229",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lemont",
            "addressRegion": "IL",
            "postalCode": "60439",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "41.6736",
            "longitude": "-87.9942"
        },
        "description": "Bespoke Luxury Custom Homes in Chicagoland.",
        "areaServed": [
            {
                "@type": "City",
                "name": locality,
                "containedInPlace": {
                    "@type": "State",
                    "name": "Illinois"
                }
            },
            {
                "@type": "State",
                "name": "Illinois"
            }
        ]
    };

    const article = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "publisher": {
            "@type": "Organization",
            "name": "Merit Homes"
        }
    };

    const schemas = [breadcrumbList, localBusiness, article];

    if (faqSchemas.length > 0) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSchemas
        });
    }

    return (
        <>
            <Helmet>
                <title>{title} | Merit Homes</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />

                <script type="application/ld+json">
                    {JSON.stringify(schemaOverride || schemas)}
                </script>
            </Helmet>

            <div className="location-silo-wrapper min-h-screen">
                {/* Render a simple breadcrumb UI - Visually hidden but kept for SEO */}
                <div className="container mx-auto px-6 py-4 sr-only">
                    <p className="text-sm text-accent-gold/60 uppercase tracking-widest">
                        <a href="/" className="hover:text-accent-gold transition-colors">Home</a> &gt; <a href="/chicago" className="hover:text-accent-gold transition-colors">Chicagoland</a> &gt; {locality}
                    </p>
                </div>

                {children}
            </div>
        </>
    );
};

export default LocationLayout;

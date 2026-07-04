import React from 'react';
import { SITE_URL, BUSINESS, LOCAL_BUSINESS_SCHEMA } from '../config/site';

/**
 * Single head manager for every route, using React 19 native document
 * metadata: <title>, <meta>, and <link> rendered anywhere are hoisted
 * into <head> automatically — on the client at runtime, and to the front
 * of the stream during static prerendering (scripts/prerender.mjs splits
 * them into the template's <head>). No head-management library needed.
 *
 * JSON-LD <script> blocks are intentionally not hoisted; they render in
 * place in the body, which Google parses identically.
 *
 * `path` must be the route path ('/', '/hinsdale', ...) — the canonical
 * URL is always derived from SITE_URL, never from window.location.
 */
const Seo = ({
    title,
    description,
    path,
    image = `${SITE_URL}/og-image.jpg`,
    ogType = 'website',
    schemas = [],
    noindex = false,
}) => {
    const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    const allSchemas = [LOCAL_BUSINESS_SCHEMA, ...schemas];

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content={BUSINESS.name} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {allSchemas.map((schema, i) => (
                <script
                    type="application/ld+json"
                    key={i}
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
};

export default Seo;

// Single source of truth for site-wide identity, NAP, and routes.
// Every canonical URL, schema block, sitemap entry, and prerendered
// route derives from this file — never hardcode the domain elsewhere.

export const SITE_URL = 'https://buildmeritil.com';

export const BUSINESS = {
    name: 'Merit Homes',
    description: 'Luxury custom home builder specializing in new construction and teardown rebuilds across Chicagoland.',
    phonePrimary: '+1-630-656-8229',
    phoneSecondary: '+1-630-863-0868',
    address: {
        locality: 'Lemont',
        region: 'IL',
        postalCode: '60439',
        country: 'US',
    },
    geo: {
        latitude: 41.6736,
        longitude: -87.9942,
    },
    priceRange: '$$$$',
    // Add live profile URLs as they are created (Google Business Profile,
    // Houzz, Instagram, Facebook, etc.) — these disambiguate the business
    // from same-name builders.
    sameAs: [],
};

// Location silo routes. label is used for footer/nav links and breadcrumbs.
export const LOCATIONS = [
    { path: '/barrington-hills', label: 'Barrington Hills' },
    { path: '/burr-ridge', label: 'Burr Ridge' },
    { path: '/chicago', label: 'Chicago' },
    { path: '/clarendon-hills', label: 'Clarendon Hills' },
    { path: '/downers-grove', label: 'Downers Grove' },
    { path: '/elmhurst', label: 'Elmhurst' },
    { path: '/frankfort', label: 'Frankfort' },
    { path: '/glen-ellyn', label: 'Glen Ellyn' },
    { path: '/hinsdale', label: 'Hinsdale' },
    { path: '/homer-glen', label: 'Homer Glen' },
    { path: '/lake-forest', label: 'Lake Forest' },
    { path: '/lemont', label: 'Lemont' },
    { path: '/naperville', label: 'Naperville' },
    { path: '/new-lenox', label: 'New Lenox' },
    { path: '/oak-brook', label: 'Oak Brook' },
    { path: '/palos-park', label: 'Palos Park' },
    { path: '/riverside', label: 'Riverside' },
    { path: '/st-charles', label: 'St. Charles' },
    { path: '/western-springs', label: 'Western Springs' },
    { path: '/wheaton', label: 'Wheaton' },
    { path: '/winnetka', label: 'Winnetka' },
];

// Every prerenderable route on the site (used by the prerender script
// and sitemap generator).
export const ALL_ROUTES = [
    '/',
    ...LOCATIONS.map((l) => l.path),
    '/privacy',
    '/terms',
    '/404',
];

// Canonical LocalBusiness entity — rendered once per page, identically,
// so Google sees a single consistent business definition.
export const LOCAL_BUSINESS_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    additionalType: 'https://schema.org/GeneralContractor',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.phonePrimary,
    image: `${SITE_URL}/og-image.jpg`,
    address: {
        '@type': 'PostalAddress',
        addressLocality: BUSINESS.address.locality,
        addressRegion: BUSINESS.address.region,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.country,
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
    },
    priceRange: BUSINESS.priceRange,
    areaServed: LOCATIONS.map((l) => ({
        '@type': 'City',
        name: `${l.label}, IL`,
    })),
    sameAs: BUSINESS.sameAs,
};

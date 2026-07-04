import React, { Suspense } from 'react';

// Sections must always render on the server so their content is present in
// the prerendered HTML for crawlers. Lazy children still code-split: React
// keeps the server-rendered markup visible while each chunk loads and
// hydrates progressively, so below-the-fold JS stays off the critical path.
// (The old IntersectionObserver gating rendered nothing server-side, which
// hid all below-the-fold content from search engines.)
const ViewportTrigger = ({ children, fallback = <div className="h-screen bg-background" /> }) => (
    <div>
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    </div>
);

export default ViewportTrigger;

import { StrictMode } from 'react';
import { StaticRouter } from 'react-router';
import App from './App.jsx';

// Server entry used only by scripts/prerender.mjs at build time.
// React 19 hoists <title>/<meta>/<link> to the front of the prerendered
// stream; the prerender script splits them into the template <head>.
export function createApp(url) {
    return (
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
    );
}

/**
 * Preloads an array of image URLs to ensure smooth canvas animations.
 * @param {string[]} urls - Array of image paths
 * @returns {Promise<HTMLImageElement[]>}
 */
export const preloadImages = (urls) => {
    return Promise.all(
        urls.map((url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(img);
                img.onerror = reject;
            });
        })
    );
};

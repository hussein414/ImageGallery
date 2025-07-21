import { fetchImageList, setImages } from './shared.js';
import { preloadImages } from './preloadImages.js';
import { renderWalls } from './renderWalls.js';

let currentPage = 1;

export async function loadNewBatch() {
    const imgs = await fetchImageList(100, currentPage++);
    if (!imgs.length) return;
    setImages(imgs);
    preloadImages(imgs, () => {
        renderWalls(window.density, window.distance);
    });
}

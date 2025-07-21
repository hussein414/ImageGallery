import { directions, allGridElements } from './shared.js';
import { startImageInterval } from './imageLoader.js';

export function renderWalls(density, distance) {
    const gridContainer = document.querySelector('.inf-grid-hero-container');
    gridContainer.style.setProperty('--grid-sz', density);
    gridContainer.style.setProperty('--rev-dis', distance);
    allGridElements.length = 0;

    directions.forEach(dir => {
        const parent = document.querySelector(`.${dir}`);
        if (!parent) return;
        parent.innerHTML = '';
        const total = density * density;
        for (let i = 0; i < total; i++) {
            const div = document.createElement('div');
            parent.appendChild(div);
            allGridElements.push(div);
        }
    });

    startImageInterval();
}

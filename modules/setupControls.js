import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
import { renderWalls } from './renderWalls.js';
import { setSpeed } from './imageLoader.js';

export function setupControls() {
    const PARAMS = {
        size: window.density,
        distance: window.distance,
        speed: window.speed,
    };

    const pane = new Pane();

    pane.addBinding(PARAMS, 'size', { min: 2, max: 8, step: 1 }).on('change', ev => {
        window.density = ev.value;
        renderWalls(window.density, window.distance);
    });

    pane.addBinding(PARAMS, 'distance', { min: 0, max: 100, step: 1 }).on('change', ev => {
        window.distance = ev.value;
        document.querySelector('.inf-grid-hero-container').style.setProperty('--rev-dis', window.distance);
    });

    pane.addBinding(PARAMS, 'speed', { min: 50, max: 400, step: 50 }).on('change', ev => {
        window.speed = ev.value;
        setSpeed(window.speed);
    });

    return { PARAMS, pane };
}

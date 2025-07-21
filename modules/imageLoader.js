import { getImages, allGridElements, pauseInterval } from './shared.js';

let intervalId;
export let speed = 200;
export function setSpeed(val) {
    speed = val;
}

export function startImageInterval() {
    if (intervalId) clearInterval(intervalId);
    let loadedCount = 0;
    const total = allGridElements.length;

    console.log('🧩 Starting image interval...');
    console.log('📦 Total grid elements:', total);
    console.log('🖼️ Available images:', getImages());

    intervalId = setInterval(() => {
        if (window.isPaused) {
            console.log('⏸ Interval paused...');
            return;
        }

        const unloaded = allGridElements.filter(el => !el.classList.contains('loaded'));
        if (!unloaded.length) {
            console.log('✅ All elements loaded.');
            return;
        }

        const el = unloaded[Math.floor(Math.random() * unloaded.length)];
        const imgList = getImages();
        const img = imgList[Math.floor(Math.random() * imgList.length)];

        if (!el) {
            console.warn('❌ No element to load into!');
            return;
        }
        if (!img) {
            console.warn('❌ No valid image found!');
            return;
        }

        console.log('📌 Loading image into element:', el);
        console.log('🔗 Image URL:', img);

        el.style.background = `url('${img}')`;
        el.classList.add('loaded');

        el.addEventListener('click', () => {
            el.classList.add('selected');
            el.parentNode.classList.add('selectedPane');
            pauseInterval();
        });

        loadedCount++;
        if (loadedCount >= total) {
            clearInterval(intervalId);
            document.dispatchEvent(new Event('allImagesLoaded'));
        }
    }, speed);
}

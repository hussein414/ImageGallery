export const directions = ['top', 'right', 'bottom', 'left'];
export const allGridElements = [];

let images = [];

export function setImages(imgs) {
    images = imgs;
}

export function getImages() {
    return images;
}

export async function fetchImageList(limit = 100) {
    // از seed استفاده کن تا مطمئن باشه عکس وجود داره
    return Array.from({ length: limit }, () =>
        `https://picsum.photos/seed/${Math.random().toString(36).substring(2)}/900/500`
    );
}

export function pauseInterval() {
    window.isPaused = true;
}

export function resumeInterval() {
    document.querySelector('.selected')?.classList.remove('selected');
    document.querySelector('.selectedPane')?.classList.remove('selectedPane');
    if (!window.isPaused) return;
    window.isPaused = false;
    import('./imageLoader.js').then(m => m.startImageInterval());
}

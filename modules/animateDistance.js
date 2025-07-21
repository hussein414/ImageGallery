export function animateDistance(toValue, duration = 600, callback = () => {}) {
    const el = document.querySelector('.inf-grid-hero-container');
    const fromValue = window.distance;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.distance = fromValue + (toValue - fromValue) * eased;
        el.style.setProperty('--rev-dis', window.distance.toFixed(2));
        callback(Math.round(window.distance));

        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

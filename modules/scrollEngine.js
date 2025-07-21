import { loadNewBatch } from './mainUtils.js';


export function setupInfiniteScroll() {
    let scrollDepth = 0;
    let isLoadingNext = false;
    const maxDepth = 3000;

    window.addEventListener('wheel', async (e) => {
        e.preventDefault();

        scrollDepth += e.deltaY;
        scrollDepth = Math.max(0, scrollDepth);

        gsap.to('.inf-grid-hero-container', {
            duration: 0.5,
            onUpdate: () => {
                const depth = (scrollDepth / 20).toFixed(2);
                document.querySelector('.inf-grid-hero-container')
                    ?.style.setProperty('--rev-dis', depth);
            },
            overwrite: true,
            ease: 'power2.out'
        });

        if (scrollDepth > maxDepth && !isLoadingNext) {
            isLoadingNext = true;
            if (typeof loadNewBatch === 'function') {
                await loadNewBatch();
            }
            scrollDepth = 0;
            gsap.to('.inf-grid-hero-container', {
                duration: 0.3,
                onUpdate: () => {
                    document.querySelector('.inf-grid-hero-container')
                        ?.style.setProperty('--rev-dis', '0');
                },
                overwrite: true
            });
            isLoadingNext = false;
        }
    }, { passive: false });
}


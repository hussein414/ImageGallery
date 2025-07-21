export function preloadImages(srcArray, callback) {
    let loaded = 0;
    srcArray.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loaded++;
            if (loaded === srcArray.length) callback();
        };
        img.src = src;
    });
}

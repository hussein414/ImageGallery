import { setupInfiniteScroll } from './modules/scrollEngine.js';
import { resumeInterval } from './modules/shared.js';
import { animateDistance } from './modules/animateDistance.js';
import { setupControls } from './modules/setupControls.js';
import { loadNewBatch } from './modules/mainUtils.js';

window.density = 5;
window.distance = 0;
window.speed = 200;
window.isPaused = false;

document.addEventListener("DOMContentLoaded", async () => {
  await loadNewBatch();

  const backBtn = document.getElementById('back-btn');
  backBtn?.addEventListener('click', resumeInterval);

  const triggerBtn = document.querySelector('.button');
  const { PARAMS, pane } = setupControls();

  triggerBtn?.addEventListener('click', () => {
    const to = window.distance === 100 ? 0 : 100;
    animateDistance(to, 1000, (val) => {
      PARAMS.distance = val;
      pane.refresh();
    });
  });

  document.getElementById('refresh-images')?.addEventListener('click', loadNewBatch);

  document.addEventListener('allImagesLoaded', () => {
    document.body.classList.add('all-loaded');
  });

  setupInfiniteScroll();
  window.addEventListener('scroll', () => {
    console.log('ScrollY:', window.scrollY);
  });

});

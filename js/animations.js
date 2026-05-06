export function initAnimations() {
  initReveal();
  initStatCounters();
  initFeedDuplicate();
  initIntegrationsDuplicate();
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
}

function initStatCounters() {
  const stats = document.querySelectorAll('.stat[data-stat]');
  if (!stats.length) return;

  const animate = (el) => {
    const target = el.dataset.stat;
    const numEl = el.querySelector('.num');
    if (target === 'literal') return;
    const value = parseInt(target, 10);
    const duration = 1500;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      numEl.textContent = Math.round(eased * value);
      if (p < 1) requestAnimationFrame(tick);
      else numEl.textContent = value;
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => io.observe(s));
}

function initFeedDuplicate() {
  const ul = document.getElementById('feedTrack');
  if (!ul) return;
  Array.from(ul.children).forEach(c => ul.appendChild(c.cloneNode(true)));
}

function initIntegrationsDuplicate() {
  const track = document.getElementById('integTrack');
  if (!track) return;
  Array.from(track.children).forEach(c => track.appendChild(c.cloneNode(true)));
}

export function initNav() {
  const nav = document.getElementById('nav');
  const progress = document.getElementById('navProgress');

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('scrolled', y > 30);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? Math.min(100, (y / h) * 100) : 0;
    progress.style.width = p + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const btn = document.getElementById('hambBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  let open = false;
  const setOpen = (v) => {
    open = v;
    menu.classList.toggle('open', v);
    btn.setAttribute('aria-expanded', String(v));
    menu.setAttribute('aria-hidden', String(!v));
    document.body.style.overflow = v ? 'hidden' : '';
  };

  btn.addEventListener('click', () => setOpen(!open));
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && open) setOpen(false);
  });
}

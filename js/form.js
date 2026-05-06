export function initForm() {
  initFAQ();
  initContactForm();
}

function initFAQ() {
  document.querySelectorAll('.faq__item').forEach(item => {
    const btn = item.querySelector('.faq__btn');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq__item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq__btn').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');

  const setError = (name, on) => {
    const field = form.querySelector('[name="' + name + '"]');
    if (!field) return;
    const wrap = field.closest('.field');
    if (wrap) wrap.classList.toggle('field--error', on);
  };

  ['name', 'company', 'process', 'phone'].forEach(n => {
    const el = form.elements[n];
    if (el) el.addEventListener('input', () => setError(n, false));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.elements['name'].value.trim();
    const company = form.elements['company'].value.trim();
    const process = form.elements['process'].value.trim();
    const phone   = form.elements['phone'].value.trim();
    const channel = form.elements['channel'].value;

    let ok = true;
    [['name', name], ['company', company], ['process', process], ['phone', phone]].forEach(([key, val]) => {
      if (!val) ok = false;
      setError(key, !val);
    });
    if (!ok) return;

    btn.classList.add('loading');
    btn.disabled = true;

    const lines = [
      'Olá, vim pelo site da Auton.',
      '',
      'Nome: ' + name,
      'Empresa: ' + company,
      'Processo a automatizar: ' + process,
      'WhatsApp: ' + phone,
      'Canal preferido: ' + channel,
    ];
    const msg = encodeURIComponent(lines.join('\n'));
    const url = 'https://wa.me/5561982365437?text=' + msg;

    setTimeout(() => {
      success.classList.add('show');
      window.open(url, '_blank', 'noopener');
      setTimeout(() => {
        btn.classList.remove('loading');
        btn.disabled = false;
      }, 800);
    }, 600);
  });
}

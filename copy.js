// Copy buttons: data-copy="<element id>" copies that element's text; data-copy-text copies the attribute value.
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-copy], [data-copy-text]');
  if (!btn) return;
  const text = btn.dataset.copyText ?? document.getElementById(btn.dataset.copy).textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    document.body.append(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  const status = btn.parentElement.querySelector('.copied');
  if (status) {
    status.textContent = 'Copied';
    clearTimeout(btn._t);
    btn._t = setTimeout(() => (status.textContent = ''), 2000);
  }
});

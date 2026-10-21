const body = document.body;
const modeButton = document.querySelector('.mode-switch');
const modeLabel = document.querySelector('.mode-label');
const cursor = document.querySelector('.cursor-dot');
const timeTarget = document.querySelector('[data-seoul-time]');
const toast = document.querySelector('.toast');
const copyButton = document.querySelector('[data-copy-text]');

modeButton?.addEventListener('click', () => {
  const isOutside = body.classList.toggle('outside-mode');
  modeButton.setAttribute('aria-pressed', String(isOutside));
  if (modeLabel) modeLabel.textContent = isOutside ? 'OUTSIDE MODE' : 'OTHER MODE';
});

window.addEventListener('pointermove', (event) => {
  if (!cursor) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll('a, button, [tabindex]').forEach((element) => {
  element.addEventListener('pointerenter', () => cursor?.classList.add('active'));
  element.addEventListener('pointerleave', () => cursor?.classList.remove('active'));
});

function updateSeoulTime() {
  if (!timeTarget) return;
  timeTarget.textContent = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(new Date());
}
updateSeoulTime();
setInterval(updateSeoulTime, 1000);

copyButton?.addEventListener('click', async () => {
  const message = copyButton.dataset.copyText || '';
  try { await navigator.clipboard.writeText(message); } catch (_) { /* clipboard may be unavailable */ }
  toast?.classList.add('show');
  window.setTimeout(() => toast?.classList.remove('show'), 1800);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.18 });

document.querySelectorAll('.practice-panel, .principle-list li, .manifesto-response').forEach((element) => observer.observe(element));

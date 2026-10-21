const body = document.body;
const modeButton = document.querySelector('.mode-switch');
const modeLabel = document.querySelector('.mode-label');
const cursor = document.querySelector('.cursor-dot');
const timeTarget = document.querySelector('[data-seoul-time]');
const toast = document.querySelector('.toast');
const copyButton = document.querySelector('[data-copy-text]');
const planBoard = document.querySelector('.plan-board');
const planLinks = document.querySelectorAll('.plan-node');
const homeLink = document.querySelector('.brand');

modeButton?.addEventListener('click', () => {
  const isOutside = body.classList.toggle('outside-mode');
  modeButton.setAttribute('aria-pressed', String(isOutside));
  if (modeLabel) modeLabel.textContent = isOutside ? 'OUTSIDE MODE' : 'OTHER MODE';
});

homeLink?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.pushState(null, '', '#top');
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

planBoard?.addEventListener('pointermove', (event) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = planBoard.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - .5;
  const y = (event.clientY - bounds.top) / bounds.height - .5;
  planBoard.style.setProperty('--ry', `${x * 2.2}deg`);
  planBoard.style.setProperty('--rx', `${y * -2.2}deg`);
});

planBoard?.addEventListener('pointerleave', () => {
  planBoard.style.setProperty('--ry', '0deg');
  planBoard.style.setProperty('--rx', '0deg');
});

planLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    link.classList.add('selected');
    planBoard?.classList.add('is-navigating');
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280;
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', link.getAttribute('href'));
      target.classList.add('arrived');
      window.setTimeout(() => target.classList.remove('arrived'), 800);
      planBoard?.classList.remove('is-navigating');
      link.classList.remove('selected');
    }, delay);
  });
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

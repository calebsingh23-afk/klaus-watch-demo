const stage = document.querySelector('.stage');
const story = document.querySelector('.story');
const camera = document.querySelector('.camera');
const shade = document.querySelector('.shade');
const opening = document.querySelector('.opening');
const reveal = document.querySelector('.reveal');
const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
const phone = matchMedia('(max-width: 700px)');
const still = matchMedia('(prefers-reduced-motion: reduce), (max-height: 550px)');

// Active scroll distances in viewport-height units, in story order.
const timing = { desktop: [65, 90, 65], phone: [36, 73, 36] };
const clamp = (value) => Math.min(1, Math.max(0, value));
const ease = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const mix = (from, to, t) => from + (to - from) * t;
let frame = 0;
let activeTiming = timing.desktop;

function render() {
  frame = 0;
  const [first, middle, last] = activeTiming;
  const total = first + middle + last;
  const travel = story.offsetHeight - stage.offsetHeight;
  const distance = still.matches || travel <= 0 ? 0 :
    clamp((header.offsetHeight - story.getBoundingClientRect().top) / travel) * total;
  const t = ease((distance - first + first * .3) / (middle * .65 + first * .3));
  const pullback = ease((distance - first - middle * .65) / (middle * .35 + last * .2));
  const mobile = phone.matches;
  const scale = mix(mix(mobile ? 1.48 : 1.68, mobile ? 2.55 : 2.85, t), 1, pullback);
  const x = mix(mix(mobile ? 17 : 19, mobile ? -7 : -10, t), 0, pullback);
  const y = mix(mix(mobile ? 12 : 13, mobile ? -10 : -12, t), 0, pullback);
  const rotation = mix(mix(-17, -9, t), mobile ? -3 : -12, pullback);
  camera.style.transform = still.matches ? '' : `translate(${x}%, ${y}%) scale(${scale}) rotate(${rotation}deg)`;
  shade.style.opacity = still.matches ? '.12' : mix(mix(1, .26, t), .12, pullback);
  const beat = distance < first ? 'opening' : distance < first + middle ? 'detail' : 'reveal';
  stage.dataset.beat = beat;
  // Preserve a focused link if the visitor scrolls with the keyboard.
  opening.hidden = beat !== 'opening' && !opening.contains(document.activeElement);
  reveal.hidden = beat !== 'reveal' && !reveal.contains(document.activeElement);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(render);
}

function setMenu(open, returnFocus = false) {
  menu.setAttribute('aria-expanded', String(open));
  if (returnFocus) menu.focus();
}

function configure() {
  activeTiming = phone.matches ? timing.phone : timing.desktop;
  story.style.setProperty('--travel', `${activeTiming.reduce((sum, beat) => sum + beat, 0)}svh`);
  document.documentElement.classList.toggle('motion', !still.matches);
  menu.hidden = !phone.matches;
  if (!phone.matches) setMenu(false);
  render();
}

document.documentElement.classList.add('enhanced');
configure();
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
header.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    event.preventDefault();
    setMenu(false, true);
  }
});
header.addEventListener('focusout', (event) => {
  if (!header.contains(event.relatedTarget)) setMenu(false);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
stage.addEventListener('focusout', schedule);
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule);
phone.addEventListener('change', configure);
still.addEventListener('change', configure);



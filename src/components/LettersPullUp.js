import { charactersOf, createStage } from './motion-utils.js';

export function renderLettersPullUp({
  eyebrow = 'LettersPullUp',
  text = 'Bring every letter above the fold.',
  caption = 'Stripe-like masked vertical reveal for premium headlines.',
  stagger = 0.05,
} = {}) {
  const { root, titleElement } = createStage({ eyebrow, caption });
  const container = document.createElement('span');
  container.className = 'letters-pull-up';

  charactersOf(text).forEach((character, index) => {
    const mask = document.createElement('span');
    mask.className = 'letters-pull-up__mask';

    const span = document.createElement('span');
    span.className = 'letters-pull-up__char';
    span.textContent = character;
    span.style.animationDelay = `${index * stagger}s`;

    mask.appendChild(span);
    container.appendChild(mask);
  });

  titleElement.replaceChildren(container);
  return root;
}

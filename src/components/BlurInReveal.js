import { charactersOf, createStage } from './motion-utils.js';

export function renderBlurInReveal({
  eyebrow = 'BlurInReveal',
  text = 'From haze to clarity.',
  caption = 'A Linear-inspired reveal that sharpens as it enters.',
  stagger = 0.035,
} = {}) {
  const { root, titleElement } = createStage({ eyebrow, caption });
  const container = document.createElement('span');
  container.className = 'blur-reveal';

  charactersOf(text).forEach((character, index) => {
    const span = document.createElement('span');
    span.className = 'blur-reveal__char';
    span.textContent = character;
    span.style.animationDelay = `${index * stagger}s`;
    container.appendChild(span);
  });

  titleElement.replaceChildren(container);
  return root;
}

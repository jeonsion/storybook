import { createStage } from './motion-utils.js';

export function renderGlitchText({
  eyebrow = 'GlitchText',
  text = 'Signal lost. Style found.',
  caption = 'RGB split and digital noise for a punchy glitch headline.',
} = {}) {
  const { root, titleElement } = createStage({ eyebrow, caption });
  const container = document.createElement('span');
  container.className = 'glitch-text';
  container.dataset.text = text;
  container.textContent = text;

  titleElement.replaceChildren(container);
  return root;
}

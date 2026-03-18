import { createStage } from './motion-utils.js';

export function renderAnimatedGradientText({
  eyebrow = 'AnimatedGradientText',
  text = 'Color that never stands still.',
  caption = 'Instagram-like animated gradient flow clipped directly into the text.',
} = {}) {
  const { root, titleElement } = createStage({ eyebrow, caption });
  const container = document.createElement('span');
  container.className = 'animated-gradient-text';
  container.textContent = text;

  titleElement.replaceChildren(container);
  return root;
}

import { createStage, randomGlyph, stopWhenDetached } from './motion-utils.js';

export function renderTextScramble({
  eyebrow = 'TextScramble',
  text = 'Decode the idea behind the interface.',
  caption = 'Matrix-like scramble that resolves into the final message.',
  frameRate = 35,
  settleStep = 1,
} = {}) {
  const { root, titleElement } = createStage({ eyebrow, caption });
  const container = document.createElement('span');
  container.className = 'text-scramble';

  Array.from(text).forEach((character) => {
    const span = document.createElement('span');
    span.className = 'text-scramble__char';
    span.dataset.target = character;
    span.dataset.state = 'scrambling';
    span.textContent = character === ' ' ? '\u00A0' : randomGlyph();
    container.appendChild(span);
  });

  titleElement.replaceChildren(container);

  let settled = 0;
  const characters = Array.from(container.children);
  const guard = stopWhenDetached(() => root.isConnected);
  const scrambleInterval = guard.setInterval(() => {
    settled = Math.min(characters.length, settled + settleStep);

    characters.forEach((node, index) => {
      const target = node.dataset.target ?? '';
      if (index < settled) {
        node.dataset.state = 'settled';
        node.textContent = target === ' ' ? '\u00A0' : target;
      } else {
        node.dataset.state = 'scrambling';
        node.textContent = target === ' ' ? '\u00A0' : randomGlyph();
      }
    });

    if (settled >= characters.length) {
      window.clearInterval(scrambleInterval);
    }
  }, frameRate);

  return root;
}

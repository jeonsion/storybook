import { createStage, stopWhenDetached } from './motion-utils.js';

export function renderFlipWords({
  eyebrow = 'FlipWords',
  leadingText = 'Built for',
  words = ['designers', 'developers', 'teams'],
  caption = 'Framer-style rotating value prop for hero headlines.',
  interval = 1800,
} = {}) {
  const { root, titleElement } = createStage({ eyebrow, caption, titleAsInline: true });
  const container = document.createElement('span');
  container.className = 'flip-words';

  const staticText = document.createElement('span');
  staticText.className = 'flip-words__static';
  staticText.textContent = `${leadingText} `;

  const viewport = document.createElement('span');
  viewport.className = 'flip-words__viewport';

  const word = document.createElement('span');
  word.className = 'flip-words__word';
  word.textContent = words[0] ?? '';

  viewport.appendChild(word);
  container.append(staticText, viewport);
  titleElement.replaceChildren(container);

  let currentIndex = 0;
  const guard = stopWhenDetached(() => root.isConnected);
  guard.setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    word.classList.remove('is-flipping');
    void word.offsetWidth;
    word.textContent = words[currentIndex];
    word.classList.add('is-flipping');
  }, interval);

  return root;
}

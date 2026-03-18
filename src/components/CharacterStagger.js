import { charactersOf, createStage } from './motion-utils.js';

export function renderCharacterStagger({
  eyebrow = 'CharacterStagger',
  text = 'Ship motion, one character at a time.',
  caption = 'Apple-style staggered typography that rises into place sequentially.',
  stagger = 0.04,
  duration = 0.55,
} = {}) {
  const { root, titleElement } = createStage({ eyebrow, title: text, caption });
  const container = document.createElement('span');
  container.className = 'character-stagger';

  charactersOf(text).forEach((character, index) => {
    const span = document.createElement('span');
    span.className = 'character-stagger__char';
    span.textContent = character;
    span.style.animationDelay = `${index * stagger}s`;
    span.style.setProperty('--motion-duration', `${duration}s`);
    container.appendChild(span);
  });

  titleElement.replaceChildren(container);
  root.dataset.component = 'character-stagger';
  return root;
}

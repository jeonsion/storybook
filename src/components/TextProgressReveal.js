import { createStage } from './motion-utils.js';

function wordsOf(text) {
  return String(text ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function applyProgress(container, value) {
  container.style.setProperty('--progress', value.toFixed(3));
}

export function renderTextProgressReveal({
  eyebrow = 'TextProgressReveal',
  text = 'The weather in the UK is a curious experiment designed to test patience rather than provide comfort.',
  caption = 'A scroll-progress-style word reveal inspired by the reference tutorial, exposed here with a live progress scrubber.',
  progress = 0.45,
  highlightCount = 2,
  showSlider = true,
} = {}) {
  const words = wordsOf(text);
  const total = Math.max(words.length, 1);
  const step = 1 / total;

  const { root, titleElement } = createStage({ eyebrow, caption });
  root.classList.add('motion-stage--progress');

  const shell = document.createElement('div');
  shell.className = 'text-progress-reveal';

  const progressRow = document.createElement('div');
  progressRow.className = 'text-progress-reveal__progress';

  const label = document.createElement('span');
  label.className = 'text-progress-reveal__label';
  progressRow.appendChild(label);

  if (showSlider) {
    const slider = document.createElement('input');
    slider.className = 'text-progress-reveal__slider';
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = String(progress);
    slider.addEventListener('input', () => {
      const next = Number(slider.value);
      applyProgress(shell, next);
      label.textContent = `Scroll: ${Math.round(next * 100)}%`;
    });
    progressRow.appendChild(slider);
  }

  label.textContent = `Scroll: ${Math.round(progress * 100)}%`;

  const copy = document.createElement('span');
  copy.className = 'text-progress-reveal__copy';

  words.forEach((word, index) => {
    const wordElement = document.createElement('span');
    wordElement.className = 'text-progress-reveal__word';
    if (index < highlightCount) {
      wordElement.classList.add('is-highlighted');
    }
    wordElement.textContent = word;
    wordElement.style.setProperty('--word-index', String(index));
    wordElement.style.setProperty('--word-turn', String(Math.max(0, (index - 2) / total)));
    wordElement.style.setProperty('--word-step', String(step));
    copy.appendChild(wordElement);
  });

  shell.append(progressRow, copy);
  applyProgress(shell, Number(progress));
  titleElement.replaceChildren(shell);

  return root;
}

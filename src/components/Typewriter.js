import { createStage, stopWhenDetached } from './motion-utils.js';

export function renderTypewriter({
  eyebrow = 'Typewriter',
  text = 'Building delightful interfaces...',
  caption = 'Terminal- and ChatGPT-like typing with a blinking cursor.',
  speed = 55,
  startDelay = 250,
  cursor = '|',
} = {}) {
  const { root, titleElement } = createStage({ eyebrow, caption });
  const container = document.createElement('span');
  container.className = 'typewriter';

  const output = document.createElement('span');
  output.className = 'typewriter__text';
  const cursorElement = document.createElement('span');
  cursorElement.className = 'typewriter__cursor';
  cursorElement.textContent = cursor;

  container.append(output, cursorElement);
  titleElement.replaceChildren(container);

  const guard = stopWhenDetached(() => root.isConnected);
  guard.setTimeout(() => {
    let index = 0;
    const typingInterval = guard.setInterval(() => {
      index += 1;
      output.textContent = text.slice(0, index);

      if (index >= text.length) {
        window.clearInterval(typingInterval);
      }
    }, speed);
  }, startDelay);

  return root;
}

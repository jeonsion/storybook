const nbsp = '\u00A0';

export function charactersOf(text) {
  return Array.from(text ?? '').map((character) => (character === ' ' ? nbsp : character));
}

export function createStage({ eyebrow, title, caption, titleAsInline = false }) {
  const root = document.createElement('section');
  root.className = 'motion-stage';

  const meta = document.createElement('div');
  meta.className = 'motion-meta';

  const eyebrowElement = document.createElement('span');
  eyebrowElement.className = 'motion-eyebrow';
  eyebrowElement.textContent = eyebrow;
  meta.appendChild(eyebrowElement);

  const titleElement = document.createElement('h1');
  titleElement.className = 'motion-title';
  if (titleAsInline) {
    titleElement.classList.add('motion-inline');
  }
  meta.appendChild(titleElement);

  if (caption) {
    const captionElement = document.createElement('p');
    captionElement.className = 'motion-caption';
    captionElement.textContent = caption;
    meta.appendChild(captionElement);
  }

  root.appendChild(meta);
  return { root, titleElement };
}

export function stopWhenDetached(callback) {
  let timerId;

  return {
    setInterval(handler, delay) {
      timerId = window.setInterval(() => {
        if (!callback()) {
          window.clearInterval(timerId);
          return;
        }
        handler();
      }, delay);
      return timerId;
    },
    setTimeout(handler, delay) {
      timerId = window.setTimeout(() => {
        if (!callback()) {
          return;
        }
        handler();
      }, delay);
      return timerId;
    },
  };
}

export function randomGlyph() {
  const glyphs = '!<>-_\\/[]{}—=+*^?#________';
  return glyphs[Math.floor(Math.random() * glyphs.length)];
}

function toSourceValue(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => toSourceValue(item)).join(', ')}]`;
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  return JSON.stringify(value);
}

function toArgsSource(args = {}) {
  const entries = Object.entries(args);
  if (!entries.length) {
    return '{}';
  }

  return `{
${entries.map(([key, value]) => `  ${key}: ${toSourceValue(value)}`).join(',\n')}
}`;
}

export function createSourceSnippet({ importName, componentPath, args }) {
  return `import { ${importName} } from '${componentPath}';

const element = ${importName}(${toArgsSource(args)});
document.body.append(element);`;
}

function createSection(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createDocsStory({ summary, usage, importName, componentPath, render, args }) {
  const source = createSourceSnippet({ importName, componentPath, args });

  return {
    name: 'Docs',
    parameters: {
      layout: 'padded',
      controls: { disable: true },
      docs: { disable: true },
    },
    render: () => {
      const root = createSection('section', 'story-docs');

      const header = createSection('header', 'story-docs__header');
      header.append(
        createSection('span', 'story-docs__eyebrow', 'Documentation'),
        createSection('h1', 'story-docs__title', importName),
        createSection('p', 'story-docs__summary', summary),
        createSection('p', 'story-docs__usage', usage),
      );

      const previewSection = createSection('section', 'story-docs__section');
      previewSection.append(
        createSection('h2', 'story-docs__section-title', 'Preview'),
      );
      const previewFrame = createSection('div', 'story-docs__preview');
      previewFrame.append(render({ ...args }));
      previewSection.append(previewFrame);

      const codeSection = createSection('section', 'story-docs__section');
      const codeHeader = createSection('div', 'story-docs__code-header');
      codeHeader.append(createSection('h2', 'story-docs__section-title', 'Show code'));
      const copyButton = createSection('button', 'story-docs__copy', 'Copy');
      copyButton.type = 'button';
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(source);
          copyButton.textContent = 'Copied';
          window.setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 1200);
        } catch {
          copyButton.textContent = 'Copy failed';
          window.setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 1200);
        }
      });
      codeHeader.append(copyButton);
      codeSection.append(codeHeader);

      const pre = createSection('pre', 'story-docs__code');
      const code = createSection('code', '', source);
      pre.append(code);
      codeSection.append(pre);

      root.append(header, previewSection, codeSection);
      return root;
    },
  };
}

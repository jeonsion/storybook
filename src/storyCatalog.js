export const STORYBOOK_BASE_PORT = 6006;

export const storybookRegistry = {
  'button-primary': {
    storyId: 'library-actions-button--primary',
    storyTitle: 'Library/Actions/Button',
    storyExport: 'Primary',
  },
  'card-stats': {
    storyId: 'library-data-display-stats-card--default',
    storyTitle: 'Library/Data Display/Stats Card',
    storyExport: 'Default',
  },
  'modal-confirm': {
    storyId: 'library-feedback-modal-confirm--default',
    storyTitle: 'Library/Feedback/Modal Confirm',
    storyExport: 'Default',
  },
  'input-field': {
    storyId: 'library-forms-text-field--default',
    storyTitle: 'Library/Forms/Text Field',
    storyExport: 'Default',
  },
  'empty-state': {
    storyId: 'library-feedback-empty-state--default',
    storyTitle: 'Library/Feedback/Empty State',
    storyExport: 'Default',
  },
};

export function getStorybookMeta(componentId) {
  return storybookRegistry[componentId] ?? null;
}

export function inferStorybookMeta(component) {
  if (component.storyId) {
    return {
      storyId: component.storyId,
      storyTitle: component.storyTitle || component.storyId,
      storyExport: component.storyExport || 'Default',
    };
  }

  return getStorybookMeta(component.id);
}

export function buildManagerPath(storyId) {
  return `/story/${storyId}`;
}

export function resolveStorybookTargets(storyId, locationLike = globalThis.location) {
  if (!storyId) return null;

  const hostname = locationLike?.hostname || '127.0.0.1';
  const managerPath = buildManagerPath(storyId);
  const staticBase = buildStaticBaseUrl(locationLike);
  const devBase = `http://${hostname}:${STORYBOOK_BASE_PORT}`;

  return {
    managerPath,
    staticManagerUrl: `${staticBase}/?path=${encodeURIComponent(managerPath)}`,
    staticPreviewUrl: `${staticBase}/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`,
    devManagerUrl: `${devBase}/?path=${encodeURIComponent(managerPath)}`,
    devPreviewUrl: `${devBase}/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`,
  };
}

function buildStaticBaseUrl(locationLike) {
  const href = locationLike?.href;
  if (href && /^https?:/i.test(href)) {
    return new URL('./storybook-static', href).toString().replace(/\/$/, '');
  }

  return './storybook-static';
}

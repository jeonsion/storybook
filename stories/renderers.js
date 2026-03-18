function createNode(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createButton({ label = '저장하기', variant = 'primary', disabled = false } = {}) {
  const button = createNode('button', `sb-button sb-button--${variant}`, label);
  button.type = 'button';
  button.disabled = disabled;
  return button;
}

export function createStatsCard({ eyebrow = 'Analytics', value = '128', label = 'Components', delta = '+12%' } = {}) {
  const card = createNode('article', 'sb-card');
  card.append(createNode('span', 'sb-card__eyebrow', eyebrow));
  card.append(createNode('strong', 'sb-card__value', value));
  card.append(createNode('div', 'sb-card__label', label));
  card.append(createNode('span', 'sb-card__delta', delta));
  return card;
}

export function createModal({
  title = '컴포넌트를 삭제할까요?',
  description = '이 작업은 되돌릴 수 없으며 연결된 문서 링크도 함께 정리해야 합니다.',
  confirmLabel = '삭제하기',
  cancelLabel = '취소',
} = {}) {
  const wrapper = createNode('div', 'sb-modal');
  const panel = createNode('section', 'sb-modal__panel');
  panel.append(createNode('span', 'sb-card__eyebrow', 'Confirmation'));
  panel.append(createNode('h3', 'sb-modal__title', title));
  panel.append(createNode('p', 'sb-modal__description', description));

  const footer = createNode('div', 'sb-modal__footer');
  footer.append(createButton({ label: cancelLabel, variant: 'secondary' }));
  footer.append(createButton({ label: confirmLabel, variant: 'danger' }));
  panel.append(footer);
  wrapper.append(panel);
  return wrapper;
}

export function createTextField({
  label = '컴포넌트 이름',
  placeholder = 'Button / Primary',
  hint = 'Storybook과 동일한 이름으로 정리해두면 좋아요.',
  value = '',
} = {}) {
  const field = createNode('label', 'sb-field');
  field.append(createNode('span', 'sb-field__label', label));
  const input = createNode('input', 'sb-field__input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.value = value;
  field.append(input);
  field.append(createNode('span', 'sb-field__hint', hint));
  return field;
}

export function createEmptyState({
  title = '아직 등록된 컴포넌트가 없어요',
  description = '새 컴포넌트를 추가하거나 Storybook 스토리를 연결해보세요.',
  actionLabel = '새 컴포넌트 추가',
} = {}) {
  const state = createNode('section', 'sb-empty');
  state.append(createNode('div', 'sb-empty__icon', '✦'));
  state.append(createNode('h3', 'sb-empty__title', title));
  state.append(createNode('p', 'sb-empty__description', description));
  state.append(createButton({ label: actionLabel, variant: 'primary' }));
  return state;
}

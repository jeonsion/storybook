import { seedComponents } from './src/componentData.js';
import { inferStorybookMeta, resolveStorybookTargets } from './src/storyCatalog.js';

const STORAGE_KEY = 'component-atlas-registry';

const elements = {
  statsGrid: document.querySelector('#stats-grid'),
  componentList: document.querySelector('#component-list'),
  componentDetail: document.querySelector('#component-detail'),
  resultCount: document.querySelector('#result-count'),
  searchInput: document.querySelector('#search-input'),
  categoryFilter: document.querySelector('#category-filter'),
  statusFilter: document.querySelector('#status-filter'),
  priorityFilter: document.querySelector('#priority-filter'),
  form: document.querySelector('#component-form'),
  deleteButton: document.querySelector('#delete-button'),
  clearFormButton: document.querySelector('#clear-form-button'),
  seedResetButton: document.querySelector('#seed-reset-button'),
  focusFormButton: document.querySelector('#focus-form-button'),
  exportButton: document.querySelector('#export-button'),
  miniTotal: document.querySelector('#mini-total'),
  miniReady: document.querySelector('#mini-ready'),
  miniDocs: document.querySelector('#mini-docs'),
  miniAlert: document.querySelector('#mini-alert'),
};

const formFields = {
  id: document.querySelector('#component-id'),
  name: document.querySelector('#name-input'),
  category: document.querySelector('#category-input'),
  status: document.querySelector('#status-input'),
  priority: document.querySelector('#priority-input'),
  health: document.querySelector('#health-input'),
  usage: document.querySelector('#usage-input'),
  tags: document.querySelector('#tags-input'),
  summary: document.querySelector('#summary-input'),
  notes: document.querySelector('#notes-input'),
  storyId: document.querySelector('#storybook-id-input'),
  docs: document.querySelector('#docs-input'),
  tests: document.querySelector('#tests-input'),
  a11y: document.querySelector('#a11y-input'),
};

const state = {
  components: loadComponents(),
  selectedId: null,
  filters: {
    query: '',
    category: 'All',
    status: 'All',
    priority: 'All',
  },
};

init();

function init() {
  if (!state.components.length) {
    state.components = structuredClone(seedComponents);
    persistComponents();
  }

  state.selectedId = state.components[0]?.id ?? null;
  bindEvents();
  refreshFilterOptions();
  render();
}

function loadComponents() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(seedComponents);

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : structuredClone(seedComponents);
  } catch {
    return structuredClone(seedComponents);
  }
}

function persistComponents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.components));
}

function bindEvents() {
  elements.searchInput.addEventListener('input', (event) => {
    state.filters.query = event.target.value.trim().toLowerCase();
    render();
  });

  elements.categoryFilter.addEventListener('change', (event) => {
    state.filters.category = event.target.value;
    render();
  });

  elements.statusFilter.addEventListener('change', (event) => {
    state.filters.status = event.target.value;
    render();
  });

  elements.priorityFilter.addEventListener('change', (event) => {
    state.filters.priority = event.target.value;
    render();
  });

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveFromForm();
  });

  elements.clearFormButton.addEventListener('click', clearForm);

  elements.deleteButton.addEventListener('click', () => {
    if (!state.selectedId) return;
    state.components = state.components.filter((component) => component.id !== state.selectedId);
    state.selectedId = state.components[0]?.id ?? null;
    persistComponents();
    refreshFilterOptions();
    clearForm();
    render();
  });

  elements.seedResetButton.addEventListener('click', () => {
    state.components = structuredClone(seedComponents);
    state.selectedId = state.components[0]?.id ?? null;
    persistComponents();
    refreshFilterOptions();
    clearForm();
    render();
  });

  elements.focusFormButton.addEventListener('click', () => {
    clearForm();
    formFields.name.focus();
    document.querySelector('.editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  elements.exportButton.addEventListener('click', exportData);
}

function getFilteredComponents() {
  return state.components.filter((component) => {
    const storyId = inferStorybookMeta(component)?.storyId || '';
    const haystack = [component.name, component.category, component.summary, component.tags.join(' '), storyId]
      .join(' ')
      .toLowerCase();

    const matchesQuery = !state.filters.query || haystack.includes(state.filters.query);
    const matchesCategory = state.filters.category === 'All' || component.category === state.filters.category;
    const matchesStatus = state.filters.status === 'All' || component.status === state.filters.status;
    const matchesPriority = state.filters.priority === 'All' || component.priority === state.filters.priority;

    return matchesQuery && matchesCategory && matchesStatus && matchesPriority;
  });
}

function render() {
  const filteredComponents = getFilteredComponents();
  const selectedComponent =
    filteredComponents.find((component) => component.id === state.selectedId) ||
    state.components.find((component) => component.id === state.selectedId) ||
    filteredComponents[0] ||
    state.components[0] ||
    null;

  state.selectedId = selectedComponent?.id ?? null;

  renderStats();
  renderList(filteredComponents);
  renderDetail(selectedComponent);
  syncFormSelection(selectedComponent);
}

function renderStats() {
  const total = state.components.length;
  const readyCount = state.components.filter((component) => ['Ready', 'Production'].includes(component.status)).length;
  const docsCount = state.components.filter((component) => component.docs).length;
  const attentionCount = state.components.filter(needsAttention).length;
  const linkedCount = state.components.filter((component) => Boolean(inferStorybookMeta(component)?.storyId)).length;
  const avgHealth = total ? Math.round(state.components.reduce((sum, item) => sum + Number(item.health || 0), 0) / total) : 0;

  const stats = [
    { label: '전체 컴포넌트', value: `${total}`, note: '현재 레지스트리에 등록된 항목 수' },
    { label: '출시 가능', value: `${readyCount}`, note: 'Ready 또는 Production 상태' },
    { label: 'Storybook 연결', value: `${linkedCount}`, note: '실제 story id가 연결된 항목' },
    { label: '평균 건강도', value: `${avgHealth}`, note: '현재 전체 품질 점수 평균' },
  ];

  elements.statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <article class="stat-card">
          <span class="section-label">Metric</span>
          <strong>${stat.value}</strong>
          <div>${stat.label}</div>
          <p class="muted">${stat.note}</p>
        </article>
      `,
    )
    .join('');

  elements.miniTotal.textContent = `${total}`;
  elements.miniReady.textContent = `${readyCount}`;
  elements.miniDocs.textContent = `${total ? Math.round((docsCount / total) * 100) : 0}%`;
  elements.miniAlert.textContent = `${attentionCount}`;
}

function renderList(filteredComponents) {
  elements.resultCount.textContent = `${filteredComponents.length}개`;

  if (!filteredComponents.length) {
    elements.componentList.innerHTML = document.querySelector('#empty-state-template').innerHTML;
    return;
  }

  elements.componentList.innerHTML = filteredComponents
    .map((component) => {
      const tone = getStatusTone(component.status, component.priority);
      const meta = inferStorybookMeta(component);
      return `
        <article class="registry-card ${component.id === state.selectedId ? 'is-active' : ''}" data-component-id="${component.id}">
          <div class="registry-card__top">
            <div>
              <h3>${component.name}</h3>
              <p>${component.summary}</p>
            </div>
            <span class="badge" data-tone="${tone}">${component.status}</span>
          </div>
          <div class="detail-meta">
            <div class="detail-pill">
              <strong>카테고리</strong>
              <span>${component.category}</span>
            </div>
            <div class="detail-pill">
              <strong>건강도</strong>
              <span>${component.health}/100</span>
            </div>
            <div class="detail-pill">
              <strong>사용 횟수</strong>
              <span>${component.usage}</span>
            </div>
          </div>
          <div class="badges">
            ${component.tags.map((tag) => `<span class="badge">#${tag}</span>`).join('')}
            ${meta?.storyId ? '<span class="badge" data-tone="success">Storybook linked</span>' : '<span class="badge" data-tone="warning">Storybook pending</span>'}
          </div>
        </article>
      `;
    })
    .join('');

  elements.componentList.querySelectorAll('[data-component-id]').forEach((card) => {
    card.addEventListener('click', () => {
      state.selectedId = card.dataset.componentId;
      render();
    });
  });
}

function renderDetail(component) {
  if (!component) {
    elements.componentDetail.innerHTML = document.querySelector('#empty-state-template').innerHTML;
    return;
  }

  const storyMeta = inferStorybookMeta(component);
  const storyTargets = storyMeta?.storyId ? resolveStorybookTargets(storyMeta.storyId) : null;

  elements.componentDetail.innerHTML = `
    <div class="detail-stack">
      <article class="detail-block">
        <div class="registry-card__top">
          <div>
            <h3>${component.name}</h3>
            <p class="detail-description">${component.summary}</p>
          </div>
          <span class="badge" data-tone="${getStatusTone(component.status, component.priority)}">${component.priority} priority</span>
        </div>
        <div class="detail-meta">
          <div class="detail-pill"><strong>상태</strong><span>${component.status}</span></div>
          <div class="detail-pill"><strong>카테고리</strong><span>${component.category}</span></div>
          <div class="detail-pill"><strong>최근 업데이트</strong><span>${component.updatedAt}</span></div>
        </div>
      </article>

      <article class="detail-block">
        <h3>체크리스트</h3>
        <ul class="detail-list">
          ${buildChecklistRow('문서화', component.docs)}
          ${buildChecklistRow('테스트', component.tests)}
          ${buildChecklistRow('접근성', component.a11y)}
          <li><span>건강도 점수</span><span>${component.health}/100</span></li>
          <li><span>사용 횟수</span><span>${component.usage}</span></li>
        </ul>
      </article>

      <article class="detail-block">
        <h3>Storybook 연결</h3>
        ${renderStorybookSection(component, storyMeta, storyTargets)}
      </article>

      <article class="detail-block">
        <h3>메모</h3>
        <p class="detail-description">${component.notes || '아직 메모가 없습니다.'}</p>
      </article>

      <article class="detail-block">
        <h3>최근 이력</h3>
        <ul class="timeline">
          ${component.milestones.map((milestone) => `<li><span>${milestone.label}</span><span>${milestone.date}</span></li>`).join('')}
        </ul>
      </article>
    </div>
  `;
}

function renderStorybookSection(component, storyMeta, storyTargets) {
  if (!storyMeta?.storyId || !storyTargets) {
    return `
      <div class="support-box">
        <p class="detail-description">아직 Storybook story id가 연결되지 않았어요. 아래 편집 폼에서 story id를 입력하면 이 영역에서 실제 Storybook과 연결됩니다.</p>
      </div>
    `;
  }

  return `
    <div class="storybook-stack">
      <div class="storybook-links">
        <span class="code-chip">${storyMeta.storyId}</span>
        <a class="button button--ghost button--small" href="${storyTargets.devManagerUrl}" target="_blank" rel="noreferrer">개발 Storybook 열기</a>
        <a class="button button--ghost button--small" href="${storyTargets.staticManagerUrl}" target="_blank" rel="noreferrer">정적 Storybook 열기</a>
      </div>
      <p class="muted storybook-hint">
        개발 서버는 <code>npm run storybook</code>, 정적 빌드는 <code>npm run build-storybook</code> 후 현재 사이트 서버에서 확인하세요.
      </p>
      <iframe
        class="storybook-frame"
        title="${component.name} story preview"
        src="${storyTargets.devPreviewUrl}"
        loading="lazy"
      ></iframe>
    </div>
  `;
}

function syncFormSelection(component) {
  elements.deleteButton.disabled = !component;

  if (!component) {
    return;
  }

  const storyMeta = inferStorybookMeta(component);
  formFields.id.value = component.id;
  formFields.name.value = component.name;
  formFields.category.value = component.category;
  formFields.status.value = component.status;
  formFields.priority.value = component.priority;
  formFields.health.value = component.health;
  formFields.usage.value = component.usage;
  formFields.tags.value = component.tags.join(', ');
  formFields.summary.value = component.summary;
  formFields.notes.value = component.notes;
  formFields.storyId.value = storyMeta?.storyId || '';
  formFields.docs.checked = Boolean(component.docs);
  formFields.tests.checked = Boolean(component.tests);
  formFields.a11y.checked = Boolean(component.a11y);
}

function saveFromForm() {
  const id = formFields.id.value || slugify(formFields.name.value);
  const storyId = formFields.storyId.value.trim();
  const nextComponent = {
    id,
    name: formFields.name.value.trim(),
    category: formFields.category.value.trim(),
    status: formFields.status.value,
    priority: formFields.priority.value,
    health: Number(formFields.health.value),
    usage: Number(formFields.usage.value),
    tags: formFields.tags.value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    summary: formFields.summary.value.trim(),
    notes: formFields.notes.value.trim(),
    storyId: storyId || undefined,
    docs: formFields.docs.checked,
    tests: formFields.tests.checked,
    a11y: formFields.a11y.checked,
    updatedAt: new Date().toISOString().slice(0, 10),
    milestones: buildMilestones(id),
  };

  const existingIndex = state.components.findIndex((component) => component.id === id);

  if (existingIndex >= 0) {
    state.components[existingIndex] = nextComponent;
  } else {
    state.components.unshift(nextComponent);
  }

  state.selectedId = nextComponent.id;
  persistComponents();
  refreshFilterOptions();
  render();
}

function buildMilestones(id) {
  const existing = state.components.find((component) => component.id === id)?.milestones ?? [];
  return [{ label: '최근 저장', date: new Date().toISOString().slice(0, 10) }, ...existing].slice(0, 4);
}

function refreshFilterOptions() {
  populateSelect(elements.categoryFilter, 'All', uniqueValues(state.components.map((item) => item.category)));
  populateSelect(elements.statusFilter, 'All', uniqueValues(state.components.map((item) => item.status)));
  populateSelect(elements.priorityFilter, 'All', uniqueValues(state.components.map((item) => item.priority)));

  elements.categoryFilter.value = state.filters.category;
  elements.statusFilter.value = state.filters.status;
  elements.priorityFilter.value = state.filters.priority;
}

function populateSelect(select, defaultLabel, values) {
  const currentValue = select.value || defaultLabel;
  select.innerHTML = [defaultLabel, ...values]
    .map((value) => `<option value="${value}">${value === 'All' ? '전체' : value}</option>`)
    .join('');

  if ([defaultLabel, ...values].includes(currentValue)) {
    select.value = currentValue;
  }
}

function clearForm() {
  elements.form.reset();
  formFields.id.value = '';
  formFields.storyId.value = '';
  formFields.status.value = 'Concept';
  formFields.priority.value = 'Medium';
  formFields.health.value = 80;
  formFields.usage.value = 1;
  elements.deleteButton.disabled = !state.selectedId;
}

function exportData() {
  const payload = JSON.stringify(state.components, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'component-atlas.json';
  link.click();
  URL.revokeObjectURL(url);
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))].sort((left, right) => left.localeCompare(right));
}

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9가-힣]+/g, '-').replace(/^-+|-+$/g, '');
}

function getStatusTone(status, priority) {
  if (priority === 'High' || status === 'Concept') return 'danger';
  if (status === 'Ready' || status === 'In Progress') return 'warning';
  return 'success';
}

function buildChecklistRow(label, done) {
  return `<li><span>${label}</span><span>${done ? '완료' : '미완료'}</span></li>`;
}

function needsAttention(component) {
  return component.priority === 'High' || !component.docs || !component.tests || !component.a11y || component.health < 75;
}

import { getStorybookMeta } from './storyCatalog.js';

const rawSeedComponents = [
  {
    id: 'button-primary',
    name: 'Button / Primary',
    category: 'Actions',
    status: 'Production',
    priority: 'Low',
    health: 96,
    usage: 14,
    tags: ['brand', 'cta', 'interactive'],
    summary: '브랜드 컬러를 사용하는 기본 호출 버튼 컴포넌트',
    notes: 'Hover/disabled/loading 상태까지 정리되어 있고 대부분의 화면에서 재사용되고 있어요.',
    docs: true,
    tests: true,
    a11y: true,
    updatedAt: '2026-03-12',
    milestones: [
      { label: 'Story 작성', date: '2026-02-26' },
      { label: 'a11y 검수', date: '2026-03-01' },
      { label: 'Design sync', date: '2026-03-12' }
    ]
  },
  {
    id: 'card-stats',
    name: 'Card / Stats Overview',
    category: 'Data Display',
    status: 'Ready',
    priority: 'Medium',
    health: 84,
    usage: 7,
    tags: ['dashboard', 'analytics', 'summary'],
    summary: '대시보드 핵심 수치를 보여주는 요약 카드 레이아웃',
    notes: '문서와 테스트는 완료했지만 다크 모드 대비를 조금 더 다듬으면 좋아요.',
    docs: true,
    tests: true,
    a11y: false,
    updatedAt: '2026-03-08',
    milestones: [
      { label: 'Variant 추가', date: '2026-02-20' },
      { label: 'Responsive 정리', date: '2026-02-28' }
    ]
  },
  {
    id: 'modal-confirm',
    name: 'Modal / Confirm',
    category: 'Feedback',
    status: 'In Progress',
    priority: 'High',
    health: 71,
    usage: 4,
    tags: ['dialog', 'focus-trap', 'critical'],
    summary: '삭제/중요 액션 확인에 사용하는 모달 컴포넌트',
    notes: 'ESC key 처리와 focus trap은 완료했지만 모바일 레이아웃 조정이 남아있어요.',
    docs: false,
    tests: false,
    a11y: true,
    updatedAt: '2026-03-15',
    milestones: [
      { label: 'Initial build', date: '2026-03-04' },
      { label: 'Focus trap 연결', date: '2026-03-10' }
    ]
  },
  {
    id: 'input-field',
    name: 'Input / Text Field',
    category: 'Forms',
    status: 'Production',
    priority: 'Low',
    health: 92,
    usage: 11,
    tags: ['form', 'validation', 'field'],
    summary: '라벨, 에러, 도움말, 아이콘 슬롯을 제공하는 입력 필드',
    notes: 'Validation 메시지와 상태 색상 규칙이 명확해서 폼 화면에 빠르게 확장할 수 있어요.',
    docs: true,
    tests: true,
    a11y: true,
    updatedAt: '2026-03-11',
    milestones: [
      { label: 'API 안정화', date: '2026-02-18' },
      { label: 'Form integration', date: '2026-03-11' }
    ]
  },
  {
    id: 'empty-state',
    name: 'Empty State / Default',
    category: 'Feedback',
    status: 'Concept',
    priority: 'Medium',
    health: 63,
    usage: 2,
    tags: ['placeholder', 'illustration', 'first-run'],
    summary: '검색 결과가 없거나 최초 진입 시 보여줄 빈 상태 컴포넌트',
    notes: '일러스트 스타일만 확정되면 빠르게 제품에 맞춰 확장할 수 있어요.',
    docs: false,
    tests: false,
    a11y: false,
    updatedAt: '2026-03-05',
    milestones: [{ label: 'Wireframe', date: '2026-03-05' }]
  }
];

export const seedComponents = rawSeedComponents.map((component) => ({
  ...component,
  ...getStorybookMeta(component.id),
}));

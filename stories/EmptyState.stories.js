import { createEmptyState } from './renderers.js';

export default {
  title: 'Library/Feedback/Empty State',
  render: (args) => createEmptyState(args),
  args: {
    title: '아직 등록된 컴포넌트가 없어요',
    description: '새 컴포넌트를 추가하거나 Storybook 스토리를 연결해보세요.',
    actionLabel: '새 컴포넌트 추가',
  },
};

export const Default = {};

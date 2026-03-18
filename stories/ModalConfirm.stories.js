import { createModal } from './renderers.js';

export default {
  title: 'Library/Feedback/Modal Confirm',
  render: (args) => createModal(args),
  args: {
    title: '컴포넌트를 삭제할까요?',
    description: '이 작업은 되돌릴 수 없으며 연결된 문서 링크도 함께 정리해야 합니다.',
    confirmLabel: '삭제하기',
    cancelLabel: '취소',
  },
};

export const Default = {};

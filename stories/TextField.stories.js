import { createTextField } from './renderers.js';

export default {
  title: 'Library/Forms/Text Field',
  render: (args) => createTextField(args),
  args: {
    label: '컴포넌트 이름',
    placeholder: 'Button / Primary',
    hint: 'Storybook과 동일한 이름으로 관리하면 좋아요.',
    value: '',
  },
};

export const Default = {};

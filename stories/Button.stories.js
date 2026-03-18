import { createButton } from './renderers.js';

export default {
  title: 'Library/Actions/Button',
  render: (args) => createButton(args),
  args: {
    label: '저장하기',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'danger'] },
    disabled: { control: 'boolean' },
  },
};

export const Primary = {};
export const Secondary = { args: { variant: 'secondary', label: '취소' } };
export const Danger = { args: { variant: 'danger', label: '삭제하기' } };

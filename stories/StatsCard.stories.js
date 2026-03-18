import { createStatsCard } from './renderers.js';

export default {
  title: 'Library/Data Display/Stats Card',
  render: (args) => createStatsCard(args),
  args: {
    eyebrow: 'Registry',
    value: '24',
    label: '등록된 컴포넌트',
    delta: '+4 this week',
  },
};

export const Default = {};

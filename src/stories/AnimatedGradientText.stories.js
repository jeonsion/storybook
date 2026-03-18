import { renderAnimatedGradientText } from '../components/AnimatedGradientText.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Impact/AnimatedGradientText',
  render: (args) => renderAnimatedGradientText(args),
  args: {
    text: 'Make every headline feel alive.',
  },
  argTypes: {
    text: { control: 'text' },
  },
};

export const Docs = createDocsStory({
  summary: '텍스트 내부에 움직이는 그라디언트를 채워 임팩트 있는 히어로 카피를 만드는 모션입니다.',
  usage: 'Controls에서 문구를 바꿔보면서 브랜드 키비주얼이나 캠페인 헤드라인에 어울리는 톤을 빠르게 확인할 수 있습니다.',
  importName: 'renderAnimatedGradientText',
  componentPath: '../components/AnimatedGradientText.js',
  render: (args) => renderAnimatedGradientText(args),
  args: {
      text: 'Make every headline feel alive.',
  },
});

export const Default = {};

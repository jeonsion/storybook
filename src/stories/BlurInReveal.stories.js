import { renderBlurInReveal } from '../components/BlurInReveal.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Common/BlurInReveal',
  render: (args) => renderBlurInReveal(args),
  args: {
    text: 'Focus shifts. The message lands.',
    stagger: 0.03,
  },
  argTypes: {
    text: { control: 'text' },
    stagger: { control: { type: 'range', min: 0.01, max: 0.1, step: 0.005 } },
  },
};

export const Docs = createDocsStory({
  summary: '흐릿한 상태에서 또렷하게 초점이 맞춰지며 등장하는 기본 리빌 텍스트 모션입니다.',
  usage: 'stagger 값을 조절해 문장 길이에 따라 등장 템포를 맞추고, 서브 카피나 섹션 타이틀에 활용할 수 있습니다.',
  importName: 'renderBlurInReveal',
  componentPath: '../components/BlurInReveal.js',
  render: (args) => renderBlurInReveal(args),
  args: {
      text: 'Focus shifts. The message lands.',
      stagger: 0.03,
  },
});

export const Default = {};

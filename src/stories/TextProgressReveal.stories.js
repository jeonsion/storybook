import { renderTextProgressReveal } from '../components/TextProgressReveal.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Scroll/TextProgressReveal',
  render: (args) => renderTextProgressReveal(args),
  args: {
    text: 'The weather in the UK is a curious experiment designed to test patience rather than provide comfort.',
    progress: 0.44,
    highlightCount: 2,
    showSlider: true,
  },
  argTypes: {
    text: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    highlightCount: { control: { type: 'range', min: 0, max: 6, step: 1 } },
    showSlider: { control: 'boolean' },
  },
};

export const Docs = createDocsStory({
  summary: '스크롤 진행도에 맞춰 단어가 순서대로 살아나는 롱폼 카피용 리빌 텍스트입니다.',
  usage: 'slider로 인터랙션을 보면서 실제 랜딩 카피가 어느 구간에서 읽히는지 빠르게 확인할 수 있습니다.',
  importName: 'renderTextProgressReveal',
  componentPath: '../components/TextProgressReveal.js',
  render: (args) => renderTextProgressReveal(args),
  args: {
      text: 'The weather in the UK is a curious experiment designed to test patience rather than provide comfort.',
      progress: 0.44,
      highlightCount: 2,
      showSlider: true,
  },
});

export const Default = {};

export const NearComplete = {
  args: {
    progress: 0.9,
    showSlider: false,
  },
};

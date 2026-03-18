import { renderFlipWords } from '../components/FlipWords.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Common/FlipWords',
  render: (args) => renderFlipWords(args),
  args: {
    leadingText: 'Built for',
    words: ['designers', 'developers', 'marketers'],
    interval: 1800,
  },
  argTypes: {
    leadingText: { control: 'text' },
    words: { control: 'object' },
    interval: { control: { type: 'range', min: 800, max: 3200, step: 100 } },
  },
};

export const Docs = createDocsStory({
  summary: '고정 문구 뒤에 핵심 키워드를 교체하며 메시지를 반복 강조하는 플립 워드 컴포넌트입니다.',
  usage: 'words 배열만 바꾸면 제품 가치 제안이나 타깃 메시지를 여러 버전으로 실험할 수 있습니다.',
  importName: 'renderFlipWords',
  componentPath: '../components/FlipWords.js',
  render: (args) => renderFlipWords(args),
  args: {
      leadingText: 'Built for',
      words: ['designers', 'developers', 'marketers'],
      interval: 1800,
  },
});

export const Default = {};

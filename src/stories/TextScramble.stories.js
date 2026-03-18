import { renderTextScramble } from '../components/TextScramble.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Impact/TextScramble',
  render: (args) => renderTextScramble(args),
  args: {
    text: 'Crack the code behind the launch.',
    frameRate: 38,
    settleStep: 1,
  },
  argTypes: {
    text: { control: 'text' },
    frameRate: { control: { type: 'range', min: 16, max: 80, step: 1 } },
    settleStep: { control: { type: 'range', min: 1, max: 4, step: 1 } },
  },
};

export const Docs = createDocsStory({
  summary: '무작위 글자가 빠르게 교체되다가 최종 문장으로 정착하는 스크램블 텍스트 모션입니다.',
  usage: 'frameRate와 settleStep을 조절해 해킹, AI, 실시간 처리 같은 컨셉의 카피에 맞는 속도를 쉽게 탐색할 수 있습니다.',
  importName: 'renderTextScramble',
  componentPath: '../components/TextScramble.js',
  render: (args) => renderTextScramble(args),
  args: {
      text: 'Crack the code behind the launch.',
      frameRate: 38,
      settleStep: 1,
  },
});

export const Default = {};

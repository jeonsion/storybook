import { renderLettersPullUp } from '../components/LettersPullUp.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Impact/LettersPullUp',
  render: (args) => renderLettersPullUp(args),
  args: {
    text: 'Launch with a confident first impression.',
    stagger: 0.04,
  },
  argTypes: {
    text: { control: 'text' },
    stagger: { control: { type: 'range', min: 0.01, max: 0.12, step: 0.005 } },
  },
};

export const Docs = createDocsStory({
  summary: '각 글자가 아래에서 위로 끌어올려지듯 등장해 세련된 런칭 무드를 만드는 모션입니다.',
  usage: 'stagger 값을 줄이면 빠른 등장, 늘리면 고급스러운 템포를 만들 수 있어 프리미엄 섹션 헤드라인에 적합합니다.',
  importName: 'renderLettersPullUp',
  componentPath: '../components/LettersPullUp.js',
  render: (args) => renderLettersPullUp(args),
  args: {
      text: 'Launch with a confident first impression.',
      stagger: 0.04,
  },
});

export const Default = {};

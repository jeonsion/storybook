import { renderCharacterStagger } from '../components/CharacterStagger.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Common/CharacterStagger',
  render: (args) => renderCharacterStagger(args),
  args: {
    text: 'Meet the next generation of motion typography.',
    stagger: 0.035,
    duration: 0.55,
  },
  argTypes: {
    text: { control: 'text' },
    stagger: { control: { type: 'range', min: 0.01, max: 0.12, step: 0.005 } },
    duration: { control: { type: 'range', min: 0.2, max: 1.2, step: 0.05 } },
  },
};

export const Docs = createDocsStory({
  summary: '문자 하나씩 순차적으로 올라오며 문장을 완성하는 대표적인 타이포 스태거 애니메이션입니다.',
  usage: '긴 헤드라인에서도 자연스럽게 읽히도록 stagger와 duration을 함께 조정해 랜딩 첫 화면에 맞는 리듬을 찾을 수 있습니다.',
  importName: 'renderCharacterStagger',
  componentPath: '../components/CharacterStagger.js',
  render: (args) => renderCharacterStagger(args),
  args: {
      text: 'Meet the next generation of motion typography.',
      stagger: 0.035,
      duration: 0.55,
  },
});

export const Default = {};

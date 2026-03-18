import { renderTypewriter } from '../components/Typewriter.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Common/Typewriter',
  render: (args) => renderTypewriter(args),
  args: {
    text: 'npm run storybook',
    speed: 70,
    startDelay: 200,
    cursor: '|',
  },
  argTypes: {
    text: { control: 'text' },
    speed: { control: { type: 'range', min: 20, max: 160, step: 5 } },
    startDelay: { control: { type: 'range', min: 0, max: 800, step: 50 } },
    cursor: { control: 'text' },
  },
};

export const Docs = createDocsStory({
  summary: '텍스트가 한 글자씩 입력되며 커서가 깜빡이는 전형적인 타입라이터 애니메이션입니다.',
  usage: 'CLI, onboarding, loading 문구처럼 순차 입력이 필요한 UI에서 speed와 startDelay만 조정해 바로 재사용할 수 있습니다.',
  importName: 'renderTypewriter',
  componentPath: '../components/Typewriter.js',
  render: (args) => renderTypewriter(args),
  args: {
      text: 'npm run storybook',
      speed: 70,
      startDelay: 200,
      cursor: '|',
  },
});

export const Default = {};

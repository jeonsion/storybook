import { renderGlitchText } from '../components/GlitchText.js';
import { createDocsStory } from './storyDocs.js';

export default {
  title: 'Typography Motion/Impact/GlitchText',
  render: (args) => renderGlitchText(args),
  args: {
    text: 'Realtime signal. Sharp intention.',
  },
  argTypes: {
    text: { control: 'text' },
  },
};

export const Docs = createDocsStory({
  summary: 'RGB 분리와 노이즈를 이용해 강한 디지털 무드를 주는 글리치 텍스트 효과입니다.',
  usage: '런칭 배너, 이벤트 타이틀처럼 짧고 강한 문구에 적용하면 시선을 끄는 포인트를 만들 수 있습니다.',
  importName: 'renderGlitchText',
  componentPath: '../components/GlitchText.js',
  render: (args) => renderGlitchText(args),
  args: {
      text: 'Realtime signal. Sharp intention.',
  },
});

export const Default = {};

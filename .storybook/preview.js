import '../src/styles.css';
import '../src/components/typography.css';

const preview = {
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        language: 'js',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
    controls: {
      expanded: true,
    },
    backgrounds: {
      options: {
        dark: { name: 'dark', value: '#09090f' },
        light: { name: 'light', value: '#f5f7fb' }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'dark'
    }
  },

  tags: ['autodocs']
};

export default preview;

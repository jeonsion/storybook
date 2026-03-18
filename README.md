# Typography Motion Storybook

타이포 모션 컴포넌트를 모아둔 Storybook 예제입니다.

## 포함된 컴포넌트
### Common
- CharacterStagger
- Typewriter
- BlurInReveal
- FlipWords

### Impact
- TextScramble
- LettersPullUp
- GlitchText
- AnimatedGradientText

### Scroll
- TextProgressReveal

## 실행 방법
의존성 설치:

```bash
npm install
```

Storybook 정적 빌드 + 로컬 서빙:

```bash
npm run storybook
```

정적 빌드만 만들기:

```bash
npm run build-storybook
```

공식 dev 서버 시도:

```bash
npm run storybook:dev
```

기본 주소:
- Storybook: `http://localhost:6006`

## 구조
- `.storybook/` — Storybook 설정
- `src/components/` — 각 타이포 모션 컴포넌트
- `src/stories/` — 각 컴포넌트 Storybook story

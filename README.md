# OTHER SPACE STUDIO

전시, 영상, 콘텐츠를 통해 자극에서 벗어나는 다른 공간을 만드는 스튜디오 웹사이트입니다.

## 로컬 실행

별도 빌드 과정이 없는 정적 사이트입니다. 저장소 루트에서 아래 명령을 실행합니다.

```bash
npx serve dist
```

## GitHub Pages 배포

1. 이 폴더를 GitHub 저장소의 `main` 브랜치에 푸시합니다.
2. 저장소의 **Settings → Pages → Build and deployment**에서 Source를 **GitHub Actions**로 선택합니다.
3. `main` 브랜치에 변경사항을 푸시하면 `.github/workflows/deploy-pages.yml`이 `dist` 폴더를 자동 배포합니다.

사이트는 HTML, CSS, JavaScript와 로컬 이미지 자산만 사용하며 모든 경로가 상대경로로 구성되어 있습니다.

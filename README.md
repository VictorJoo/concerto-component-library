# 콘체르토 매니저 목업 페이지

GitHub Pages에 바로 올릴 수 있도록 화면별 폴더로 구성한 정적 사이트입니다.

## 폴더 구조

```text
pages/
├── index.html
├── component-library/
│   └── index.html
├── common-layout/
│   └── index.html
├── login/
│   └── index.html
└── change-password/
    └── index.html
```

루트 `index.html`은 전체 메뉴 페이지입니다. 각 화면은 해당 폴더의
`index.html`만 교체하면 같은 URL에 새 버전이 반영됩니다.

## 로컬에서 실행하기

브라우저는 직접 연 HTML 파일에서 주변 폴더를 읽을 수 없으므로 로컬 서버로
실행합니다.

```bash
node server.mjs
```

브라우저에서 `http://localhost:8080`으로 들어가면 메인 화면을 요청할 때마다
폴더 목록을 다시 확인합니다. 폴더를 추가하거나 이름을 바꾼 뒤 메인 화면을
새로고침하면 별도의 생성 명령 없이 바로 반영됩니다.

## 새 화면 추가하기

`pages` 바로 아래에 새 폴더를 만들고 그 안에 `index.html`을 추가합니다.

```text
pages/
└── new-page/
    └── index.html
```

`main` 브랜치에 올리면 자동 작업이 모든 폴더를 다시 확인하고 메뉴를 만든 뒤
그 결과를 GitHub Pages에 직접 배포합니다. 폴더를 추가하거나 이름을 변경한
경우 모두 다음 배포에 반영됩니다. 메뉴 이름은 HTML 제목이 아닌 **폴더명**을
그대로 사용하며, 링크는 `폴더명/index.html`로 직접 연결됩니다.

메뉴는 `scripts/generate-index.mjs`가 `index.html`이 있는 폴더만 확인해
정적으로 생성합니다. `.github`, `scripts` 폴더와 숨김 폴더는 메뉴에서
제외됩니다.

GitHub 저장소의 `Settings → Pages → Build and deployment → Source`는
`GitHub Actions`로 설정해야 합니다.

중요: GitHub 저장소의 최상위에 `index.html`, `.github`, `scripts`와 각 화면
폴더가 있어야 합니다. 저장소 최상위에 `pages` 폴더 하나만 올리면
`pages/.github/workflows`는 자동 작업으로 인식되지 않습니다.

## GitHub Pages 주소 예시

저장소 이름이 `pages`라면 다음과 같은 주소가 만들어집니다.

- 첫 메뉴: `https://사용자명.github.io/pages/`
- 컴포넌트 라이브러리: `https://사용자명.github.io/pages/component-library/`
- 공통 레이아웃: `https://사용자명.github.io/pages/common-layout/`
- 로그인: `https://사용자명.github.io/pages/login/`
- 비밀번호 변경: `https://사용자명.github.io/pages/change-password/`

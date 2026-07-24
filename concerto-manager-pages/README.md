# 콘체르토 매니저 목업 페이지

GitHub Pages에 바로 올릴 수 있도록 화면별 폴더로 구성한 정적 사이트입니다.

## 폴더 구조

```text
concerto-manager-pages/
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

## GitHub Pages 주소 예시

저장소 이름이 `concerto-manager-pages`라면 다음과 같은 주소가 만들어집니다.

- 첫 메뉴: `https://사용자명.github.io/concerto-manager-pages/`
- 컴포넌트 라이브러리: `https://사용자명.github.io/concerto-manager-pages/component-library/`
- 공통 레이아웃: `https://사용자명.github.io/concerto-manager-pages/common-layout/`
- 로그인: `https://사용자명.github.io/concerto-manager-pages/login/`
- 비밀번호 변경: `https://사용자명.github.io/concerto-manager-pages/change-password/`

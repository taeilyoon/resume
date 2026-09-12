# 프리랜서 납품/포트폴리오 증빙 구조

이 폴더는 외주/프리랜서 납품 프로젝트의 캡처, 설명, 면접용 비공개 자료를 정리하기 위한 공간입니다.

목표는 단순히 이미지를 모아두는 것이 아니라, 각 프로젝트를 아래 질문에 답할 수 있는 형태로 정리하는 것입니다.

- 어떤 문제를 해결했는가?
- 내가 맡은 범위는 어디까지였는가?
- 어떤 기술을 사용했는가?
- 실제 납품/출시/운영 결과가 있었는가?
- 공개 가능한 자료와 면접에서만 보여줄 자료는 무엇인가?

---

## 폴더 구조

```text
portfolio/
├── README.md
├── _templates/
│   ├── project-case-template.md
│   └── screenshot-checklist.md
├── projects/
│   └── <project-slug>/
│       ├── README.md
│       ├── screenshots/
│       ├── private/
│       └── notes.md
├── screenshots/
│   └── _inbox/
└── private-interview/
    └── README.md
```

### `projects/`

프로젝트별 최종 정리 폴더입니다. 캡처를 어느 정도 모은 뒤, 프로젝트마다 하나씩 폴더를 만들어 정리합니다.

예시:

```text
portfolio/projects/motion-t-pro/
portfolio/projects/dear-my-day/
portfolio/projects/bunny-autowash/
portfolio/projects/club-reservation/
```

### `screenshots/_inbox/`

아직 분류하지 않은 캡처를 임시로 넣는 곳입니다. 나중에 프로젝트별 폴더로 옮깁니다.

### `private-interview/`

공개 포트폴리오에는 올릴 수 없지만, 면접 또는 미팅에서만 보여줄 수 있는 자료 목록을 정리합니다.

실제 민감한 파일을 Git에 넣기보다, 파일 위치와 설명만 적어두는 것을 권장합니다.

---

## 프로젝트 폴더 만드는 방법

1. `portfolio/projects/<project-slug>/` 폴더를 만듭니다.
2. `_templates/project-case-template.md`를 복사해서 `README.md`로 사용합니다.
3. 캡처 이미지는 `screenshots/`에 넣습니다.
4. 공개 불가 자료는 `private/`에 직접 넣기보다 `notes.md`에 “면접 시 제시 가능”으로 기록합니다.
5. 이력서에 넣을 한 줄 설명은 `README.md`의 “이력서용 요약”에 따로 정리합니다.

---

## 추천 파일명 규칙

이미지 파일은 아래처럼 정리하면 나중에 찾기 쉽습니다.

```text
01-main-screen.png
02-core-feature.png
03-admin-page.png
04-before-after.png
05-performance-result.png
```

프로젝트 폴더명은 영어 소문자와 하이픈만 사용하는 것을 추천합니다.

```text
motion-t-pro
dear-my-day
bunny-autowash
club-reservation
web3-dex-staking
```

---

## 공개 수준 표시

각 프로젝트 문서에는 반드시 공개 수준을 표시합니다.

- `Public`: 공개 포트폴리오에 사용 가능
- `Interview Only`: 면접/미팅에서만 설명 가능
- `Private`: 외부 공유 금지, 이력서에는 추상화해서만 표현

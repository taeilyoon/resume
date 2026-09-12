# 윤태일 - 인터랙티브 이력서

A4 사이즈에 최적화된 6페이지 인터랙티브 개발자 이력서

## 🚀 특징

- ✅ **A4 정확한 사이즈** (210mm × 297mm)
- ✅ **6페이지 구성** (표지, 프로필, 기술, 경력, 프로젝트, 성과)
- ✅ **자유로운 디자인** (비대칭 레이아웃, 그라데이션)
- ✅ **인터랙티브 요소** (애니메이션, 차트, 호버 효과)
- ✅ **반응형 디자인** (데스크탑/태블릿/모바일)
- ✅ **프린트 최적화** 및 **PDF export**
- ✅ **순수 HTML/CSS/JS** (라이브러리 불필요)

## 📁 파일 구조

```
resume/
├── index.html              # 메인 파일
├── md-a4.html              # 마크다운 A4 뷰어 (추가됨)
├── css/
│   ├── reset.css           # CSS 리셋
│   ├── layout.css          # 그리드/레이아웃
│   ├── components.css      # 컴포넌트 스타일
│   ├── animations.css     # 애니메이션
│   └── print.css           # 프린트 전용
├── js/
│   ├── main.js             # 메인 로직
│   ├── navigation.js       # 페이지 네비게이션
│   ├── animations.js       # 애니메이션 제어
│   └── export.js           # PDF export
├── data/
│   └── resume.json         # 이력서 데이터
└── README.md              # 이 파일
```

## 📄 마크다운 A4 뷰어 (md-a4.html)

마크다운 파일을 A4 형식으로 렌더링하여 화면에서 확인하고 인쇄/PDF로 내보낼 수 있는 뷰어입니다.
- **접속**: `md-a4.html` (기본값: `new-resume.md` 로드)
- **다른 파일 로드**: `md-a4.html?src=freelance-profile.md` 와 같이 `src` 파라미터 사용
- **특징**: 외부 라이브러리 없이 순수 JS로 마크다운 파싱, A4 프린트 최적화, 미니멀한 디자인

## 🎯 페이지 구성

### Page 1: 표지
- 대형 이름 타이포그래피
- 직책/포지션
- 시각적 배경 요소
- 핵심 성과 하이라이트

### Page 2: 프로필 & 핵심 역량
- 기본 정보 (연락처)
- 비즈니스 모델 설계 역량
- 금융/회계 이해도
- 팀 매니징 경험

### Page 3: 기술 스택
- **메인 기술**: Flutter (95%), Node.js (90%), Flutter Web (85%)
- **서브 기술**: Spring, iOS, Android, React, Solidity, PM
- 인터랙티브 스킬 바 차트

### Page 4: 경력
- 타임라인 형식 경력 표시
- 주요 성과 및 KPI 수치
- 사용 기술 스택 태그
- 스크롤 효과

### Page 5: 대표 프로젝트
- 트라이업 (Motion T), GTwins, HiKick 등
- 프로젝트별 성과 및 기술 스택
- 호버 시 상세 정보

### Page 6: 성과 & 교육
- 핵심 성과 카드
- 프로젝트 통계
- 학력 및 자격증

## 🎮 사용법

### 기본 네비게이션
- **클릭**: 상단 네비게이션 버튼
- **키보드**: 
  - `←` `→`: 페이지 이동
  - `1`-`6`: 바로 이동
  - `Home`: 첫 페이지
  - `End`: 마지막 페이지
  - `T`: 테마 전환
  - `Ctrl+P`: PDF 내보내기

### 모바일 터치
- **스와이프**: 좌우로 페이지 이동
- **탭**: 네비게이션 버튼

### 인터랙티브 기능
- **애니메이션**: 스크롤 시 자동 활성화
- **차트**: 스킬 바 순차 채우기
- **호버**: 카드 확대 효과
- **테마**: 다크/라이트 모드

### PDF 내보내기
1. `PDF` 버튼 클릭
2. 내보내기 옵션 선택:
   - 품질 (높음/보통/낮음)
   - 여백 (최소/보통/넓게)
   - 배경색 포함 여부
   - 애니메이션 제거 여부
3. `내보내기` 클릭
4. 브라우저 인쇄 다이얼로그에서 PDF 저장

## 🔧 커스터마이징

### 데이터 수정
`data/resume.json` 파일 수정:

```json
{
  "personal": {
    "name": "이름",
    "title": "직책",
    "phone": "연락처",
    "email": "이메일"
  },
  "technicalSkills": {
    "main": [...],
    "sub": [...]
  },
  "career": [...],
  "projects": [...]
}
```

### 색상 테마
`css/layout.css` 변수 수정:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #7c3aed;
  --accent-color: #06b6d4;
}
```

### 애니메이션 속도
`css/animations.css` 수정:

```css
.animate-delay-1 { transition-delay: 0.1s; }
.animate-delay-2 { transition-delay: 0.2s; }
```

## 📱 반응형 지원

- **데스크탑**: A4 페이징 스타일
- **태블릿**: 스크롤 연속형
- **모바일**: 단일 컬럼 스택

## 🖨️ 프린트 최적화

- A4 크기 정확히 유지
- 페이지 분리 최적화
- 폰트 임베딩
- 컬러/흑백 모드 대응
- 해상도 최적화 (300dpi)

## 🌐 브라우저 지원

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🚀 배포

### GitHub Pages
```bash
git clone <repository>
cd resume
git add .
git commit -m "Initial commit"
git push origin main
```

### Netlify/Vercel
1. `resume` 폴더 드래그 앤 드롭
2. 빌드 설정 없이 배포

### 로컬 서버
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# Live Server (VS Code 확장프로그램)
```

## ⚡ 성능 최적화

- **이미지**: WebP 포맷, lazy loading
- **CSS**: Critical CSS 인라인, non-blocking 로드
- **JS**: 코드 분할, async 로딩
- **폰트**: preload, font-display: swap
- **애니메이션**: GPU 가속, will-change 속성

## 🔍 SEO 최적화

```html
<meta name="description" content="윤태일 - Full-Stack Developer & Tech Lead 이력서">
<meta name="keywords" content="Flutter, Node.js, 개발자, 이력서, 포트폴리오">
<meta property="og:title" content="윤태일 - 인터랙티브 이력서">
<meta property="og:description" content="10년+ 경력의 풀스택 개발자 이력서">
```

## 📊 Analytics (선택)

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🐛 문제 해결

### 공통 문제
- **PDF 깨짐**: 브라우저 업데이트
- **애니메이션 버벅거쁌**: 하드웨어 가속 활성화
- **폰트 로딩**: 로컬 폰트 사용 고려

### 모바일 문제
- **터치 반응**: 부드러운 스크롤 확인
- **레이아웃 깨짐**: 뷰포트 메타태그 확인

## 📝 라이선스

MIT License - 자유롭게 사용 및 수정 가능

## 🤝 기여

버그 리포트, 기능 제안, 코드 개선 환영!

---

**개발자**: 윤태일  
**이메일**: tqe10808@gmail.com  
**GitHub**: [프로필 링크 추가]
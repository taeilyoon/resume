# 윤태일 (Yun Taeil)

**Android Native 이해도를 갖춘 모바일 앱 아키텍처 개발자**  
Mobile Architecture · Android Native Bridge · Realtime Systems · Service Operations

- 연락처: 010-3139-6713
- 이메일: dev_flutter@kakao.com
- 거주지: 경기도 광주시

## 프로필 요약

총 7년의 실무 개발 경험을 바탕으로 모바일 앱, 실시간 데이터 처리, 결제/운영 시스템을 제품 단위로 구현해왔습니다. 주력은 Flutter 기반 모바일 앱 개발이지만, Android Native AAR SDK 분석, Kotlin/Java 네이티브 레이어 연동, Companion Device API 기반 BLE 백그라운드 처리, Method/Event Channel 기반 Native Bridge 설계까지 앱 내부 동작과 플랫폼 제약을 함께 다뤄왔습니다.

단순 화면 구현보다 앱 구조와 데이터 흐름, 운영 중 발생하는 병목을 개선하는 데 강점이 있습니다. 병원 CRM 앱에서는 Hook/BLoC 혼재 구조를 BLoC 중심으로 정리하고, 이미지 저장 처리 시간을 약 1분에서 4초 이내로 단축했습니다. 금융 MTS에서는 자체 Canvas 차트 엔진과 실시간 시세 부분 업데이트 구조를 구현해 렌더링 병목을 줄였습니다.

공유 킥보드, BLE 디바이스, 금융 MTS/WTS, 병원 CRM, 세차 서비스 등 사용자 행동과 운영 흐름이 함께 중요한 도메인을 경험했습니다. PassOrder와 같은 O2O 플랫폼에서도 앱, 서버, 결제, 운영 도구가 하나의 사용자 경험으로 이어져야 한다고 보고, 비즈니스 우선순위와 유지보수성을 함께 고려해 구조를 설계합니다.

## 공고 적합 역량

- **Android Native 연동 이해**: Android AAR SDK, Kotlin/Java 네이티브 레이어, Companion Device API, BLE 백그라운드 처리, Method/Event Channel 기반 브릿지 구현 경험
- **모바일 앱 아키텍처 개선**: BLoC/GetX 기반 상태 관리, 상태/이벤트 흐름 분리, 모듈 중복 제거, 기능 수정 시 영향 범위 축소 경험
- **렌더링 및 성능 최적화**: Canvas 기반 금융 차트 엔진, 실시간 시세 Partial Update, 오프스크린 이미지 합성으로 처리 시간 1분에서 4초 이내 단축
- **서비스 운영 관점**: 실사용 베타 출시, Shorebird Code Push 배포, 결제/구독/정산 관리자 기능, 운영자 대시보드 구축 경험
- **O2O 및 유사 도메인 경험**: 공유 킥보드, 위치 기반 서비스, 결제 연동, 세차 예약/운영 시스템, BLE 디바이스 관리 기능 경험
- **협업과 기술 의사결정**: 3~5명 규모 개발팀 리딩, 기획/디자인/QA/백엔드/외주 개발자와의 협업, Figma UI와 API 문서 매칭 프로세스 정립

## 기술 스택

### Mobile & Native
- **Flutter / Dart**: 앱 아키텍처 설계, BLoC/GetX 상태 관리, Canvas 렌더링, 오프스크린 이미지 합성, Shorebird Code Push
- **Android Native**: Kotlin/Java 기반 Native AAR 연동, Companion Device API, BLE 백그라운드 처리, Method Channel, Event Channel
- **iOS Native**: Swift, CoreBluetooth State Preservation and Restoration, 네이티브 BLE 복원 흐름 연동
- **UI / Rendering**: 금융 차트, 커스텀 그래픽, 터치/줌/스크롤 인터랙션, 실시간 데이터 기반 부분 업데이트

### Backend & Realtime
- **Backend**: Node.js, NestJS, Express, TypeScript, GraphQL, REST API, Spring Boot Kotlin 경험
- **Realtime**: MQTT Pub/Sub, WebSocket, Redis 캐싱, 비동기 워커, 실시간 알림 서버
- **Database / Infra**: MySQL, MySQL Memory Engine, Redis, Docker, Supabase 온프레미스, 시계열 이벤트 저장 구조

### Product & Collaboration
- **운영 시스템**: 결제, 구독 권한, 정산, 관리자 페이지, 장비 관리, 알림 이력, 통계 대시보드
- **협업 방식**: 요구사항 기술 사양화, Figma 화면과 API 명세 연결, 코드 리뷰, 일정 조율, 외주 협업 관리

## 주요 경력 및 프로젝트

### 트라이업 / Motion T Pro
- **역할**: 프리랜서 Flutter 앱 개발자
- **기간**: 2024.09 - 2025.04
- **도메인**: 병원 CRM, 모바일 앱 구조 개선, 성능 최적화
- **팀 구성**: 2인 Flutter 개발 체제

전임 개발진 이탈과 인수인계 부재로 일정이 지연된 병원 CRM 앱에 투입되어 앱 구조 안정화와 실사용 베타 출시를 지원했습니다. 백엔드가 아닌 Flutter 앱 영역을 전담했고, 상태 관리 구조와 이미지 처리 엔진 개선을 핵심적으로 맡았습니다.

- Hook과 BLoC이 혼재되어 상태 변경 흐름을 추적하기 어렵던 구조를 BLoC 중심으로 단일화했습니다.
- 상태 관리 및 이미지 처리 관련 모듈의 중복/레거시 로직을 제거해 해당 모듈 기준 코드 라인 수를 약 50% 절감했습니다.
- 기존 UI 캡처 방식의 병목을 분석하고, Canvas 좌표 기반 오프스크린 이미지 합성 방식으로 재설계했습니다.
- 약 1분 소요되던 이미지 저장 처리 시간을 4초 이내로 단축했습니다.
- Shorebird Code Push를 실제 배포에 적용해 베타 운영 중 긴급 수정 대응 속도를 높였습니다.

**사용 기술**: Flutter, Dart, BLoC, Canvas API, Off-screen Rendering, Shorebird Code Push

### GtWins / 금융 MTS 및 WTS
- **역할**: 개발팀장
- **기간**: 2022.06 - 2022.12
- **도메인**: 금융 MTS/WTS, 실시간 시세, Native SDK, 결제/구독
- **팀 구성**: Flutter 개발자, 웹 개발자, 디자이너, QA 포함 3~5명 규모

금융 MTS/WTS 개발팀장으로 모바일 앱 핵심 기능, 자체 차트 엔진, 증권사 Native AAR 연동, 실시간 알림 서버, 결제/구독/정산 시스템을 직접 구현하고 팀 개발을 리딩했습니다.

- 수천 개 캔들과 보조지표를 부드럽게 표현하기 위해 Flutter Canvas API 기반 자체 금융 차트 엔진을 구현했습니다.
- 캔들 차트, 거래량, 이동평균선, 볼린저 밴드, 일목균형표, 터치/줌/스크롤, 실시간 업데이트를 직접 구현했습니다.
- 실시간 시세 변경 시 변경된 데이터 셀과 차트 지점만 갱신하는 Partial Update 구조를 적용해 UI 프리징을 줄였습니다.
- 문서가 부족한 증권사 Android Native AAR SDK를 분석하고, 단발성 명령은 Method Channel, 실시간 시세 스트리밍은 Event Channel로 분리했습니다.
- 국내 3,500개 이상 종목 데이터를 기반으로 지표 돌파 조건을 계산하고 알림으로 연결하는 서버 로직을 구현했습니다.
- 포트원 기반 결제 연동, 유료 구독 모델 기획, 구독 권한 관리, 정산 로직, 관리자 페이지를 구현했습니다.
- Flutter Web 기반 WTS PoC를 2주 만에 구현한 뒤, 장기 유지보수성과 웹 UX를 고려해 Next.js 전환을 제안하고 진행했습니다.

**사용 기술**: Flutter, Dart, Canvas API, GetX, Android Native AAR, Method Channel, Event Channel, MQTT, MySQL Memory Engine, Node.js, Next.js, React, TypeScript, PortOne

### SCVSOFT
- **역할**: 개발팀장 / 테크니컬 컨설턴트
- **기간**: 2023.01 - 2023.12
- **도메인**: 대규모 분산 데이터 수집, 실시간 백엔드, 기술 사양 정의
- **팀 구성**: 백엔드 개발자, 웹 개발자, 외주 개발자 포함 3~5명 규모

분산된 하드웨어 노드 또는 서비스 단말에서 유입되는 데이터를 안정적으로 수집하고 처리하는 백엔드 구조를 설계했습니다. 또한 파트너사의 추상적인 요구사항을 개발 가능한 기술 요건으로 정리하는 프로세스를 만들었습니다.

- NestJS와 MQTT Pub/Sub 기반 데이터 수집 파이프라인을 설계하고 핵심 구현을 담당했습니다.
- 유입 데이터를 Redis 캐싱 레이어에 먼저 적재하고, 비동기 워커가 처리하도록 구조를 분리했습니다.
- DB 직접 쓰기 비중을 줄이고, 처리량 증가에 따라 워커를 확장할 수 있는 구조를 구성했습니다.
- Figma UI 컴포넌트와 백엔드 API 문서를 1:1로 매칭하는 프로세스를 정립했습니다.
- 비전문 이해관계자의 요구사항을 기술 사양으로 변환해 재작업과 일정 지연 가능성을 낮췄습니다.

**사용 기술**: NestJS, Node.js, TypeScript, MQTT, Redis, MySQL, Async Worker, Figma, API 문서, 기술 사양서

### HiKick / RYDE 공동창업
- **역할**: 공동창업자, 전체 소프트웨어 총괄 개발 및 유지보수
- **기간**: 2020.01 - 2020.06
- **도메인**: 공유 킥보드, 위치 기반 서비스, 결제, 초기 모빌리티 운영

공유 킥보드 서비스의 초기 제품 설계부터 모바일 앱 개발, 위치 기반 기능, 결제 연동, 운영 안정화까지 담당했습니다. O2O 서비스에서 사용자 앱, 지도, 결제, 운영 흐름이 함께 맞물려야 한다는 점을 직접 경험했습니다.

- 초기 프로토타입 아키텍처를 설계하고 서비스 운영에 필요한 핵심 기능을 구현했습니다.
- Naver 지도 엔진 임베딩 전환을 지원했습니다.
- JTNET 결제 모듈 고도화 등 주요 결제 관련 기술 의사결정을 지원했습니다.
- 서비스 성장에 기여했으며, 이후 메이저 공유 킥보드 브랜드 `씽씽`에 피인수되었습니다.

**사용 기술**: Flutter, 지도 SDK, JTNET 결제 연동, 백엔드 API

### SRV / MOKEY BLE 잠금해제 앱
- **역할**: 1인 개발
- **도메인**: 오토바이 BLE 기반 잠금/잠금해제, 위치 추적, 디바이스 관리
- **상태**: 소프트웨어 납품 완료, 하드웨어 출시 대기

Flutter 앱과 Android/iOS 네이티브 레이어를 함께 구성해 사용자가 앱을 직접 실행하지 않은 상태에서도 BLE 디바이스 접근 이벤트를 처리하는 모바일 앱 구조를 구현했습니다.

- Android Companion Device API의 companion device association 및 device presence 개념을 활용해 백그라운드 근접 이벤트 처리 구조를 설계했습니다.
- BLE scan, association, connect, service/characteristic discovery, command write, notify/read 수신, reconnect까지 BLE 연동 전 범위를 구현했습니다.
- MethodChannel과 EventChannel을 활용해 잠금/해제 명령, BLE 상태 스트림, 재연결 이벤트를 앱 상태와 연결했습니다.
- NestJS/GraphQL 기반으로 사용자, 디바이스, 권한, 잠금/해제 이벤트, 위치 로그, 운영자 관리 도메인을 구성했습니다.
- MQTT 기반 디바이스 통신과 Supabase 온프레미스/Docker 배포 구성을 정리했습니다.

**사용 기술**: Flutter, Android Native, iOS CoreBluetooth, Companion Device API, BLE, NestJS, GraphQL, MQTT, Docker, Supabase 온프레미스

## 프로젝트 및 외주 경험

- **공기질 측정 솔루션**: Next.js 기반 실시간 모니터링 대시보드, MQTT 데이터 수집, MySQL 저장 구조, PWA 알림, Docker 온프레미스 배포 구성
- **Dear My Day**: Google Calendar 연동 채팅 스타일 캘린더 모바일 앱 및 백엔드 API 1인 개발, Google Play Store 및 Apple App Store 출시
- **클럽 테이블 예약 시스템**: Node.js, Prisma, TypeScript 기반 예약 백엔드 아키텍처 신규 설계 및 Flutter 모바일 앱 구축
- **TIDEMINE / BKON**: 가상자산 리워드 플랫폼 앱 구축 및 5만 개 이상 분산 노드 관리/통계 백엔드 시스템 구현
- **버니오토워시**: 세차 서비스 모바일 앱 및 운영 시스템 구축, 유지보수 수행

## 수상

- **정부혁신박람회 금상** (2019.12): 국세청 전시 프로젝트 G-Mission 인터랙티브 앱 개발 및 현장 운영 안정화 지원
- **Smarteen App Challenge 최우수상, SK플래닛 대표이사상** (2018.10): UI 자동화 소프트웨어 `Bridged` 안드로이드 핵심 기능 개발 및 기술력 인정

## 학력

- **성보고등학교** (2017.03 - 2020.02): 이공계열 졸업

## 업무 철학

기술 선택은 유행보다 제품 단계와 운영 조건에 맞아야 한다고 생각합니다. 빠르게 검증해야 하는 단계에서는 PoC와 MVP로 리스크를 줄이고, 장기 운영이 필요한 단계에서는 상태 흐름, 모듈 경계, 배포와 장애 대응까지 고려해 구조를 다시 잡습니다.

기획, 디자인, 백엔드와의 협업에서는 Figma 화면과 API 명세, 기술 사양을 연결해 “무엇을 왜 만드는지”를 먼저 맞춥니다. 개발팀장 역할을 하더라도 핵심 기술 영역은 직접 이해하고 구현하며, 동시에 팀원이 맡을 수 있는 작업 단위와 책임 범위를 명확히 나눠 제품 개발 속도와 품질을 함께 관리합니다.

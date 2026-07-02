// QA Test Data — 랜딩 페이지 (landing)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "랜딩 페이지",
  "screen": "landing",
  "lastUpdated": "2026-05-26",
  "priority": "low",
  "cases": [
    {
      "id": "LD-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "랜딩 페이지 정상 표시 (데스크톱 브라우저)",
      "precondition": "일반 데스크톱 브라우저에서 https://defyton.com/ 접근",
      "action": "URL 직접 입력 또는 링크 클릭으로 접근",
      "expected": "히어로 섹션(로고, 태그라인, 서브카피, CTA), How It Works 3단계, Key Features 4개, 하단 CTA, 푸터 정상 표시. 2열 그리드 레이아웃.",
      "dbCheck": "변경 없음 (정적 페이지)"
    },
    {
      "id": "LD-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "랜딩 페이지 정상 표시 (모바일 브라우저)",
      "precondition": "모바일 브라우저(480px 이하)에서 https://defyton.com/ 접근",
      "action": "URL 직접 입력 또는 링크 클릭으로 접근",
      "expected": "반응형 레이아웃 적용: CTA 버튼 전체 너비, Features 1열 그리드, 태그라인 28px, 섹션 간격 축소",
      "dbCheck": "변경 없음 (정적 페이지)"
    },
    {
      "id": "LD-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "CTA 버튼 클릭 → Telegram 딥링크 이동",
      "precondition": "랜딩 페이지 정상 로드",
      "action": "상단 또는 하단 CTA 버튼 ('Open in Telegram' / 'Start Your Challenge') 클릭",
      "expected": "https://t.me/{botUsername}/app 으로 이동 (Telegram 앱 설치 시 앱 열림, 미설치 시 웹 버전)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "LD-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Terms of Service 링크 클릭",
      "precondition": "랜딩 페이지 정상 로드",
      "action": "하단 'Terms of Service' 링크 클릭",
      "expected": "/terms 페이지로 이동, Terms of Service 내용 정상 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "LD-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Privacy Policy 링크 클릭",
      "precondition": "랜딩 페이지 정상 로드",
      "action": "하단 'Privacy Policy' 링크 클릭",
      "expected": "/privacy 페이지로 이동, Privacy Policy 내용 정상 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "LD-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "OG 메타태그 정상 포함 (소셜 공유 미리보기)",
      "precondition": "랜딩 페이지 HTML 소스 확인",
      "action": "페이지 소스 보기 또는 소셜 미리보기 도구로 확인",
      "expected": "og:title, og:description, og:type, og:url 메타태그 존재. 소셜 공유 시 미리보기 정상 표시.",
      "dbCheck": "변경 없음"
    },
    {
      "id": "LD-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "fade-in 애니메이션 정상 동작",
      "precondition": "랜딩 페이지 정상 로드",
      "action": "페이지 스크롤",
      "expected": "히어로 섹션은 즉시 애니메이션, How It Works/Features 섹션은 뷰포트 진입 시 fade-in 애니메이션 실행",
      "dbCheck": "변경 없음"
    },
    {
      "id": "LD-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "서버 다운 시 접근",
      "precondition": "BE 서버 다운 상태",
      "action": "https://defyton.com/ 접근",
      "expected": "nginx 502/503 에러 페이지 표시 (서비스 일시 중단 안내)",
      "dbCheck": "변경 없음"
    }
  ]
};

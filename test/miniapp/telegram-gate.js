// QA Test Data — Telegram 외부 접근 안내 (telegram-gate)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "Telegram 외부 접근 안내",
  "screen": "telegram-gate",
  "lastUpdated": "2026-05-26",
  "priority": "medium",
  "cases": [
    {
      "id": "TG-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "일반 브라우저에서 /miniapp/ 접근 시 안내 화면 표시",
      "precondition": "일반 브라우저(Chrome, Safari 등)에서 https://defyton.com/miniapp/ 접근. Telegram WebView 아님.",
      "action": "URL 직접 입력으로 접근",
      "expected": "Mini App UI 대신 Telegram Gate 안내 화면 표시: 📱 아이콘, 'Open in Telegram' 타이틀, 안내 문구, CTA 버튼, Telegram 다운로드 링크",
      "dbCheck": "변경 없음 (API 호출 없음)"
    },
    {
      "id": "TG-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Telegram 내부에서 /miniapp/ 접근 시 정상 앱 렌더링",
      "precondition": "Telegram WebView 내에서 Mini App 실행 (window.Telegram.WebApp 존재)",
      "action": "Telegram에서 Mini App 실행",
      "expected": "Telegram Gate 화면 미표시, 정상적으로 Mini App 홈 화면 렌더링",
      "dbCheck": "정상 인증 플로우 진행"
    },
    {
      "id": "TG-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Open in Telegram 버튼 클릭 → Telegram 딥링크 이동",
      "precondition": "Telegram Gate 안내 화면 표시 상태",
      "action": "'Open in Telegram' 버튼 클릭",
      "expected": "https://t.me/{botUsername}/app 으로 이동 (Telegram 앱 설치 시 앱 열림)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TG-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Telegram 다운로드 링크 클릭",
      "precondition": "Telegram Gate 안내 화면 표시 상태",
      "action": "'Download here' 링크 클릭",
      "expected": "https://telegram.org/apps 새 탭으로 열림",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TG-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "/miniapp/ 하위 경로 접근 시에도 Gate 표시",
      "precondition": "일반 브라우저에서 https://defyton.com/miniapp/wallet 등 하위 경로 접근",
      "action": "Mini App 하위 경로 URL 직접 입력",
      "expected": "동일하게 Telegram Gate 안내 화면 표시 (하위 경로 무관하게 Gate 적용)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TG-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "모바일 브라우저에서 접근 시 레이아웃 정상",
      "precondition": "모바일 브라우저(iOS Safari, Android Chrome)에서 https://defyton.com/miniapp/ 접근",
      "action": "URL 직접 입력으로 접근",
      "expected": "모바일 레이아웃 정상 표시, CTA 버튼 전체 너비, 중앙 정렬 유지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TG-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "Telegram Desktop에서 Mini App 실행 시 정상 동작",
      "precondition": "Telegram Desktop 앱에서 Mini App 실행 (window.Telegram.WebApp 존재)",
      "action": "Telegram Desktop에서 봇 → Mini App 실행",
      "expected": "Telegram Gate 미표시, 정상적으로 Mini App 렌더링 (Desktop WebView도 Telegram.WebApp 객체 제공)",
      "dbCheck": "정상 인증 플로우 진행"
    }
  ]
};

// QA Test Data — FAQ (faq)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "FAQ",
  "screen": "faq",
  "lastUpdated": "2026-05-21",
  "priority": "low",
  "cases": [
    {
      "id": "FQ-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "FAQ 카테고리별 질문 목록 표시",
      "precondition": "FAQ 데이터가 카테고리별로 존재",
      "action": "FAQ 화면 진입",
      "expected": "카테고리별로 그룹핑된 질문 목록 표시 (아코디언 접힌 상태)",
      "dbCheck": "변경 없음 (정적 데이터 또는 API 조회)"
    },
    {
      "id": "FQ-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "아코디언 펼치기 — 답변 표시",
      "precondition": "FAQ 목록 표시 상태",
      "action": "질문 항목 탭",
      "expected": "해당 질문의 답변이 아코디언으로 펼쳐짐, 다른 항목은 접힌 상태 유지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "FQ-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "아코디언 접기 — 답변 숨기기",
      "precondition": "하나의 FAQ 항목이 펼쳐진 상태",
      "action": "펼쳐진 질문 항목 다시 탭",
      "expected": "답변이 접혀서 숨겨짐",
      "dbCheck": "변경 없음"
    },
    {
      "id": "FQ-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "다른 카테고리 전환 시 질문 목록 변경",
      "precondition": "여러 카테고리 존재",
      "action": "다른 카테고리 탭 선택",
      "expected": "해당 카테고리의 질문 목록으로 변경",
      "dbCheck": "변경 없음"
    },
    {
      "id": "FQ-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "FAQ 데이터 없을 때 빈 상태",
      "precondition": "FAQ 데이터 0건",
      "action": "FAQ 화면 진입",
      "expected": "빈 상태 메시지 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "FQ-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "네트워크 오류 시 에러 표시",
      "precondition": "네트워크 단절 또는 서버 오류",
      "action": "FAQ 화면 진입",
      "expected": "에러 메시지 + 재시도 버튼",
      "dbCheck": "변경 없음"
    }
  ]
};

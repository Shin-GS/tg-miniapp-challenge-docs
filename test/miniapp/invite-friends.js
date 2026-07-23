// QA Test Data — 초대 (invite-friends)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "초대",
  "screen": "invite-friends",
  "lastUpdated": "2026-05-21",
  "priority": "low",
  "cases": [
    {
      "id": "IF-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "초대 링크 정상 표시",
      "precondition": "사용자 로그인 상태, invite_code 존재",
      "action": "초대 화면 진입",
      "expected": "초대 링크 표시 (t.me/bot?start={invite_code} 형태)",
      "dbCheck": "USERS(invite_code) 조회 확인"
    },
    {
      "id": "IF-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "초대 링크 복사 버튼 동작",
      "precondition": "초대 화면 진입, 링크 표시됨",
      "action": "Copy 버튼 탭",
      "expected": "클립보드에 초대 링크 복사, 성공 피드백 (토스트 또는 버튼 텍스트 변경)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "IF-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "초대 링크 공유 버튼 동작",
      "precondition": "초대 화면 진입",
      "action": "Share 버튼 탭",
      "expected": "Telegram 공유 인터페이스 호출 (메시지 전송 화면)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "IF-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "초대 수 표시 확인",
      "precondition": "해당 사용자가 초대한 사람이 3명 존재",
      "action": "초대 화면 진입",
      "expected": "초대 수 '3' 표시",
      "dbCheck": "INVITE_HISTORY(inviter_id=현재사용자) COUNT = 3 확인"
    },
    {
      "id": "IF-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "초대 수 0명일 때 표시",
      "precondition": "해당 사용자가 초대한 사람 0명",
      "action": "초대 화면 진입",
      "expected": "초대 수 '0' 표시 또는 초대 유도 메시지",
      "dbCheck": "INVITE_HISTORY(inviter_id=현재사용자) COUNT = 0 확인"
    },
    {
      "id": "IF-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "클립보드 복사 실패 시 대체 동작",
      "precondition": "클립보드 API 미지원 환경",
      "action": "Copy 버튼 탭",
      "expected": "에러 토스트 또는 링크 텍스트 선택 상태로 전환",
      "dbCheck": "변경 없음"
    },
    {
      "id": "IF-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "API 오류 시 초대 수 로딩 실패",
      "precondition": "서버 오류",
      "action": "초대 화면 진입",
      "expected": "초대 수 영역에 에러 표시 또는 '-' 표시, 링크는 정상 표시",
      "dbCheck": "변경 없음"
    }
  ]
};

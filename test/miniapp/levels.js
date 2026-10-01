// QA Test Data — 레벨 (levels)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "레벨",
  "screen": "levels",
  "lastUpdated": "2026-05-21",
  "priority": "low",
  "cases": [
    {
      "id": "LV-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "레벨 구간 표 정상 표시 (Level 0~10)",
      "precondition": "레벨 화면 진입",
      "action": "레벨 화면 진입",
      "expected": "Level 0~10까지 11단계 표시, 각 레벨별 TON 범위 표시 (Level 0: 0~0.9999, Level 1: 1~2.9999, ..., Level 10: 1000+)",
      "dbCheck": "변경 없음 (BE Enum 정적 데이터, GET /api/v1/levels API 응답 확인)"
    },
    {
      "id": "LV-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "출금 수수료 표 정상 표시 (레벨별 차등)",
      "precondition": "레벨 화면 진입",
      "action": "출금 수수료 섹션 확인",
      "expected": "레벨별 수수료율 표시 (Level 0: 10%, Level 1: 9%, ..., Level 10: 0%), DEPOSIT 출금은 수수료 없음 안내",
      "dbCheck": "변경 없음 (정적 데이터)"
    },
    {
      "id": "LV-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "현재 레벨 하이라이트 표시",
      "precondition": "사용자 현재 레벨이 Level 3 (rewardTon = 10)",
      "action": "레벨 화면 진입",
      "expected": "Level 3 행이 하이라이트 처리 (배경색 또는 뱃지로 구분)",
      "dbCheck": "WALLET_BALANCE(reward_ton) 기준 레벨 계산 확인, USER_STATS(level) 확인"
    },
    {
      "id": "LV-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Level 0 사용자 하이라이트 확인",
      "precondition": "rewardTon = 0 (Level 0)",
      "action": "레벨 화면 진입",
      "expected": "Level 0 행이 하이라이트 처리",
      "dbCheck": "WALLET_BALANCE(reward_ton=0) 확인"
    },
    {
      "id": "LV-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Level 10 사용자 하이라이트 확인",
      "precondition": "rewardTon >= 1000 (Level 10)",
      "action": "레벨 화면 진입",
      "expected": "Level 10 행이 하이라이트 처리, 상한 없음 표시 ('1000+ TON')",
      "dbCheck": "WALLET_BALANCE(reward_ton >= 1000) 확인"
    },
    {
      "id": "LV-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "레벨 API 호출 실패 시 에러 표시",
      "precondition": "서버 오류 또는 네트워크 단절",
      "action": "레벨 화면 진입",
      "expected": "에러 메시지 + 재시도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "LV-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "레벨 경계값 정확성 확인 (Level 1 하한)",
      "precondition": "rewardTon = 0.9999 (Level 0), rewardTon = 1.0000 (Level 1)",
      "action": "레벨 화면 진입하여 하이라이트 확인",
      "expected": "0.9999 TON → Level 0 하이라이트, 1.0000 TON → Level 1 하이라이트",
      "dbCheck": "WALLET_BALANCE(reward_ton) 기준 레벨 경계값 정확성 확인"
    }
  ]
};

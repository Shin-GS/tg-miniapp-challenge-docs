// QA Test Data — 설정 (settings)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "설정",
  "screen": "settings",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "SE-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Display Name 변경 성공",
      "precondition": "설정 화면 진입, 현재 serviceName 표시됨",
      "action": "Display Name 필드 탭 → 새 이름 입력 (예: 'MyNewName') → 저장",
      "expected": "성공 토스트, 변경된 이름 즉시 반영",
      "dbCheck": "USERS(service_name='MyNewName') 업데이트 확인"
    },
    {
      "id": "SE-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Country 선택 성공",
      "precondition": "설정 화면 진입",
      "action": "Country 필드 탭 → 국가 선택 (예: 'KR') → 저장",
      "expected": "선택한 국가 표시, 성공 토스트",
      "dbCheck": "USERS(country_code='KR') 업데이트 확인"
    },
    {
      "id": "SE-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Timezone 변경 성공",
      "precondition": "설정 화면 진입, 현재 timezone 표시됨",
      "action": "Timezone 필드 탭 → 새 타임존 선택 (예: 'Asia/Seoul') → 저장",
      "expected": "변경된 타임존 표시, 성공 토스트",
      "dbCheck": "USERS(timezone='Asia/Seoul') 업데이트 확인"
    },
    {
      "id": "SE-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "알림 전체 ON → OFF 전환",
      "precondition": "알림 설정이 ON 상태 (기본값)",
      "action": "Notifications 토글 OFF",
      "expected": "토글 OFF 상태로 변경, 모든 알림 타입 비활성화",
      "dbCheck": "NOTIFICATION_SETTING(user_id, enabled=false) 모든 타입에 대해 레코드 생성/업데이트"
    },
    {
      "id": "SE-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "알림 전체 OFF → ON 전환",
      "precondition": "알림 설정이 OFF 상태",
      "action": "Notifications 토글 ON",
      "expected": "토글 ON 상태로 변경, 모든 알림 타입 활성화",
      "dbCheck": "NOTIFICATION_SETTING(user_id, enabled=true) 모든 타입에 대해 업데이트 또는 레코드 삭제"
    },
    {
      "id": "SE-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "FAQ 링크 이동 확인",
      "precondition": "설정 화면 진입",
      "action": "FAQ 항목 탭",
      "expected": "FAQ 화면으로 네비게이션",
      "dbCheck": "변경 없음"
    },
    {
      "id": "SE-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Terms of Service 링크 이동 확인",
      "precondition": "설정 화면 진입",
      "action": "Terms of Service 항목 탭",
      "expected": "이용약관 화면으로 네비게이션",
      "dbCheck": "변경 없음"
    },
    {
      "id": "SE-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Privacy Policy 링크 이동 확인",
      "precondition": "설정 화면 진입",
      "action": "Privacy Policy 항목 탭",
      "expected": "개인정보처리방침 화면으로 네비게이션",
      "dbCheck": "변경 없음"
    },
    {
      "id": "SE-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "Display Name 빈 값 저장 시도 거부",
      "precondition": "설정 화면 진입",
      "action": "Display Name 필드 비우기 → 저장",
      "expected": "에러 메시지 (이름은 필수), 저장 안 됨",
      "dbCheck": "변경 없음"
    },
    {
      "id": "SE-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "Display Name 공백만 입력 시 거부",
      "precondition": "설정 화면 진입",
      "action": "Display Name에 공백만 입력 → 저장",
      "expected": "에러 메시지 (유효한 이름 입력 필요), 저장 안 됨",
      "dbCheck": "변경 없음"
    },
    {
      "id": "SE-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "네트워크 오류 시 설정 저장 실패",
      "precondition": "네트워크 단절 상태",
      "action": "설정 변경 → 저장",
      "expected": "에러 토스트 표시, 이전 값 유지",
      "dbCheck": "변경 없음"
    }
  ]
};

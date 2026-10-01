// QA Test Data — 사용자 관리 (user-management)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "사용자 관리",
  "screen": "user-management",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "UM-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "사용자 목록 조회 (기본 상태)",
      "precondition": "사용자 1명 이상 존재",
      "action": "사이드바 '사용자 관리' 클릭",
      "expected": "사용자 목록 표시 (프로필 사진, ID, 서비스명, Telegram Username, 레벨, 상태, 가입일), 최신 가입순",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "검색 — serviceName으로 검색",
      "precondition": "사용자 목록 표시 상태",
      "action": "검색 입력란에 'Challenger_aB' 입력 (debounce 300ms)",
      "expected": "serviceName에 'Challenger_aB' 포함된 사용자만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "상태 필터 — BANNED만 조회",
      "precondition": "BANNED 사용자 존재",
      "action": "상태 필터에서 'BANNED' 선택",
      "expected": "BANNED 상태 사용자만 표시, 상태 배지 빨간색",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "사용자 상세 조회 (ACTIVE 사용자)",
      "precondition": "ACTIVE 사용자 존재",
      "action": "목록에서 ACTIVE 사용자 행 클릭",
      "expected": "상세 패널: 프로필 정보(serviceName, telegramId, username, 레벨, 국가, 타임존, 지갑 주소, 상태), 잔액(Available/Locked/Reward), 참여 요약, 밴 이력, '밴' + '잔액 조정' 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "사용자 밴 처리",
      "precondition": "ACTIVE 사용자 상세 패널 열림",
      "action": "'밴' 버튼 클릭 → 사유 입력 (예: '부정 인증 반복') → 확인",
      "expected": "성공 토스트 '사용자가 밴 처리되었습니다.', 상태 BANNED으로 변경, 사용자에게 밴 알림 발송",
      "dbCheck": "USERS(status=BANNED), USER_BAN_HISTORY(action=BAN, reason=입력값), ADMIN_ACTIVITY_LOG(action=BAN_USER, target_type=USER)"
    },
    {
      "id": "UM-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "사용자 밴 해제",
      "precondition": "BANNED 사용자 상세 패널 열림",
      "action": "'밴 해제' 버튼 클릭 → 사유 입력 (예: '오인 밴 해제') → 확인",
      "expected": "성공 토스트 '밴이 해제되었습니다.', 상태 ACTIVE로 변경, 사용자에게 밴해제 알림 발송",
      "dbCheck": "USERS(status=ACTIVE), USER_BAN_HISTORY(action=UNBAN, reason=입력값), ADMIN_ACTIVITY_LOG(action=UNBAN_USER, target_type=USER)"
    },
    {
      "id": "UM-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "잔액 조정 — DEPOSIT 증가",
      "precondition": "사용자 상세 패널 열림",
      "action": "'잔액 조정' 클릭 → 금액: 5 → 방향: IN → 대상: DEPOSIT → 사유 입력 → '조정 실행' → 확인 팝업 → 확인",
      "expected": "성공 토스트 '잔액이 조정되었습니다.', 상세 패널 Available 잔액 +5 반영",
      "dbCheck": "WALLET_BALANCE(deposit_ton+=5), TRANSACTION(type=ADMIN_INCREASE, amount=5, target=DEPOSIT), ADMIN_ACTIVITY_LOG(action=ADJUST_BALANCE, target_type=USER)"
    },
    {
      "id": "UM-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "잔액 조정 — REWARD 감소",
      "precondition": "사용자 rewardTon >= 3",
      "action": "'잔액 조정' 클릭 → 금액: 3 → 방향: OUT → 대상: REWARD → 사유 입력 → '조정 실행' → 확인",
      "expected": "성공 토스트, Reward 잔액 -3 반영, 레벨 재계산 (하락 가능)",
      "dbCheck": "WALLET_BALANCE(reward_ton-=3), TRANSACTION(type=ADMIN_DECREASE, amount=3, target=REWARD), ADMIN_ACTIVITY_LOG(action=ADJUST_BALANCE)"
    },
    {
      "id": "UM-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "잔액 조정 — REWARD 증가 시 레벨 상승",
      "precondition": "사용자 rewardTon=0.5 (Level 0)",
      "action": "'잔액 조정' → 금액: 2 → 방향: IN → 대상: REWARD → 사유 → 실행",
      "expected": "Reward 잔액 2.5, 레벨 Level 0 → Level 1 상승",
      "dbCheck": "WALLET_BALANCE(reward_ton=2.5), USER_STATS(level 재계산)"
    },
    {
      "id": "UM-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "밴 시 사유 미입력",
      "precondition": "밴 모달 열린 상태",
      "action": "사유 미입력 상태에서 확인 클릭",
      "expected": "확인 버튼 비활성 (사유 필수)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "이미 BANNED 상태에서 밴 시도",
      "precondition": "BANNED 사용자",
      "action": "API 직접 호출로 밴 시도",
      "expected": "에러 응답 (400), '밴' 버튼 미표시 (UI에서 방지)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잔액 부족 시 DECREASE 시도",
      "precondition": "사용자 depositTon=2",
      "action": "'잔액 조정' → 금액: 5 → 방향: OUT → 대상: DEPOSIT → 실행",
      "expected": "에러 토스트 '잔액이 부족합니다.' (400)",
      "dbCheck": "WALLET_BALANCE(deposit_ton=2 유지)"
    },
    {
      "id": "UM-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "검색 결과 없음",
      "precondition": "존재하지 않는 이름으로 검색",
      "action": "검색란에 'zzzzzzz' 입력",
      "expected": "'검색 결과가 없습니다.' 안내 메시지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "목록 API 호출 실패",
      "precondition": "서버 오류",
      "action": "사용자 관리 진입",
      "expected": "'데이터를 불러올 수 없습니다.' + 재시도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 자동 리다이렉트",
      "precondition": "JWT 2시간 만료",
      "action": "API 호출 시 401 응답",
      "expected": "로그인 화면으로 자동 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "UM-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "밴 알림 — 알림 OFF 상태에서도 발송 확인",
      "precondition": "ACTIVE 사용자, 알림 설정 전체 OFF (NotificationSetting enabled=false), allowsWriteToPm=true",
      "action": "'밴' 버튼 클릭 → 사유 입력 → 확인",
      "expected": "밴 처리 성공 + Telegram DM 알림 발송됨 (NotificationSetting 무관, 항상 발송)",
      "dbCheck": "USERS(status=BANNED), USER_BAN_HISTORY(action=BAN), 알림 발송 로그 확인"
    }
  ]
};

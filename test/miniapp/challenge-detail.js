// QA Test Data — 챌린지 상세 (challenge-detail)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "챌린지 상세",
  "screen": "challenge-detail",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "CD-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "챌린지 상세 정보 정상 표시",
      "precondition": "유효한 챌린지 ID로 상세 화면 진입",
      "action": "챌린지 목록에서 카드 탭하여 상세 진입",
      "expected": "챌린지 이름, 카테고리, 난이도, 기간, 인증 빈도, 예치금 범위, 참여자 수, 리워드율, 가이드 텍스트 모두 표시",
      "dbCheck": "CHALLENGE(id) 조회 — title, category_id, difficulty, schedule_type, required_verifications, verification_period_days, min_deposit_ton, max_deposit_ton, reward_rate, guide_text 확인"
    },
    {
      "id": "CD-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "참여 가능 상태 — 참여 버튼 활성화",
      "precondition": "depositTon >= min_deposit_ton, 해당 챌린지 ACTIVE 참여 없음, 인원 마감 아님, 종료되지 않음",
      "action": "챌린지 상세 화면 진입",
      "expected": "참여 버튼 활성화 상태 (Join Challenge)",
      "dbCheck": "WALLET_BALANCE(deposit_ton >= min_deposit_ton), CHALLENGE_PARTICIPATION(challenge_id, user_id, status=ACTIVE) 없음"
    },
    {
      "id": "CD-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "FIXED_PERIOD 챌린지 기간 정보 표시",
      "precondition": "schedule_type=FIXED_PERIOD 챌린지",
      "action": "챌린지 상세 화면 진입",
      "expected": "시작일~종료일 표시, 남은 기간 또는 D-day 표시",
      "dbCheck": "CHALLENGE(fixed_start_date, fixed_end_date) 확인"
    },
    {
      "id": "CD-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "RELATIVE_DAYS 챌린지 기간 정보 표시",
      "precondition": "schedule_type=RELATIVE_DAYS 챌린지",
      "action": "챌린지 상세 화면 진입",
      "expected": "'N days from join' 형태로 기간 표시",
      "dbCheck": "CHALLENGE(relative_days) 확인"
    },
    {
      "id": "CD-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "인증 빈도 및 가이드 정보 표시",
      "precondition": "챌린지에 guide_text, verification_start_time, verification_end_time 설정됨",
      "action": "챌린지 상세 화면 진입",
      "expected": "인증 빈도 (예: '3 times per 7 days'), 인증 가능 시간대, 가이드 텍스트 표시",
      "dbCheck": "CHALLENGE(required_verifications, verification_period_days, verification_start_time, verification_end_time, guide_text) 확인"
    },
    {
      "id": "CD-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "참여자 수 및 리워드율 표시",
      "precondition": "챌린지에 참여자가 존재",
      "action": "챌린지 상세 화면 진입",
      "expected": "총 참여자 수(totalParticipants), 리워드율(reward_rate) 표시",
      "dbCheck": "CHALLENGE(total_participants, reward_rate) 확인"
    },
    {
      "id": "CD-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잔액 부족 시 참여 버튼 비활성화",
      "precondition": "depositTon < min_deposit_ton",
      "action": "챌린지 상세 화면 진입",
      "expected": "참여 버튼 비활성화 + 'Insufficient deposit' 안내 메시지",
      "dbCheck": "WALLET_BALANCE(deposit_ton < min_deposit_ton) 확인"
    },
    {
      "id": "CD-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "이미 참여 중인 챌린지 — 중복 참여 불가",
      "precondition": "해당 챌린지에 ACTIVE 상태 참여가 존재",
      "action": "챌린지 상세 화면 진입",
      "expected": "참여 버튼 대신 'Already Joined' 표시 또는 버튼 비활성화",
      "dbCheck": "CHALLENGE_PARTICIPATION(challenge_id, user_id, status=ACTIVE) 존재"
    },
    {
      "id": "CD-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "인원 마감된 챌린지 — 참여 불가",
      "precondition": "ACTIVE 참여자 수 = max_participants",
      "action": "챌린지 상세 화면 진입",
      "expected": "참여 버튼 비활성화 + 'Challenge Full' 안내",
      "dbCheck": "CHALLENGE_PARTICIPATION(challenge_id, status=ACTIVE) COUNT = CHALLENGE(max_participants)"
    },
    {
      "id": "CD-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "종료된 FIXED_PERIOD 챌린지 — 참여 불가",
      "precondition": "FIXED_PERIOD 챌린지, fixed_end_date < today",
      "action": "챌린지 상세 화면 진입 (딥링크 등으로 직접 접근)",
      "expected": "참여 버튼 비활성화 + 'Challenge Ended' 안내",
      "dbCheck": "CHALLENGE(fixed_end_date < today) 확인"
    },
    {
      "id": "CD-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "존재하지 않는 챌린지 ID 접근",
      "precondition": "유효하지 않은 챌린지 ID",
      "action": "잘못된 URL로 챌린지 상세 접근",
      "expected": "에러 메시지 또는 목록으로 리다이렉트",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CD-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "지갑 미연결 상태에서 참여 시도",
      "precondition": "ton_wallet_address = null",
      "action": "챌린지 상세에서 참여 버튼 탭",
      "expected": "지갑 연결 유도 메시지 또는 Connect Wallet 화면으로 이동",
      "dbCheck": "변경 없음"
    }
  ]
};

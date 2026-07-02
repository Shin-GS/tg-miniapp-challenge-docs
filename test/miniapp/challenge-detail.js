// QA Test Data — 챌린지 상세 (challenge-detail)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "챌린지 상세",
  "screen": "challenge-detail",
  "lastUpdated": "2026-06-18",
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
      "expected": "\"Start Challenge (X TON)\" 버튼 활성화 상태 표시",
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
      "scenario": "리워드율 표시",
      "precondition": "챌린지에 reward_rate 설정됨",
      "action": "챌린지 상세 화면 진입",
      "expected": "Reward Rate 행에 리워드율(reward_rate) 표시 (예: '10%')",
      "dbCheck": "CHALLENGE(reward_rate) 확인"
    },
    {
      "id": "CD-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "재참여 가능 (이전 COMPLETED/FAILED/GIVEN_UP 후 같은 챌린지 재참여)",
      "precondition": "같은 챌린지에 이전 참여 이력 있음 (COMPLETED/FAILED/GIVEN_UP), 현재 ACTIVE 없음, 잔액 충분",
      "action": "챌린지 상세 화면 진입",
      "expected": "참여 버튼 활성화 (재참여 제한 없음), \"Previously participated\" 표시 가능",
      "dbCheck": "CHALLENGE_PARTICIPATION(challenge_id, user_id, status IN (COMPLETED, FAILED, GIVEN_UP)) 존재, CHALLENGE_PARTICIPATION(challenge_id, user_id, status=ACTIVE) 없음"
    },
    {
      "id": "CD-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "FIXED_PERIOD 중도 참여 안내 표시",
      "precondition": "FIXED_PERIOD 챌린지, 시작일 < today < 종료일",
      "action": "챌린지 상세 화면 진입",
      "expected": "\"This challenge has already started\" + \"Missed periods will be marked as MISSED\" 안내 표시, 참여 버튼 활성",
      "dbCheck": "CHALLENGE(schedule_type=FIXED_PERIOD, fixed_start_date < today, fixed_end_date > today) 확인"
    },
    {
      "id": "CD-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "예치금 범위 선택 — 슬라이더 + 직접 입력",
      "precondition": "min_deposit_ton=5, max_deposit_ton=20인 챌린지",
      "action": "챌린지 상세 화면 진입 → 예치금 영역 확인",
      "expected": "슬라이더(5~20 범위) + 직접 입력 필드 + \"Min: 5 TON — Max: 20 TON\" 안내 + 가용 잔액 표시",
      "dbCheck": "CHALLENGE(min_deposit_ton=5, max_deposit_ton=20) 확인"
    },
    {
      "id": "CD-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "예치금 고정 금액 (min == max)",
      "precondition": "min_deposit_ton=10, max_deposit_ton=10인 챌린지",
      "action": "챌린지 상세 화면 진입 → 예치금 영역 확인",
      "expected": "슬라이더 숨김, 고정 금액 \"10 TON\" 표시, 입력 불필요",
      "dbCheck": "CHALLENGE(min_deposit_ton=10, max_deposit_ton=10) 확인"
    },
    {
      "id": "CD-N-011",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "참여 성공 후 인증 제출 페이지로 이동 (replace, justJoined 배너)",
      "precondition": "참여 조건 충족, 예치금 입력 완료",
      "action": "\"Start Challenge (X TON)\" 버튼 탭",
      "expected": "참여 성공 → 인증 제출 페이지(/verify/{participationId})로 이동 (replace, 상세 페이지 히스토리 제거), 상단에 '✅ Challenge Joined!' 배너 표시, requestWriteAccess() fire-and-forget 호출",
      "dbCheck": "CHALLENGE_PARTICIPATION(challenge_id, user_id, status=ACTIVE) 생성, WALLET_BALANCE(deposit_ton -= X, locked_deposit_ton += X)"
    },
    {
      "id": "CD-N-012",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "가이드 이미지 + 가이드 텍스트 표시",
      "precondition": "챌린지에 guideImageUrl, guideText 설정됨",
      "action": "챌린지 상세 화면 진입",
      "expected": "가이드 이미지 표시 + 가이드 텍스트 표시",
      "dbCheck": "CHALLENGE(guide_image_url IS NOT NULL, guide_text IS NOT NULL) 확인"
    },
    {
      "id": "CD-N-013",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Participants 표시 — maxParticipants 있는 경우",
      "precondition": "max_participants=50, activeParticipantCount=30",
      "action": "챌린지 상세 화면 진입",
      "expected": "\"30 / 50\" 형태로 참여자 수 표시",
      "dbCheck": "CHALLENGE(max_participants=50), CHALLENGE_PARTICIPATION(challenge_id, status=ACTIVE) COUNT=30"
    },
    {
      "id": "CD-N-014",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Participants 표시 — maxParticipants 없고 totalParticipants >= 50",
      "precondition": "max_participants=null, totalParticipants=120",
      "action": "챌린지 상세 화면 진입",
      "expected": "\"50+ joined\" 표시",
      "dbCheck": "CHALLENGE(max_participants IS NULL, total_participants=120) 확인"
    },
    {
      "id": "CD-N-015",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Participants 표시 — maxParticipants 없고 totalParticipants < 50",
      "precondition": "max_participants=null, totalParticipants=10",
      "action": "챌린지 상세 화면 진입",
      "expected": "Participants 행 자체 숨김 (미표시)",
      "dbCheck": "CHALLENGE(max_participants IS NULL, total_participants=10) 확인"
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
      "scenario": "예치금 범위 미만 입력 시 인라인 에러",
      "precondition": "min_deposit_ton=5, 직접 입력 필드에 3 입력",
      "action": "예치금 3 TON 입력",
      "expected": "인라인 에러 \"Minimum deposit is 5 TON\" + 버튼 비활성",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CD-E-007",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "예치금 범위 초과 입력 시 인라인 에러",
      "precondition": "max_deposit_ton=20, 직접 입력 필드에 25 입력",
      "action": "예치금 25 TON 입력",
      "expected": "인라인 에러 \"Maximum deposit is 20 TON\" + 버튼 비활성",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CD-N-016",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공유 기능 — 바텀시트 표시 (Share to Telegram + Copy Link)",
      "precondition": "챌린지 상세 화면 진입 (참여 가능 여부 무관)",
      "action": "챌린지 요약 카드 우상단 공유 아이콘(📤) 탭",
      "expected": "바텀시트 모달 표시: '📤 Share to Telegram' + '🔗 Copy Link' 2개 옵션, 반투명 오버레이, 하단에서 슬라이드업",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CD-N-017",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공유 기능 — Share to Telegram",
      "precondition": "챌린지 상세 화면, 공유 바텀시트 표시 상태",
      "action": "'📤 Share to Telegram' 탭",
      "expected": "Telegram 네이티브 공유 다이얼로그 열림 (딥링크: startapp=c_{challengeId}, 텍스트: 챌린지명 + 기간 + 리워드 정보 포함)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CD-N-018",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공유 기능 — Copy Link",
      "precondition": "챌린지 상세 화면, 공유 바텀시트 표시 상태",
      "action": "'🔗 Copy Link' 탭",
      "expected": "공개 챌린지 URL(https://{도메인}/challenges/{challengeId})이 클립보드에 복사됨 + 'Link copied!' 토스트 + 바텀시트 닫힘",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CD-N-019",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "FREE 챌린지 참여 (예치금 0, 잔액 검증 스킵)",
      "precondition": "minDepositTon=0, maxDepositTon=0인 챌린지, 해당 챌린지 ACTIVE 참여 없음, 사용자 잔액 0 TON",
      "action": "챌린지 상세 화면 진입 → 'Start Challenge' 버튼 탭",
      "expected": "Deposit 영역에 'FREE — no deposit needed' 표시 (슬라이더/입력 숨김), 참여 버튼에 금액 없이 'Start Challenge' 표시, 탭 시 참여 성공",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=ACTIVE, deposit_ton=0), WALLET_BALANCE 변경 없음"
    },
    {
      "id": "CD-N-020",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "고정 리워드 표시 (fixedRewardTon != null)",
      "precondition": "fixedRewardTon=3인 챌린지",
      "action": "챌린지 상세 화면 진입",
      "expected": "Reward Rate 행에 'Reward: 3 TON' 표시 (기존 '%' 대신 고정 금액 형태)",
      "dbCheck": "CHALLENGE(fixed_reward_ton=3) 확인"
    },
    {
      "id": "CD-N-021",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "EVENT 타입 챌린지 표시 (challengeType=EVENT)",
      "precondition": "challengeType=EVENT인 챌린지",
      "action": "챌린지 상세 화면 진입",
      "expected": "챌린지 유형 표시 영역에 'EVENT' 타입 표시, 카테고리 뱃지(아이콘+displayName) 표시",
      "dbCheck": "CHALLENGE(challenge_type=EVENT) 확인"
    },
    {
      "id": "CD-N-022",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "딥링크 진입 — startapp=c_{challengeId} → 바로 상세 화면",
      "precondition": "유효한 encodedChallengeId에 해당하는 챌린지 존재",
      "action": "Telegram 딥링크로 진입: startapp=c_AbCdEf12",
      "expected": "챌린지 목록을 건너뛰고 해당 챌린지 상세 화면으로 직행, BackButton으로 홈 복귀 가능",
      "dbCheck": "변경 없음"
    }
  ]
};

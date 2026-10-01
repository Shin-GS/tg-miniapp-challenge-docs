// QA Test Data — 정산 (settlement)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "정산",
  "screen": "settlement",
  "lastUpdated": "2026-06-18",
  "priority": "critical",
  "cases": [
    {
      "id": "ST-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "미정산 챌린지 목록 조회 성공",
      "precondition": "종료일 < 오늘 + ACTIVE 참여자 1명 이상인 챌린지 존재",
      "action": "사이드바 '정산' 메뉴 클릭",
      "expected": "미정산 챌린지 목록 표시 (챌린지명, 카테고리, ACTIVE 참여자 수, 종료일)",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=ACTIVE, ends_at < today) JOIN CHALLENGE 조회 확인"
    },
    {
      "id": "ST-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "정산 미리보기 조회 성공",
      "precondition": "미정산 챌린지 목록에 챌린지 존재",
      "action": "미정산 챌린지 목록에서 챌린지 항목 클릭",
      "expected": "챌린지 정보 헤더(이름, 카테고리, 종료일, 패널티 유형/율, 리워드율) + 참여자 목록(체크박스, 이름, 예치금, 인증률, 예상 결과, 예상 금액) 표시",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=ACTIVE, ends_at < today, challenge_id=선택한 챌린지) 목록 확인"
    },
    {
      "id": "ST-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "COMPLETED 정산 실행 (인증률 100%)",
      "precondition": "인증률 100% 참여자 선택, 챌린지 reward_rate=0.3, deposit_ton=10",
      "action": "참여자 체크박스 선택 → '정산 실행' 클릭 → 확인 팝업 '확인'",
      "expected": "정산 결과 화면: COMPLETED 1건, 환급 10 TON + 리워드 3 TON 표시",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=COMPLETED, reward_ton=3.0000), WALLET_BALANCE(locked_deposit_ton-=10, deposit_ton+=10, reward_ton+=3), TRANSACTION(type=SETTLEMENT_COMPLETED)"
    },
    {
      "id": "ST-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "FAILED 정산 실행 — FIXED 패널티 (인증률 <100%)",
      "precondition": "인증률 70% 참여자, penalty_type=FIXED, penalty_rate=0.2, deposit_ton=10",
      "action": "참여자 체크박스 선택 → '정산 실행' 클릭 → 확인 팝업 '확인'",
      "expected": "정산 결과 화면: FAILED 1건, 패널티 2 TON (10×0.2), 환급 8 TON",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=FAILED, penalty_ton=2.0000), WALLET_BALANCE(locked_deposit_ton-=10, deposit_ton+=8), TRANSACTION(type=SETTLEMENT_FAILED)"
    },
    {
      "id": "ST-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "FAILED 정산 실행 — PROPORTIONAL 패널티 (인증률 <100%)",
      "precondition": "인증률 60% 참여자, penalty_type=PROPORTIONAL, penalty_rate=0.5, deposit_ton=10",
      "action": "참여자 체크박스 선택 → '정산 실행' 클릭 → 확인 팝업 '확인'",
      "expected": "정산 결과 화면: FAILED 1건, 패널티 2 TON (10×0.5×(1-0.6)), 환급 8 TON",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=FAILED, penalty_ton=2.0000), WALLET_BALANCE(locked_deposit_ton-=10, deposit_ton+=8), TRANSACTION(type=SETTLEMENT_FAILED)"
    },
    {
      "id": "ST-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "복수 참여자 일괄 정산 (COMPLETED + FAILED 혼합)",
      "precondition": "참여자A(인증률 100%), 참여자B(인증률 50%), 같은 챌린지, reward_rate=0.2, penalty_type=FIXED, penalty_rate=0.3",
      "action": "'전체 선택' 체크박스 → '정산 실행' 클릭 → 확인",
      "expected": "정산 결과: 정산 완료 2건, COMPLETED 1건, FAILED 1건",
      "dbCheck": "참여자A: CHALLENGE_PARTICIPATION(status=COMPLETED, reward_ton=deposit×0.2), 참여자B: CHALLENGE_PARTICIPATION(status=FAILED, penalty_ton=deposit×0.3)"
    },
    {
      "id": "ST-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "정산 후 미정산 목록에서 제거 확인",
      "precondition": "챌린지의 모든 ACTIVE 참여자 정산 완료",
      "action": "'목록으로 돌아가기' 클릭",
      "expected": "미정산 챌린지 목록에서 해당 챌린지 제거됨 (ACTIVE 참여자 0명)",
      "dbCheck": "CHALLENGE_PARTICIPATION(challenge_id=해당, status=ACTIVE) 0건"
    },
    {
      "id": "ST-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "이상 케이스 조회",
      "precondition": "RELATIVE_DAYS 챌린지에서 참여 시점이 달라 일부 참여자 ends_at > today",
      "action": "정산 미리보기 화면에서 '⚠️ 이상 케이스 N건' 배너 클릭",
      "expected": "이상 케이스 목록 표시 (참여자명, 예치금, 인증률, 상태, 종료일)",
      "dbCheck": "CHALLENGE_PARTICIPATION(challenge_id=해당, status=ACTIVE, ends_at >= today) 존재 확인"
    },
    {
      "id": "ST-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "페이지네이션 동작 확인",
      "precondition": "미정산 챌린지 11건 이상 존재 (page size=10 기준)",
      "action": "하단 페이지 번호 '2' 클릭",
      "expected": "2페이지 챌린지 목록 표시, 페이지 번호 '2' 활성화",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "정산 실행 시 이미 정산된 건 스킵",
      "precondition": "참여자A(ACTIVE), 참여자B(이미 COMPLETED 상태) 동시 선택",
      "action": "두 참여자 체크박스 선택 → '정산 실행' 클릭 → 확인",
      "expected": "정산 결과: 정산 완료 1건, 스킵 1건 (이미 정산된 건)",
      "dbCheck": "참여자A: status 변경됨, 참여자B: 변경 없음"
    },
    {
      "id": "ST-N-011",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "PROPORTIONAL 패널티 — 인증률 0% (최대 패널티)",
      "precondition": "인증률 0% 참여자, penalty_type=PROPORTIONAL, penalty_rate=0.5, deposit_ton=10",
      "action": "참여자 체크박스 선택 → '정산 실행' 클릭 → 확인",
      "expected": "정산 결과: FAILED 1건, 패널티 5 TON (10×0.5×(1-0)), 환급 5 TON",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=FAILED, penalty_ton=5.0000), WALLET_BALANCE(locked_deposit_ton-=10, deposit_ton+=5)"
    },
    {
      "id": "ST-N-012",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "정산 완료 시 레벨 상승 확인 (리워드 지급으로 rewardTon 증가)",
      "precondition": "사용자 rewardTon=0.5 (Level 0), COMPLETED 정산으로 reward=3 TON 지급 예정",
      "action": "참여자 체크박스 선택 → '정산 실행' 클릭 → 확인",
      "expected": "정산 완료, 사용자 레벨 Level 0 → Level 1 (rewardTon=3.5)",
      "dbCheck": "WALLET_BALANCE(reward_ton=3.5), USER_STATS 또는 레벨 관련 변동 확인"
    },
    {
      "id": "ST-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "미정산 챌린지 없음 (빈 상태)",
      "precondition": "종료일 < 오늘 + ACTIVE 참여자가 있는 챌린지 0건",
      "action": "사이드바 '정산' 메뉴 클릭",
      "expected": "'정산 대기 중인 챌린지가 없습니다.' 안내 메시지 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "최대 건수 초과 (100건 초과 선택)",
      "precondition": "정산 대상 참여자 101명 이상, 전체 선택",
      "action": "'전체 선택' 체크박스 → '정산 실행' 클릭",
      "expected": "에러 토스트: '최대 100건까지 한 번에 정산할 수 있습니다.' 정산 실행 차단",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "종료일 미도래 참여자 정산 시도",
      "precondition": "참여자의 ends_at >= today (아직 종료되지 않음)",
      "action": "해당 참여자 선택 → '정산 실행' 클릭 → 확인",
      "expected": "정산 결과에 에러 표시: 'Challenge period has not ended yet'",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=ACTIVE) 변경 없음"
    },
    {
      "id": "ST-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "다른 챌린지 참여자 혼합 정산 시도",
      "precondition": "challengeId=1의 정산 화면에서 challengeId=2의 participationId를 API에 직접 전송",
      "action": "API 직접 호출: POST /api/admin/v1/settlements/execute (challengeId 불일치)",
      "expected": "에러 응답: 'Participation does not belong to this challenge'",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "정산 대상 없음 (미리보기 시 ACTIVE 참여자 0명)",
      "precondition": "챌린지 종료됐지만 모든 참여자가 이미 정산 완료 (COMPLETED/FAILED)",
      "action": "미정산 챌린지 목록에서 해당 챌린지 클릭",
      "expected": "에러 응답 또는 '정산 대상이 없습니다' 안내 (SETTLEMENT_NO_TARGET)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "존재하지 않는 챌린지 ID로 미리보기 조회",
      "precondition": "존재하지 않는 challengeId=99999",
      "action": "GET /api/admin/v1/settlements/99999 호출",
      "expected": "404 에러: CHALLENGE_NOT_FOUND",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-007",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 상태에서 정산 시도",
      "precondition": "어드민 JWT 토큰 만료 (2시간 경과)",
      "action": "정산 메뉴 클릭 또는 정산 실행 시도",
      "expected": "401 응답 → 로그인 화면으로 자동 리다이렉트",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-008",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "선택 건수 0건으로 정산 실행 시도",
      "precondition": "참여자 목록 표시 중, 체크박스 미선택",
      "action": "'정산 실행' 버튼 클릭 시도",
      "expected": "'정산 실행' 버튼 비활성화 (클릭 불가)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-009",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "API 호출 실패 — 목록 조회 서버 오류",
      "precondition": "서버 내부 오류 발생 (500)",
      "action": "사이드바 '정산' 메뉴 클릭",
      "expected": "'데이터를 불러올 수 없습니다.' + 재시도 버튼 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-010",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "정산 실행 부분 실패 (일부 성공, 일부 에러)",
      "precondition": "참여자A(정상 ACTIVE), 참여자B(다른 챌린지 소속) 동시 선택",
      "action": "두 참여자 선택 → '정산 실행' 클릭 → 확인",
      "expected": "정산 결과: 정산 완료 1건 + 에러 목록에 참여자B 사유 표시",
      "dbCheck": "참여자A: status 변경됨, 참여자B: 변경 없음"
    },
    {
      "id": "ST-E-011",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "FIXED 패널티 — 인증률 0% (전체 패널티 적용)",
      "precondition": "인증률 0% 참여자, penalty_type=FIXED, penalty_rate=0.3, deposit_ton=10",
      "action": "참여자 체크박스 선택 → '정산 실행' 클릭 → 확인",
      "expected": "정산 결과: FAILED 1건, 패널티 3 TON (10×0.3, 인증률 무관), 환급 7 TON",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=FAILED, penalty_ton=3.0000), WALLET_BALANCE(locked_deposit_ton-=10, deposit_ton+=7)"
    },
    {
      "id": "ST-E-012",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "활동 로그 기록 확인",
      "precondition": "정산 실행 성공",
      "action": "정산 실행 후 활동 로그 화면 확인",
      "expected": "EXECUTE_SETTLEMENT 타입 로그 기록 (대상: CHALLENGE, 상세: settled/completed/failed/skipped 건수)",
      "dbCheck": "ADMIN_ACTIVITY_LOG(action_type=EXECUTE_SETTLEMENT, target_type=CHALLENGE, target_id=challengeId)"
    },
    {
      "id": "ST-N-013",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "GIVEN_UP 참여자가 정산 대상에서 제외되는지 확인",
      "precondition": "챌린지 종료, 참여자A(status=ACTIVE), 참여자B(status=GIVEN_UP, 이미 포기 시점에 정산 완료)",
      "action": "미정산 챌린지 목록에서 해당 챌린지 클릭 → 정산 미리보기 확인",
      "expected": "정산 미리보기에 참여자A만 표시, 참여자B는 미표시 (GIVEN_UP은 포기 시점에 이미 정산됨)",
      "dbCheck": "CHALLENGE_PARTICIPATION(참여자B, status=GIVEN_UP) — 정산 대상 아님"
    },
    {
      "id": "ST-N-025",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "EVENT 챌린지 정산 시 거래 유형 EVENT_REWARD로 기록",
      "precondition": "EVENT 타입 챌린지 종료, 인증률 100% 참여자 존재, fixedRewardTon=0.3",
      "action": "참여자 체크박스 선택 → '정산 실행' 클릭 → 확인",
      "expected": "정산 결과: COMPLETED 1건, 리워드 0.3 TON 표시",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=COMPLETED, reward_ton=0.3000), TRANSACTION(type=EVENT_REWARD, amount=0.3)"
    },
    {
      "id": "ST-N-026",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "EVENT + 고정 리워드(fixedRewardTon) 정산 — deposit 0 케이스",
      "precondition": "EVENT 타입 챌린지, deposit_ton=0 (FREE), fixedRewardTon=0.3, 인증률 100% 참여자",
      "action": "참여자 체크박스 선택 → '정산 실행' 클릭 → 확인",
      "expected": "정산 결과: COMPLETED 1건, deposit unlock 없음, rewardTon=0.3 TON 지급",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=COMPLETED, reward_ton=0.3000), WALLET_BALANCE(reward_ton+=0.3), TRANSACTION(type=EVENT_REWARD, amount=0.3)"
    }
  ]
};

// QA Test Data — 출금 요청 (withdrawal-request)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "출금 요청",
  "screen": "withdrawal-request",
  "lastUpdated": "2026-05-21",
  "priority": "critical",
  "cases": [
    {
      "id": "WR-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "REWARD 출금 요청 성공",
      "precondition": "rewardTon >= 요청 금액(정수), 지갑 연결됨, REWARD source PENDING/PROCESSING 없음",
      "action": "출금 화면 → REWARD 선택 → 금액 입력 → 확인",
      "expected": "성공 토스트 표시, 출금 요청 목록에 PENDING 상태로 추가, rewardTon 차감 반영",
      "dbCheck": "WITHDRAWAL_REQUEST(status=PENDING, source=REWARD, amount=요청금액, wallet_address=현재지갑), WALLET_BALANCE(reward_ton -= 요청금액), TRANSACTION(type=WITHDRAWAL_REQUEST, status=PENDING)"
    },
    {
      "id": "WR-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "DEPOSIT 출금 요청 성공",
      "precondition": "depositTon >= 요청 금액(정수), 지갑 연결됨, DEPOSIT source PENDING/PROCESSING 없음",
      "action": "출금 화면 → DEPOSIT 선택 → 금액 입력 → 확인",
      "expected": "성공 토스트 표시, 출금 요청 목록에 PENDING 상태로 추가, depositTon 차감 반영",
      "dbCheck": "WITHDRAWAL_REQUEST(status=PENDING, source=DEPOSIT, amount=요청금액, wallet_address=현재지갑), WALLET_BALANCE(deposit_ton -= 요청금액), TRANSACTION(type=WITHDRAWAL_REQUEST, status=PENDING)"
    },
    {
      "id": "WR-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "출금 요청 목록 상태별 표시 확인",
      "precondition": "다양한 상태(PENDING/COMPLETED/FAILED/REJECTED/CANCELLED)의 출금 요청 존재",
      "action": "출금 요청 목록 화면 진입",
      "expected": "각 상태별 뱃지/색상 구분 표시, 금액/날짜/source 정보 표시",
      "dbCheck": "WITHDRAWAL_REQUEST 목록 조회 확인"
    },
    {
      "id": "WR-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "PENDING 상태 출금 요청 사용자 취소 성공",
      "precondition": "PENDING 상태 출금 요청 존재",
      "action": "출금 요청 목록 → PENDING 건 선택 → 취소 버튼 탭 → 확인",
      "expected": "상태 CANCELLED로 변경, 잔액 복원 표시",
      "dbCheck": "WITHDRAWAL_REQUEST(status=CANCELLED), WALLET_BALANCE(reward_ton 또는 deposit_ton 복원), TRANSACTION(type=WITHDRAWAL_CANCEL)"
    },
    {
      "id": "WR-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "REWARD 출금 수수료 표시 확인",
      "precondition": "rewardTon >= 10, 현재 레벨 확인 (예: Level 3 → 수수료 7%)",
      "action": "출금 화면 → REWARD 선택 → 금액 10 입력",
      "expected": "수수료율 표시 (7%), 수수료 금액 (0.7 TON), 실수령액 (9.3 TON) 표시",
      "dbCheck": "변경 없음 (표시만 확인)"
    },
    {
      "id": "WR-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "DEPOSIT 출금 수수료 0% 확인",
      "precondition": "depositTon >= 5",
      "action": "출금 화면 → DEPOSIT 선택 → 금액 5 입력",
      "expected": "수수료 0% 표시, 실수령액 = 요청 금액 동일",
      "dbCheck": "변경 없음 (표시만 확인)"
    },
    {
      "id": "WR-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잔액 부족 시 출금 요청 실패",
      "precondition": "rewardTon < 요청 금액",
      "action": "출금 화면 → REWARD → 잔액 초과 금액 입력 → 확인",
      "expected": "에러 메시지 표시 (Insufficient balance), 요청 생성 안 됨",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WR-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "같은 source에 PENDING 요청 존재 시 중복 요청 차단",
      "precondition": "REWARD source로 PENDING 상태 요청 이미 존재",
      "action": "출금 화면 → REWARD → 금액 입력 → 확인",
      "expected": "에러 메시지 표시 (이미 처리 중인 요청 존재), 요청 생성 안 됨",
      "dbCheck": "WITHDRAWAL_REQUEST(source=REWARD, status IN (PENDING, PROCESSING)) 존재 확인"
    },
    {
      "id": "WR-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "소수점 금액 입력 시 거부",
      "precondition": "출금 화면 진입",
      "action": "금액에 3.5 입력 → 확인",
      "expected": "에러 메시지 (정수만 가능) 또는 입력 자체 차단",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WR-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "지갑 미연결 시 출금 요청 불가",
      "precondition": "ton_wallet_address = null",
      "action": "출금 화면 진입",
      "expected": "Connect Wallet 유도 메시지, 출금 폼 비활성화",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WR-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "PROCESSING 상태 출금 요청 취소 불가",
      "precondition": "PROCESSING 상태 출금 요청 존재",
      "action": "출금 요청 목록 → PROCESSING 건 확인",
      "expected": "취소 버튼 미표시 또는 비활성화",
      "dbCheck": "WITHDRAWAL_REQUEST(status=PROCESSING) 확인"
    },
    {
      "id": "WR-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "REWARD 요청 중에도 DEPOSIT 요청 가능 확인",
      "precondition": "REWARD source PENDING 요청 존재, depositTon >= 요청 금액",
      "action": "출금 화면 → DEPOSIT 선택 → 금액 입력 → 확인",
      "expected": "DEPOSIT 출금 요청 정상 생성 (source별 독립)",
      "dbCheck": "WITHDRAWAL_REQUEST(source=DEPOSIT, status=PENDING) 새로 생성 확인"
    },
    {
      "id": "WR-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "REWARD 출금 시 수수료 계산 기준 = 차감 전 레벨 검증",
      "precondition": "rewardTon=3 (Level 2, 수수료 8%), 지갑 연결됨, REWARD source PENDING/PROCESSING 없음",
      "action": "출금 화면 → REWARD 선택 → 3 TON 입력 → 확인",
      "expected": "수수료율 8% 적용 (차감 후 rewardTon=0 → Level 0이 되더라도), 수수료 0.24 TON, 실수령 2.76 TON",
      "dbCheck": "WITHDRAWAL_REQUEST(fee_ton=0.24, fee_rate=0.08, net_amount_ton=2.76)"
    }
  ]
};

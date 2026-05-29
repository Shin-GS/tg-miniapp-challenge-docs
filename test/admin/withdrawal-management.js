// QA Test Data — 출금 관리 (withdrawal-management)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "출금 관리",
  "screen": "withdrawal-management",
  "lastUpdated": "2026-05-21",
  "priority": "critical",
  "cases": [
    {
      "id": "WM-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "PENDING 출금 요청 목록 조회 성공",
      "precondition": "PENDING 상태 출금 요청 1건 이상 존재",
      "action": "사이드바 '출금 관리' 클릭 → PENDING 탭 선택",
      "expected": "PENDING 건만 표시 (ID, 사용자명, 금액, 출처, 지갑주소 축약, 상태 배지, 요청일), 각 행에 '승인'/'거절' 인라인 버튼 표시",
      "dbCheck": "WITHDRAWAL_REQUEST(status=PENDING) 목록 조회 확인"
    },
    {
      "id": "WM-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "대시보드에서 PENDING 필터로 진입",
      "precondition": "대시보드에 '출금 대기 N건' 표시 중",
      "action": "대시보드 '출금 대기 N건' 클릭",
      "expected": "출금 관리 화면 진입, PENDING 탭 자동 선택, PENDING 건만 표시",
      "dbCheck": "WITHDRAWAL_REQUEST(status=PENDING) COUNT 확인"
    },
    {
      "id": "WM-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "REWARD 출금 승인 성공 (블록체인 전송 완료)",
      "precondition": "PENDING 상태, source=REWARD, amountTon=5, feeTon=0.5(Level 0, 10%), netAmountTon=4.5",
      "action": "PENDING 건 '승인' 클릭 → 확인 팝업 '확인'",
      "expected": "해당 건 상태 PROCESSING → COMPLETED 변경, 목록에서 제거 (PENDING 필터 시), 성공 토스트",
      "dbCheck": "WITHDRAWAL_REQUEST(status=COMPLETED, processed_by=어드민ID, tx_hash NOT NULL, tx_confirmed_at NOT NULL), TRANSACTION(status=COMPLETED), ADMIN_ACTIVITY_LOG(action_type=WITHDRAWAL_APPROVE)"
    },
    {
      "id": "WM-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "DEPOSIT 출금 승인 성공 (수수료 0%)",
      "precondition": "PENDING 상태, source=DEPOSIT, amountTon=10, feeTon=0, netAmountTon=10",
      "action": "PENDING 건 '승인' 클릭 → 확인 팝업 '확인'",
      "expected": "해당 건 상태 COMPLETED 변경, txHash 표시",
      "dbCheck": "WITHDRAWAL_REQUEST(status=COMPLETED, fee_ton=0, net_amount_ton=10, tx_hash NOT NULL), TRANSACTION(status=COMPLETED), ADMIN_ACTIVITY_LOG(action_type=WITHDRAWAL_APPROVE)"
    },
    {
      "id": "WM-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "REWARD 출금 거절 성공 (잔액 + 레벨 복원)",
      "precondition": "PENDING 상태, source=REWARD, amountTon=5, 사용자 현재 rewardTon=0 (출금 요청 시 차감됨), 원래 레벨=Level 2",
      "action": "'거절' 클릭 → 거절 모달에서 사유 입력 ('의심 거래') → '거절 확인'",
      "expected": "모달 닫힘, 목록 새로고침, 성공 토스트 ('출금이 거절되었습니다. 잔액이 복원됩니다.')",
      "dbCheck": "WITHDRAWAL_REQUEST(status=REJECTED, reject_reason='의심 거래', processed_by=어드민ID, processed_at NOT NULL), WALLET_BALANCE(reward_ton+=5), USERS(level 복원 확인), TRANSACTION(status=CANCELLED), ADMIN_ACTIVITY_LOG(action_type=WITHDRAWAL_REJECT)"
    },
    {
      "id": "WM-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "DEPOSIT 출금 거절 성공 (depositTon 복원, 레벨 무관)",
      "precondition": "PENDING 상태, source=DEPOSIT, amountTon=10, 사용자 현재 depositTon=0 (출금 요청 시 차감됨)",
      "action": "'거절' 클릭 → 거절 모달에서 사유 입력 ('주소 확인 필요') → '거절 확인'",
      "expected": "모달 닫힘, 목록 새로고침, 성공 토스트",
      "dbCheck": "WITHDRAWAL_REQUEST(status=REJECTED, reject_reason='주소 확인 필요'), WALLET_BALANCE(deposit_ton+=10), TRANSACTION(status=CANCELLED), ADMIN_ACTIVITY_LOG(action_type=WITHDRAWAL_REJECT)"
    },
    {
      "id": "WM-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "FAILED 건 재시도 승인 성공",
      "precondition": "FAILED 상태 출금 요청 존재 (이전 블록체인 전송 실패)",
      "action": "FAILED 탭 → 해당 건 '재시도' 클릭 → 확인 팝업 '확인'",
      "expected": "상태 PROCESSING → COMPLETED 변경, txHash 갱신",
      "dbCheck": "WITHDRAWAL_REQUEST(status=COMPLETED, tx_hash NOT NULL, used_seqno NOT NULL), TRANSACTION(status=COMPLETED), ADMIN_ACTIVITY_LOG(action_type=WITHDRAWAL_APPROVE)"
    },
    {
      "id": "WM-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "출금 상세 조회 (PENDING 건)",
      "precondition": "PENDING 상태 출금 요청 존재",
      "action": "목록에서 항목 클릭",
      "expected": "상세 모달: 사용자 정보(serviceName, telegramUsername, Level), 출금 정보(금액, 수수료, 순금액, 출처, 지갑주소 전체), 처리 정보 비어있음, 하단 '승인'/'거절' 버튼",
      "dbCheck": "WITHDRAWAL_REQUEST(id=선택건) JOIN USERS 조회 확인"
    },
    {
      "id": "WM-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "출금 상세 조회 (COMPLETED 건)",
      "precondition": "COMPLETED 상태 출금 요청 존재",
      "action": "COMPLETED 탭 → 항목 클릭",
      "expected": "상세 모달: 처리 정보(처리자, 처리일, txHash + 블록체인 탐색기 링크), 액션 버튼 없음",
      "dbCheck": "WITHDRAWAL_REQUEST(id=선택건, status=COMPLETED, tx_hash NOT NULL) 조회 확인"
    },
    {
      "id": "WM-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 상태 필터 전환",
      "precondition": "각 상태별 출금 요청 존재",
      "action": "전체 → PENDING → PROCESSING → COMPLETED → FAILED → REJECTED → CANCELLED 순서로 탭 전환",
      "expected": "각 탭 선택 시 해당 상태 건만 표시, 건수 정확",
      "dbCheck": "WITHDRAWAL_REQUEST(status=각 상태) COUNT 일치 확인"
    },
    {
      "id": "WM-N-011",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "승인 시 Telegram 알림 발송 확인 (COMPLETED)",
      "precondition": "PENDING 상태, 사용자 allowsWriteToPm=true, 알림 설정 WITHDRAWAL_UPDATE=ON",
      "action": "'승인' 클릭 → 확인 → 전송 성공",
      "expected": "사용자에게 Telegram DM 알림 발송 (출금 완료 안내)",
      "dbCheck": "WITHDRAWAL_REQUEST(status=COMPLETED), 알림 발송 로그 확인"
    },
    {
      "id": "WM-N-012",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "거절 시 Telegram 알림 발송 확인",
      "precondition": "PENDING 상태, 사용자 allowsWriteToPm=true, 알림 설정 WITHDRAWAL_UPDATE=ON",
      "action": "'거절' 클릭 → 사유 입력 → '거절 확인'",
      "expected": "사용자에게 Telegram DM 알림 발송 (출금 거절 안내 + 사유)",
      "dbCheck": "WITHDRAWAL_REQUEST(status=REJECTED), 알림 발송 로그 확인"
    },
    {
      "id": "WM-N-013",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "페이지네이션 동작 확인",
      "precondition": "전체 출금 요청 21건 이상 존재 (size=20 기준)",
      "action": "전체 탭 → 하단 페이지 2 클릭",
      "expected": "2페이지 목록 표시, 페이지 번호 활성 상태 변경",
      "dbCheck": "WITHDRAWAL_REQUEST 전체 COUNT >= 21 확인"
    },
    {
      "id": "WM-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "승인 실패 — 블록체인 전송 실패",
      "precondition": "PENDING 상태, 블록체인 네트워크 불안정 또는 서비스 지갑 잔액 부족",
      "action": "'승인' 클릭 → 확인 팝업 '확인'",
      "expected": "에러 토스트 ('승인 처리에 실패했습니다. 다시 시도해주세요.'), 해당 건 상태 FAILED로 변경",
      "dbCheck": "WITHDRAWAL_REQUEST(status=FAILED, processed_by=어드민ID), TRANSACTION(status=FAILED, fail_reason NOT NULL)"
    },
    {
      "id": "WM-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "거절 실패 — 사유 미입력",
      "precondition": "PENDING 상태 건 존재",
      "action": "'거절' 클릭 → 거절 모달에서 사유 비워둠 → '거절 확인' 버튼 확인",
      "expected": "'거절 확인' 버튼 비활성 상태 유지 (클릭 불가)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WM-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "거절 실패 — 사유 500자 초과",
      "precondition": "PENDING 상태 건 존재",
      "action": "'거절' 클릭 → 501자 이상 입력 시도",
      "expected": "500자에서 입력 차단 또는 글자 수 카운터 경고, API 호출 시 400 에러",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WM-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "이미 처리된 건 승인 시도 (동시 처리 충돌)",
      "precondition": "다른 어드민이 이미 해당 건을 승인/거절 처리 완료",
      "action": "해당 건 '승인' 클릭 → 확인 팝업 '확인'",
      "expected": "에러 토스트 ('이미 처리된 요청입니다.') + 목록 자동 새로고침",
      "dbCheck": "WITHDRAWAL_REQUEST(status!=PENDING) 확인 (이미 변경됨)"
    },
    {
      "id": "WM-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "이미 처리된 건 거절 시도",
      "precondition": "다른 어드민이 이미 해당 건을 승인 처리 완료",
      "action": "해당 건 '거절' 클릭 → 사유 입력 → '거절 확인'",
      "expected": "에러 토스트 ('이미 처리된 요청입니다.') + 목록 자동 새로고침",
      "dbCheck": "WITHDRAWAL_REQUEST(status!=PENDING) 확인 (이미 변경됨)"
    },
    {
      "id": "WM-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "목록 조회 API 실패",
      "precondition": "서버 오류 또는 네트워크 단절",
      "action": "출금 관리 화면 진입",
      "expected": "목록 영역에 '데이터를 불러올 수 없습니다.' + 재시도 버튼 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WM-E-007",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 자동 리다이렉트",
      "precondition": "JWT 토큰 만료 (2시간 경과)",
      "action": "출금 관리 화면에서 아무 API 호출 (목록 조회, 승인, 거절 등)",
      "expected": "로그인 화면으로 자동 리다이렉트",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WM-E-008",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "빈 상태 — 해당 필터에 건 없음",
      "precondition": "PROCESSING 상태 출금 요청 0건",
      "action": "PROCESSING 탭 선택",
      "expected": "'해당 상태의 출금 요청이 없습니다.' 안내 메시지 표시",
      "dbCheck": "WITHDRAWAL_REQUEST(status=PROCESSING) COUNT=0 확인"
    },
    {
      "id": "WM-E-009",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "FAILED 재시도 시 이중 전송 방지 (seqno 검증)",
      "precondition": "FAILED 상태, usedSeqno=10, 현재 블록체인 seqno=11 (이전 전송이 실제 처리됨)",
      "action": "FAILED 건 '재시도' 클릭 → 확인",
      "expected": "이중 전송 방지 로직 작동, 상태 COMPLETED로 변경 (실제 재전송 없이 seqno 검증으로 완료 처리)",
      "dbCheck": "WITHDRAWAL_REQUEST(status=COMPLETED, tx_hash='seqno-verified:10'), TRANSACTION(status=COMPLETED)"
    },
    {
      "id": "WM-E-010",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "REWARD 출금 거절 시 레벨 복원 확인",
      "precondition": "source=REWARD, amountTon=30, 거절 전 rewardTon=0 (차감됨), 거절 후 rewardTon=30 → Level 5 복원 예상",
      "action": "'거절' → 사유 입력 → '거절 확인'",
      "expected": "거절 성공, 사용자 레벨 Level 5로 복원 확인",
      "dbCheck": "WALLET_BALANCE(reward_ton=30.0000), USERS(level=5), WITHDRAWAL_REQUEST(status=REJECTED)"
    },
    {
      "id": "WM-E-011",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "승인 확인 팝업에서 취소",
      "precondition": "PENDING 상태 건 존재",
      "action": "'승인' 클릭 → 확인 팝업 '취소'",
      "expected": "팝업 닫힘, 아무 변경 없음, 목록 유지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WM-E-012",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "거절 모달에서 취소",
      "precondition": "PENDING 상태 건 존재",
      "action": "'거절' 클릭 → 거절 모달 '취소' 버튼",
      "expected": "모달 닫힘, 아무 변경 없음",
      "dbCheck": "변경 없음"
    },
    {
      "id": "WM-E-013",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "CANCELLED 건 상세 조회 (사용자 취소)",
      "precondition": "CANCELLED 상태 출금 요청 존재 (사용자가 직접 취소)",
      "action": "CANCELLED 탭 → 항목 클릭",
      "expected": "상세 모달: 상태 CANCELLED 표시, 처리 정보 없음, 액션 버튼 없음",
      "dbCheck": "WITHDRAWAL_REQUEST(id=선택건, status=CANCELLED) 조회 확인"
    },
    {
      "id": "WM-E-014",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "지갑 주소 스냅샷 확인 (사용자 지갑 변경 후)",
      "precondition": "출금 요청 시점 지갑주소=A, 이후 사용자가 지갑 변경하여 현재 USERS.ton_wallet_address=B",
      "action": "해당 건 상세 조회",
      "expected": "상세 모달에 요청 시점 지갑주소 A 표시 (현재 주소 B가 아님)",
      "dbCheck": "WITHDRAWAL_REQUEST(wallet_address=A), USERS(ton_wallet_address=B) 불일치 확인"
    }
  ]
};

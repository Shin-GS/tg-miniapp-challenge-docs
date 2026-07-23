// QA Test Data — Biz 주문 관리 (admin/biz-order-management)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "Biz 주문 관리",
  "screen": "biz-order-management",
  "lastUpdated": "2026-07-14",
  "priority": "high",
  "cases": [
    {
      "id": "ABIZ-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Biz 주문 목록 조회 — 전체 주문 표시",
      "precondition": "어드민 로그인, BizOrder 5건 존재 (다양한 상태)",
      "action": "사이드바 'Biz 주문 관리' 메뉴 클릭",
      "expected": "주문 목록 테이블 표시: 주문ID, 서비스, 타겟계정, 수량, 기간, Stars, 상태, 결제일. 최신순 정렬.",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "상태별 필터 — PENDING_REVIEW만 조회",
      "precondition": "BizOrder 여러 상태 혼합",
      "action": "상태 필터에서 '검수 대기' 선택",
      "expected": "PENDING_REVIEW 상태 주문만 표시, 다른 상태 숨김",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "주문 상세 모달 — 검수 대기 주문 정보 표시",
      "precondition": "PENDING_REVIEW 상태 BizOrder 존재",
      "action": "주문 행 클릭 → 상세 모달 열기",
      "expected": "서비스, 타겟계정, 수량, 기간, Stars금액, 결제일, 주문자(serviceName+telegramUsername) 표시. 승인/거절 버튼 노출.",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "주문 승인 — 챌린지 자동 생성 확인",
      "precondition": "PENDING_REVIEW 상태 BizOrder (Instagram Followers, @test_account, 100명, 4주)",
      "action": "상세 모달에서 '승인' 버튼 클릭 → 확인",
      "expected": "승인 성공 메시지, 상태 ACTIVE 변경, 챌린지 ID 할당 표시",
      "dbCheck": "BIZ_ORDER(status=ACTIVE, approvedAt NOT NULL, challengeId NOT NULL). CHALLENGE 생성(type=EVENT, title='Follow @test_account on Instagram', maxParticipants=120, fixedRewardTon=0.03, scheduleType=RELATIVE_DAYS)"
    },
    {
      "id": "ABIZ-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "주문 거절 — 거절 사유 입력 + Stars 환불",
      "precondition": "PENDING_REVIEW 상태 BizOrder",
      "action": "상세 모달에서 '거절' 버튼 클릭 → 사유 'Inappropriate account content' 입력 → 확인",
      "expected": "거절 성공 메시지, 상태 REJECTED, Stars 환불 처리",
      "dbCheck": "BIZ_ORDER(status=REJECTED, rejectReason='Inappropriate account content'), Stars refund API 호출"
    },
    {
      "id": "ABIZ-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "ACTIVE 주문 상세 — 진행률 표시",
      "precondition": "ACTIVE 상태 BizOrder, 챌린지 참여 32/120명",
      "action": "ACTIVE 주문 행 클릭 → 상세 모달",
      "expected": "진행률 표시: 32/100 confirmed (quantity 기준), 챌린지 링크 제공, 승인/거절 버튼 미표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "COMPLETED 주문 상세 — 최종 결과 표시",
      "precondition": "COMPLETED 상태 BizOrder, 정산 완료",
      "action": "COMPLETED 주문 행 클릭 → 상세 모달",
      "expected": "최종 결과: retained 수, 완료일 표시. 액션 버튼 없음.",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "수동 완료 처리 — ACTIVE 주문을 강제 완료",
      "precondition": "ACTIVE 상태 BizOrder, 모집 미달 상태로 장기간 방치",
      "action": "상세 모달에서 '수동 완료' 버튼 클릭 → 확인",
      "expected": "상태 COMPLETED 변경, 연결 챌린지 비활성화(active=false)",
      "dbCheck": "BIZ_ORDER(status=COMPLETED, completedAt NOT NULL), CHALLENGE(active=false)"
    },
    {
      "id": "ABIZ-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "서비스 타입별 필터 — Instagram Followers만 조회",
      "precondition": "여러 서비스 타입 BizOrder 존재",
      "action": "서비스 필터에서 'Instagram Followers' 선택",
      "expected": "INSTAGRAM_FOLLOWERS 주문만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "주문 목록 페이지네이션",
      "precondition": "BizOrder 30건 이상",
      "action": "페이지 2 이동",
      "expected": "다음 페이지 데이터 정상 로드, 페이지 번호 표시 정확",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-N-011",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "승인 시 운영 알림 발송 확인",
      "precondition": "PENDING_REVIEW BizOrder 승인 처리",
      "action": "승인 후 운영 채널 확인",
      "expected": "운영 채널에 '✅ Biz 승인 — @account (챌린지 #{id} 생성)' 메시지 발송",
      "dbCheck": "변경 없음 (Telegram 채널 메시지 확인)"
    },
    {
      "id": "ABIZ-N-012",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "거절 시 운영 알림 발송 확인",
      "precondition": "PENDING_REVIEW BizOrder 거절 처리",
      "action": "거절 후 운영 채널 확인",
      "expected": "운영 채널에 '❌ Biz 거절 — @account (사유: xxx, 환불 처리)' 메시지 발송",
      "dbCheck": "변경 없음 (Telegram 채널 메시지 확인)"
    },
    {
      "id": "ABIZ-N-013",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Likes 주문 승인 — 챌린지 생성 확인 (1주기, 3일)",
      "precondition": "PENDING_REVIEW, Instagram Likes, https://instagram.com/p/ABC123, 200건",
      "action": "승인 클릭 → 확인",
      "expected": "챌린지 생성 확인: periodCount=1, verificationPeriodDays=3, durationDays=3",
      "dbCheck": "CHALLENGE(type=EVENT, verificationPeriodDays=3, periodCount=1, requiredVerifications=1, externalUrl='https://instagram.com/p/ABC123')"
    },
    {
      "id": "ABIZ-N-014",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "CANCELLED 주문 표시 — 비즈니스 고객 취소 건",
      "precondition": "CANCELLED 상태 BizOrder (비즈니스 고객 취소)",
      "action": "주문 목록에서 CANCELLED 상태 건 확인",
      "expected": "CANCELLED 뱃지 표시, 취소 시각 표시, 환불 완료 상태 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-N-015",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "REJECTED 주문 표시 — 거절 사유 확인",
      "precondition": "REJECTED 상태 BizOrder",
      "action": "주문 행 클릭 → 상세 확인",
      "expected": "거절 사유(rejectReason) 표시, 환불 완료 상태 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "거절 사유 미입력 시 거절 불가",
      "precondition": "PENDING_REVIEW 상태 BizOrder 상세 모달",
      "action": "'거절' 클릭 → 사유 빈 상태로 확인 시도",
      "expected": "거절 사유 필수 안내, 거절 처리 안 됨",
      "dbCheck": "BIZ_ORDER(status=PENDING_REVIEW 유지)"
    },
    {
      "id": "ABIZ-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "이미 처리된 주문 재승인 시도 (ACTIVE → 승인)",
      "precondition": "ACTIVE 상태 BizOrder",
      "action": "API 직접 호출로 approve 시도",
      "expected": "400 에러 (이미 처리된 주문)",
      "dbCheck": "BIZ_ORDER(status=ACTIVE 유지)"
    },
    {
      "id": "ABIZ-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "존재하지 않는 주문 ID로 승인 시도",
      "precondition": "어드민 로그인",
      "action": "API: POST /api/admin/v1/biz/orders/99999/approve",
      "expected": "404 또는 400 에러",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "COMPLETED 주문 수동 완료 시도 (이미 완료됨)",
      "precondition": "COMPLETED 상태 BizOrder",
      "action": "API: POST /api/admin/v1/biz/orders/{id}/complete",
      "expected": "400 에러 (이미 COMPLETED)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ABIZ-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "PENDING_REVIEW 주문 수동 완료 시도 (ACTIVE가 아님)",
      "precondition": "PENDING_REVIEW 상태 BizOrder",
      "action": "API: POST /api/admin/v1/biz/orders/{id}/complete",
      "expected": "400 에러 (ACTIVE 상태만 수동 완료 가능)",
      "dbCheck": "변경 없음"
    }
  ]
};

// QA Test Data — 거래 내역 (transaction-history)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "거래 내역",
  "screen": "transaction-history",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "TH-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 거래 목록 조회 (필터 미적용)",
      "precondition": "거래 데이터 1건 이상 존재",
      "action": "사이드바 '거래 내역' 클릭",
      "expected": "전체 거래 최신순 20건 표시 (일시, 사용자, 유형 뱃지+설명, 금액 부호+색상, 수수료, 잔액 변동, 상태 뱃지), 페이지네이션",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "사용자 ID 필터 적용",
      "precondition": "특정 사용자의 거래 존재",
      "action": "사용자 ID 필드에 '1' 입력 → 검색",
      "expected": "userId=1인 거래만 표시, 결과 건수 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "유형 그룹 필터 — 충전만 선택",
      "precondition": "PURCHASE 거래 존재",
      "action": "유형 그룹 멀티셀렉트에서 '충전' 체크 → 검색",
      "expected": "PURCHASE 유형 거래만 표시, [충전] 뱃지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "유형 그룹 필터 — 챌린지 그룹 선택",
      "precondition": "DEPOSIT_LOCK, REWARD, PENALTY, HIDE_FEE 거래 존재",
      "action": "유형 그룹에서 '챌린지' 체크 → 검색",
      "expected": "DEPOSIT_LOCK, REWARD, PENALTY, HIDE_FEE 유형 거래 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "기간 프리셋 — 오늘",
      "precondition": "오늘 날짜의 거래 존재",
      "action": "기간 프리셋 '오늘' 클릭 → 검색",
      "expected": "오늘 날짜 거래만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "기간 커스텀 — 날짜 범위 지정",
      "precondition": "거래 데이터 존재",
      "action": "기간 '커스텀' 클릭 → 시작일/종료일 입력 → 검색",
      "expected": "해당 기간 내 거래만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "상태 필터 — FAILED만 조회",
      "precondition": "FAILED 상태 거래 존재",
      "action": "상태 필터에서 'FAILED' 선택 → 검색",
      "expected": "FAILED 상태 거래만 표시, 빨간 뱃지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "거래 상세 모달 — 행 클릭",
      "precondition": "거래 목록 표시 상태",
      "action": "테이블 행 클릭",
      "expected": "상세 모달 표시 (Transaction ID, 유형, 상태, 사용자, 금액, 수수료, 실수령, 잔액 변동, 참조 ID, 설명, TX Hash, 멱등성 키, 생성일시)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "TX Hash 복사",
      "precondition": "상세 모달 열림, TX Hash 존재",
      "action": "TX Hash 복사 버튼 클릭",
      "expected": "클립보드에 복사 + 토스트 알림",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "사용자 상세에서 진입 — userId 자동 필터",
      "precondition": "사용자 상세 화면에서 '거래 내역 보기' 클릭",
      "action": "사용자 상세 → '거래 내역 보기' 버튼 클릭",
      "expected": "거래 내역 화면 진입, 사용자 ID 필터 자동 적용, 해당 사용자 거래만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-011",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "필터 초기화",
      "precondition": "필터 적용 상태",
      "action": "초기화 버튼 클릭",
      "expected": "모든 필터 해제, 전체 거래 최신순 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-N-012",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "사용자 ID 클릭 시 사용자 상세 이동",
      "precondition": "거래 목록 표시 상태",
      "action": "테이블의 사용자 ID 클릭",
      "expected": "사용자 관리 화면 해당 사용자 상세로 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "필터 결과 없음 (빈 상태)",
      "precondition": "필터 조건에 맞는 거래 0건",
      "action": "필터 적용 후 검색",
      "expected": "'조건에 맞는 거래 내역이 없습니다' 메시지 + 초기화 유도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "커스텀 기간 — 종료일 < 시작일",
      "precondition": "커스텀 기간 선택 상태",
      "action": "시작일: 2026-06-01, 종료일: 2026-05-01 입력",
      "expected": "검색 버튼 비활성 또는 인라인 에러",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "API 호출 실패 (500)",
      "precondition": "서버 오류",
      "action": "거래 내역 진입 또는 검색",
      "expected": "'거래 내역을 불러오는 데 실패했습니다' + 재시도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "TH-E-004",
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
      "id": "TH-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "상세 모달 — FAILED 거래 실패 사유 표시",
      "precondition": "FAILED 상태 거래 존재",
      "action": "FAILED 거래 행 클릭",
      "expected": "상세 모달에 '실패 사유' 필드 표시",
      "dbCheck": "변경 없음"
    }
  ]
};

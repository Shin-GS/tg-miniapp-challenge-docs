// QA Test Data — 활동 로그 (activity-log)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "활동 로그",
  "screen": "activity-log",
  "lastUpdated": "2026-05-21",
  "priority": "low",
  "cases": [
    {
      "id": "AG-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "활동 로그 목록 조회 (필터 미적용)",
      "precondition": "어드민 행위 기록 1건 이상 존재",
      "action": "사이드바 '활동 로그' 클릭",
      "expected": "전체 활동 로그 최신순 표시 (ID, 어드민명, 행위 유형 배지, 대상 유형, 대상 ID, 상세 내용, IP 주소, 시각), 페이지네이션",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AG-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "행위 유형 필터 — BAN_USER만 조회",
      "precondition": "BAN_USER 행위 기록 존재",
      "action": "행위 유형 필터에서 'BAN_USER' 선택",
      "expected": "BAN_USER 행위만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AG-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "대상 유형 필터 — WITHDRAWAL_REQUEST만 조회",
      "precondition": "WITHDRAWAL_REQUEST 대상 기록 존재",
      "action": "대상 유형 필터에서 'WITHDRAWAL_REQUEST' 선택",
      "expected": "대상이 WITHDRAWAL_REQUEST인 로그만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AG-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "필터 조합 — 행위 유형 + 대상 유형 AND 조건",
      "precondition": "다양한 행위/대상 기록 존재",
      "action": "행위 유형: APPROVE_WITHDRAWAL + 대상 유형: WITHDRAWAL_REQUEST 선택",
      "expected": "두 조건 모두 만족하는 로그만 표시 (AND 조건)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AG-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "페이지네이션 — 다음 페이지 이동",
      "precondition": "활동 로그 20건 초과",
      "action": "페이지 2 클릭",
      "expected": "21~40번째 로그 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AG-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "읽기 전용 확인 — 수정/삭제 불가",
      "precondition": "활동 로그 목록 표시",
      "action": "UI 확인",
      "expected": "수정/삭제 버튼 없음, 행 클릭 시 편집 모드 없음 (append-only)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AG-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "IP 주소 기록 확인",
      "precondition": "어드민 행위 수행 후 활동 로그 확인",
      "action": "활동 로그 목록에서 최근 기록 확인",
      "expected": "IP 주소 컬럼에 클라이언트 IP 표시",
      "dbCheck": "ADMIN_ACTIVITY_LOG(ip_address IS NOT NULL)"
    },
    {
      "id": "AG-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "필터 결과 없음 (빈 상태)",
      "precondition": "선택한 필터에 해당하는 로그 0건",
      "action": "필터 적용",
      "expected": "'해당 조건의 활동 로그가 없습니다.' 안내 메시지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AG-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "목록 API 호출 실패",
      "precondition": "서버 오류 또는 네트워크 단절",
      "action": "활동 로그 진입",
      "expected": "'데이터를 불러올 수 없습니다.' + 재시도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AG-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 자동 리다이렉트",
      "precondition": "JWT 2시간 만료",
      "action": "API 호출 시 401 응답",
      "expected": "로그인 화면으로 자동 이동",
      "dbCheck": "변경 없음"
    }
  ]
};

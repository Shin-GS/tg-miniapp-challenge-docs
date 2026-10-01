// QA Test Data — 공지사항 관리 (notice-management)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "공지사항 관리",
  "screen": "notice-management",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "NM-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공지 목록 조회 (기본 상태)",
      "precondition": "공지사항 1건 이상 존재",
      "action": "사이드바 '공지사항' 클릭",
      "expected": "전체 공지 목록 표시 (ID, 유형 배지, 제목, 활성 토글, 기간, 생성일), 최신순 정렬",
      "dbCheck": "변경 없음"
    },
    {
      "id": "NM-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "필터 — 활성 공지만 조회",
      "precondition": "활성/비활성 공지 혼재",
      "action": "필터에서 '활성' 선택",
      "expected": "active=true인 공지만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "NM-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공지 생성 — GENERAL 유형",
      "precondition": "공지사항 관리 화면 진입",
      "action": "'공지 생성' 클릭 → 유형: GENERAL → 제목 입력 → 내용 입력 → 시작일/종료일 설정 → 활성 ON → '생성' 클릭",
      "expected": "성공 토스트 '공지가 생성되었습니다.', 모달 닫힘, 목록에 새 공지 표시",
      "dbCheck": "NOTICE(type=GENERAL, title=입력값, content=입력값, active=true, starts_at/ends_at 설정), ADMIN_ACTIVITY_LOG(action=CREATE, target_type=NOTICE)"
    },
    {
      "id": "NM-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공지 생성 — MAINTENANCE 유형",
      "precondition": "공지사항 관리 화면 진입",
      "action": "'공지 생성' → 유형: MAINTENANCE → 필수 필드 입력 → 생성",
      "expected": "성공 토스트, 목록에 MAINTENANCE 배지 공지 표시",
      "dbCheck": "NOTICE(type=MAINTENANCE)"
    },
    {
      "id": "NM-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공지 생성 — EVENT 유형",
      "precondition": "공지사항 관리 화면 진입",
      "action": "'공지 생성' → 유형: EVENT → 필수 필드 입력 → 생성",
      "expected": "성공 토스트, 목록에 EVENT 배지 공지 표시",
      "dbCheck": "NOTICE(type=EVENT)"
    },
    {
      "id": "NM-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공지 수정",
      "precondition": "공지 1건 이상 존재",
      "action": "목록에서 공지 행 클릭 → 제목 수정 → '저장' 클릭",
      "expected": "성공 토스트 '공지가 수정되었습니다.', 모달 닫힘, 목록에 수정된 제목 반영",
      "dbCheck": "NOTICE(title=수정값, updated_at 갱신), ADMIN_ACTIVITY_LOG(action=UPDATE, target_type=NOTICE)"
    },
    {
      "id": "NM-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 상태 토글 (활성 → 비활성)",
      "precondition": "활성 공지 존재",
      "action": "활성 토글 클릭 → 확인 팝업 → 확인",
      "expected": "토글 비활성으로 변경, Mini App 공지 목록에서 미노출",
      "dbCheck": "NOTICE(active=false), ADMIN_ACTIVITY_LOG(action=TOGGLE_ACTIVE, target_type=NOTICE)"
    },
    {
      "id": "NM-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 상태 토글 (비활성 → 활성)",
      "precondition": "비활성 공지 존재, 현재 시각이 starts_at~ends_at 범위 내",
      "action": "활성 토글 클릭 → 확인 팝업 → 확인",
      "expected": "토글 활성으로 변경, Mini App 공지 목록에 노출",
      "dbCheck": "NOTICE(active=true)"
    },
    {
      "id": "NM-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "필수 필드 미입력 상태에서 생성 시도",
      "precondition": "생성 모달 열린 상태",
      "action": "제목 미입력 상태에서 '생성' 클릭",
      "expected": "'생성' 버튼 비활성 (필수 필드 미입력)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "NM-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "종료일 < 시작일 설정",
      "precondition": "생성/수정 모달 열린 상태",
      "action": "시작일: 2026-06-01, 종료일: 2026-05-01 설정",
      "expected": "인라인 에러 '종료일은 시작일 이후여야 합니다.'",
      "dbCheck": "변경 없음"
    },
    {
      "id": "NM-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "제목 200자 초과 입력",
      "precondition": "생성 모달 열린 상태",
      "action": "제목에 201자 이상 입력",
      "expected": "입력 제한 또는 유효성 에러 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "NM-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "빈 상태 (공지 0건)",
      "precondition": "공지사항 0건 또는 필터 결과 0건",
      "action": "공지사항 관리 진입",
      "expected": "'공지사항이 없습니다.' 안내 메시지, '공지 생성' 버튼 활성",
      "dbCheck": "변경 없음"
    },
    {
      "id": "NM-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 토글 API 실패",
      "precondition": "서버 오류",
      "action": "활성 토글 클릭 → 확인",
      "expected": "에러 토스트 '상태 변경에 실패했습니다.', 토글 원래 상태 복원",
      "dbCheck": "NOTICE(active 변경 없음)"
    },
    {
      "id": "NM-E-006",
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

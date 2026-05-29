// QA Test Data — 공지 목록 (notice-list)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "공지 목록",
  "screen": "notice-list",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "NL-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 공지 목록 정상 표시 (페이지당 5건)",
      "precondition": "active=true, starts_at <= now, ends_at >= now인 공지가 6건 이상 존재",
      "action": "공지 목록 화면 진입",
      "expected": "첫 페이지에 5건 표시, 페이지네이션 표시",
      "dbCheck": "NOTICE(active=true, starts_at <= NOW, ends_at >= NOW) 조회 확인"
    },
    {
      "id": "NL-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "아코디언 방식 상세 펼침",
      "precondition": "공지 목록 표시 상태",
      "action": "공지 카드 탭",
      "expected": "해당 공지의 상세 내용(content) 아코디언으로 펼쳐짐",
      "dbCheck": "변경 없음"
    },
    {
      "id": "NL-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "GENERAL 유형 공지 스타일 확인",
      "precondition": "notice_type=GENERAL인 공지 존재",
      "action": "공지 목록 화면 진입",
      "expected": "GENERAL 공지에 neutral 스타일 적용 (기본 색상)",
      "dbCheck": "NOTICE(notice_type=GENERAL) 확인"
    },
    {
      "id": "NL-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "MAINTENANCE 유형 공지 스타일 확인",
      "precondition": "notice_type=MAINTENANCE인 공지 존재",
      "action": "공지 목록 화면 진입",
      "expected": "MAINTENANCE 공지에 warning 스타일 적용 (경고 색상/아이콘)",
      "dbCheck": "NOTICE(notice_type=MAINTENANCE) 확인"
    },
    {
      "id": "NL-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "EVENT 유형 공지 스타일 확인",
      "precondition": "notice_type=EVENT인 공지 존재",
      "action": "공지 목록 화면 진입",
      "expected": "EVENT 공지에 info 스타일 적용 (이벤트 색상/아이콘)",
      "dbCheck": "NOTICE(notice_type=EVENT) 확인"
    },
    {
      "id": "NL-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "페이지네이션 동작 확인",
      "precondition": "활성 공지 6건 이상",
      "action": "다음 페이지 버튼 탭",
      "expected": "2페이지 공지 표시 (최대 5건), 페이지 번호 변경",
      "dbCheck": "변경 없음"
    },
    {
      "id": "NL-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 공지 0건일 때 빈 상태",
      "precondition": "노출 조건 충족 공지 0건",
      "action": "공지 목록 화면 진입",
      "expected": "빈 상태 메시지 표시 ('No notices')",
      "dbCheck": "NOTICE(active=true, starts_at <= NOW, ends_at >= NOW) COUNT = 0"
    },
    {
      "id": "NL-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "기간 만료 공지 미노출 확인",
      "precondition": "ends_at < now인 공지 존재",
      "action": "공지 목록 화면 진입",
      "expected": "해당 공지 목록에 미표시",
      "dbCheck": "NOTICE(ends_at < NOW) 해당 건 미노출 확인"
    },
    {
      "id": "NL-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "시작 전 공지 미노출 확인",
      "precondition": "starts_at > now인 공지 존재",
      "action": "공지 목록 화면 진입",
      "expected": "해당 공지 목록에 미표시",
      "dbCheck": "NOTICE(starts_at > NOW) 해당 건 미노출 확인"
    },
    {
      "id": "NL-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "비활성(active=false) 공지 미노출 확인",
      "precondition": "active=false인 공지 존재 (기간 내)",
      "action": "공지 목록 화면 진입",
      "expected": "해당 공지 목록에 미표시",
      "dbCheck": "NOTICE(active=false) 해당 건 미노출 확인"
    }
  ]
};

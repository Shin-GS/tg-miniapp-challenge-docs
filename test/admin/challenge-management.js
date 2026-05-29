// QA Test Data — 챌린지 관리 (challenge-management)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "챌린지 관리",
  "screen": "challenge-management",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "CM-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "챌린지 목록 조회 (필터 미적용)",
      "precondition": "챌린지 1건 이상 등록됨",
      "action": "사이드바 '챌린지 관리' 클릭",
      "expected": "전체 챌린지 목록 표시 (ID, 제목, 카테고리, 유형, 난이도, 참여자 수, 활성 상태, 생성일), 최신순 정렬",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "필터 적용 — 카테고리 + 유형 + 활성 상태",
      "precondition": "다양한 카테고리/유형의 챌린지 존재",
      "action": "카테고리 필터 선택 → 유형 REGULAR 선택 → 활성 '활성' 선택",
      "expected": "해당 조건에 맞는 챌린지만 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "챌린지 생성 — FIXED_PERIOD 유형",
      "precondition": "active 카테고리 1개 이상 존재",
      "action": "'챌린지 생성' 클릭 → 제목/설명/카테고리/유형(REGULAR)/난이도 입력 → 일정: FIXED_PERIOD + 시작일/종료일 → 인증 빈도/주기 → 예치금 범위 → 패널티(FIXED)/리워드율 → 가이드 텍스트 → 저장",
      "expected": "성공 토스트 '챌린지가 생성되었습니다.', 목록으로 이동, 새 챌린지 표시",
      "dbCheck": "CHALLENGE(title=입력값, schedule_type=FIXED_PERIOD, starts_at/ends_at 설정, active=true), ADMIN_ACTIVITY_LOG(action=CREATE, target_type=CHALLENGE)"
    },
    {
      "id": "CM-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "챌린지 생성 — RELATIVE_DAYS 유형",
      "precondition": "active 카테고리 1개 이상 존재",
      "action": "'챌린지 생성' 클릭 → 일정: RELATIVE_DAYS + 기간(30일) 입력 → 나머지 필수 필드 입력 → 저장",
      "expected": "성공 토스트, 목록에 새 챌린지 표시",
      "dbCheck": "CHALLENGE(schedule_type=RELATIVE_DAYS, duration_days=30)"
    },
    {
      "id": "CM-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "챌린지 수정 (활성 참여자 없음)",
      "precondition": "activeParticipants=0인 챌린지 존재",
      "action": "목록에서 챌린지 행 클릭 → 제목 수정 → 저장",
      "expected": "성공 토스트 '챌린지가 수정되었습니다.', 목록에 수정된 제목 반영",
      "dbCheck": "CHALLENGE(title=수정값), ADMIN_ACTIVITY_LOG(action=UPDATE, target_type=CHALLENGE)"
    },
    {
      "id": "CM-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "챌린지 활성 상태 토글 (활성 → 비활성)",
      "precondition": "활성 참여자 없는 활성 챌린지",
      "action": "활성 토글 클릭 → 확인 팝업 '활성 상태를 변경하시겠습니까?' → 확인",
      "expected": "토스트 '활성 상태가 변경되었습니다.', 토글 비활성 상태로 변경",
      "dbCheck": "CHALLENGE(active=false), ADMIN_ACTIVITY_LOG(action=TOGGLE_ACTIVE, target_type=CHALLENGE)"
    },
    {
      "id": "CM-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "카테고리 생성",
      "precondition": "카테고리 관리 탭 진입",
      "action": "'카테고리 추가' 클릭 → 이름(영문) + 노출명(한글) + 아이콘 + 정렬 순서 입력 → 저장",
      "expected": "성공 토스트, 카테고리 목록에 추가됨",
      "dbCheck": "CHALLENGE_CATEGORY(name=입력값, display_name=입력값, active=true)"
    },
    {
      "id": "CM-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "카테고리 활성 토글 (활성 → 비활성)",
      "precondition": "활성 카테고리 존재",
      "action": "카테고리 활성 토글 클릭",
      "expected": "토글 비활성으로 변경, 해당 카테고리로 신규 챌린지 생성 불가",
      "dbCheck": "CHALLENGE_CATEGORY(active=false)"
    },
    {
      "id": "CM-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "가이드 이미지 업로드",
      "precondition": "챌린지 생성/수정 폼 진입",
      "action": "'이미지 업로드' 버튼 클릭 → 이미지 파일 선택",
      "expected": "S3 업로드 성공, URL 텍스트박스에 URL 자동 세팅, 이미지 미리보기 표시",
      "dbCheck": "변경 없음 (S3에 이미지 저장)"
    },
    {
      "id": "CM-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "비활성 카테고리로 챌린지 생성 시도",
      "precondition": "카테고리 active=false",
      "action": "해당 카테고리 선택 → 챌린지 생성 시도",
      "expected": "에러 토스트 '비활성 카테고리에는 챌린지를 생성할 수 없습니다.' (400)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 참여자 있는 챌린지 수정 시도",
      "precondition": "activeParticipants > 0인 챌린지",
      "action": "목록에서 해당 챌린지 클릭",
      "expected": "폼 필드 비활성화 + 상단 경고 배너 '활성 참여자가 있어 수정할 수 없습니다.'",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 참여자 있는 챌린지 비활성화 시도",
      "precondition": "activeParticipants > 0인 활성 챌린지",
      "action": "활성 토글 클릭 → 확인",
      "expected": "에러 토스트 '활성 참여자가 있어 변경할 수 없습니다.' (400)",
      "dbCheck": "CHALLENGE(active=true 유지)"
    },
    {
      "id": "CM-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "카테고리 이름 중복 생성 시도",
      "precondition": "이미 'fitness' 카테고리 존재",
      "action": "카테고리 추가 → 이름 'fitness' 입력 → 저장",
      "expected": "에러 토스트 '이미 존재하는 카테고리명입니다.' (409)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "필수 필드 미입력 상태에서 챌린지 생성 시도",
      "precondition": "생성 폼 진입",
      "action": "제목 미입력 상태에서 저장 클릭",
      "expected": "해당 필드에 인라인 에러 메시지 표시, API 호출 안 함",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "목록 조회 빈 상태",
      "precondition": "등록된 챌린지 0건 또는 필터 결과 0건",
      "action": "챌린지 관리 진입 또는 필터 적용",
      "expected": "'등록된 챌린지가 없습니다.' 안내 메시지, '챌린지 생성' 버튼 유지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-E-007",
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

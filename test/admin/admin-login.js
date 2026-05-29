// QA Test Data — 로그인 (admin-login)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "로그인",
  "screen": "admin-login",
  "lastUpdated": "2026-05-21",
  "priority": "high",
  "cases": [
    {
      "id": "AL-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "정상 로그인 성공 (ID + Password + OTP)",
      "precondition": "유효한 어드민 계정 존재, OTP 앱 등록 완료",
      "action": "loginId 입력 → password 입력 → OTP 6자리 입력 → 로그인 버튼 클릭",
      "expected": "로딩 상태 표시 후 대시보드로 자동 이동, JWT localStorage 저장",
      "dbCheck": "ADMIN_USER(login_id 해시 일치), ADMIN_ACTIVITY_LOG(action=LOGIN 기록)"
    },
    {
      "id": "AL-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 로그인 화면 리다이렉트",
      "precondition": "JWT 발급 후 2시간 경과",
      "action": "대시보드 페이지 접근 시도",
      "expected": "로그인 화면으로 자동 리다이렉트",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "로그아웃 후 로그인 화면 표시",
      "precondition": "로그인 상태",
      "action": "로그아웃 버튼 클릭",
      "expected": "JWT 삭제, 로그인 화면 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Enter 키로 로그인 실행",
      "precondition": "유효한 어드민 계정 존재",
      "action": "모든 필드 입력 후 Enter 키 누름",
      "expected": "로그인 API 호출, 성공 시 대시보드 이동",
      "dbCheck": "ADMIN_USER(login_id 해시 일치)"
    },
    {
      "id": "AL-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잘못된 loginId로 로그인 시도",
      "precondition": "존재하지 않는 loginId",
      "action": "잘못된 loginId + 임의 password + OTP 입력 → 로그인 클릭",
      "expected": "에러 메시지: '아이디 또는 비밀번호가 올바르지 않습니다.' (401), 비밀번호 필드만 초기화",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잘못된 password로 로그인 시도",
      "precondition": "유효한 loginId, 잘못된 password",
      "action": "올바른 loginId + 잘못된 password + OTP 입력 → 로그인 클릭",
      "expected": "에러 메시지: '아이디 또는 비밀번호가 올바르지 않습니다.' (401), 비밀번호 필드만 초기화",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잘못된 OTP 코드로 로그인 시도",
      "precondition": "유효한 loginId + password, 잘못된 OTP",
      "action": "올바른 loginId + password + 잘못된 OTP 입력 → 로그인 클릭",
      "expected": "에러 메시지: 'OTP 코드가 올바르지 않습니다.' (401)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "만료된 OTP 코드 (30초 주기 초과)",
      "precondition": "유효한 loginId + password, 이전 주기의 OTP",
      "action": "30초 이상 지난 OTP 코드 입력 → 로그인 클릭",
      "expected": "에러 메시지: 'OTP 코드가 올바르지 않습니다.' (401)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "비활성화된 계정으로 로그인 시도",
      "precondition": "계정 status=DISABLED",
      "action": "올바른 loginId + password + OTP 입력 → 로그인 클릭",
      "expected": "에러 메시지: '비활성화된 계정입니다. 관리자에게 문의하세요.' (403)",
      "dbCheck": "ADMIN_USER(status=DISABLED 유지)"
    },
    {
      "id": "AL-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "필수 필드 미입력 상태에서 로그인 시도",
      "precondition": "로그인 화면 진입",
      "action": "아이디 또는 비밀번호 미입력 상태에서 로그인 버튼 클릭",
      "expected": "해당 필드 하단에 '필수 입력 항목입니다.' 인라인 에러, API 호출 안 함",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-E-007",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "네트워크 오류 시 로그인 시도",
      "precondition": "서버 다운 또는 네트워크 단절",
      "action": "모든 필드 입력 → 로그인 클릭",
      "expected": "에러 메시지: '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.', 재시도 가능",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-E-008",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "5회 연속 로그인 실패 시 계정 잠금",
      "precondition": "유효한 loginId, 잘못된 password로 5회 연속 실패",
      "action": "6번째 로그인 시도 (올바른 자격증명 포함)",
      "expected": "에러 메시지: '로그인 시도 횟수를 초과했습니다. 30분 후 다시 시도해주세요.' (423)",
      "dbCheck": "변경 없음 (인메모리 잠금)"
    },
    {
      "id": "AL-E-009",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잠금 상태에서 올바른 자격증명 입력",
      "precondition": "계정 잠금 상태 (5회 실패 후 30분 미경과)",
      "action": "올바른 loginId + password + OTP 입력 → 로그인 클릭",
      "expected": "에러 메시지: '로그인 시도 횟수를 초과했습니다. 30분 후 다시 시도해주세요.' (423), 로그인 차단",
      "dbCheck": "변경 없음"
    },
    {
      "id": "AL-E-010",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "30분 경과 후 잠금 해제 확인",
      "precondition": "계정 잠금 후 30분 경과",
      "action": "올바른 loginId + password + OTP 입력 → 로그인 클릭",
      "expected": "로그인 성공, 대시보드 이동",
      "dbCheck": "ADMIN_ACTIVITY_LOG(action=LOGIN 기록)"
    }
  ]
};

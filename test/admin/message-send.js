// QA Test Data — 메시지 발송 (message-send)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "메시지 발송",
  "screen": "message-send",
  "lastUpdated": "2026-06-18",
  "priority": "medium",
  "cases": [
    {
      "id": "MS-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 발송 탭 진입 — 대상 인원수 표시",
      "precondition": "어드민 JWT 유효, 사이드바 '메시지 발송' 클릭",
      "action": "전체 발송 탭 진입",
      "expected": "'📨 발송 대상: N명 (Bot DM 허용 사용자)' 표시, 메시지 입력 비어있음, 미리보기/발송 버튼 비활성",
      "dbCheck": "USERS(allowsWriteToPm=true, status=ACTIVE) COUNT 확인"
    },
    {
      "id": "MS-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 발송 — 챌린지 연결 드롭다운 선택",
      "precondition": "전체 발송 탭, active 챌린지 1개 이상 존재",
      "action": "챌린지 연결 드롭다운에서 챌린지 선택",
      "expected": "자동 버튼 미리보기 '[🚀 Join Challenge]' 표시, 수동 버튼 입력 필드 비활성(회색)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 발송 — 수동 버튼 입력 (챌린지 연결과 배타적)",
      "precondition": "전체 발송 탭, 챌린지 미선택 상태",
      "action": "버튼 텍스트 '더 알아보기' + URL 'https://example.com' 입력",
      "expected": "수동 버튼 미리보기 표시, 챌린지 드롭다운 초기화",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 발송 — 미리보기 발송 (이벤트 채널)",
      "precondition": "메시지 본문 입력 완료",
      "action": "'📱 미리보기' 버튼 클릭",
      "expected": "버튼 로딩 스피너 → 토스트 '테스트 메시지가 이벤트 채널로 발송되었습니다.', 이벤트 채널에서 메시지 확인 가능",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 발송 — 발송 확정 (SEND 입력 후 발송)",
      "precondition": "메시지 본문 입력 완료, 미리보기 확인 완료",
      "action": "'📨 발송하기' 클릭 → 확인 모달에서 'SEND' 입력 → '발송' 버튼 클릭",
      "expected": "모달 닫힘, 토스트 '메시지 발송이 시작되었습니다. 완료 시 이벤트 채널로 알림됩니다.', 폼 초기화",
      "dbCheck": "ADMIN_MESSAGE_LOG(sendType=BROADCAST, targetCount=N, sentBy=현재 어드민), ADMIN_ACTIVITY_LOG(actionType=SEND_MESSAGE)"
    },
    {
      "id": "MS-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "선택 발송 — 사용자 검색 및 선택",
      "precondition": "선택 발송 탭 진입",
      "action": "검색창에 serviceName 입력 → 결과에서 체크박스 클릭",
      "expected": "수신자 태그(chip) 추가, 메시지 작성 폼 활성화",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "선택 발송 — 사용자 관리에서 진입 (사용자 미리 선택)",
      "precondition": "사용자 관리 상세 화면",
      "action": "'메시지 보내기' 버튼 클릭",
      "expected": "메시지 발송 페이지 이동, 선택 발송 탭 활성, 해당 사용자가 수신자 태그에 미리 추가",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "선택 발송 — 발송 실행 (SEND 입력 불필요)",
      "precondition": "수신자 2명 선택 + 메시지 입력 완료",
      "action": "'📨 발송하기' 클릭 → 확인 모달 '발송' 버튼 클릭",
      "expected": "토스트 '메시지 발송이 시작되었습니다.', 폼 초기화",
      "dbCheck": "ADMIN_MESSAGE_LOG(sendType=SELECTED, targetCount=2, sentBy=현재 어드민)"
    },
    {
      "id": "MS-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "발송 이력 확인",
      "precondition": "발송 완료 후 이력 테이블 확인",
      "action": "페이지 하단 발송 이력 테이블 스크롤",
      "expected": "최근 발송 기록 표시 — 발송일시, 유형(전체/선택), 대상, 성공/실패, 메시지 요약",
      "dbCheck": "ADMIN_MESSAGE_LOG(최신 레코드 successCount + failureCount = targetCount)"
    },
    {
      "id": "MS-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "발송 완료 후 운영 알림 확인",
      "precondition": "전체 발송 완료 (비동기 처리 완료 대기)",
      "action": "Telegram 이벤트 채널 확인",
      "expected": "'📬 어드민 메시지 발송 완료' 알림 — 유형, 대상, 성공/실패 건수 표시",
      "dbCheck": "ADMIN_MESSAGE_LOG(successCount>0)"
    },
    {
      "id": "MS-N-011",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "수신자 태그 개별 제거 및 전체 해제",
      "precondition": "선택 발송 탭, 수신자 3명 선택 완료",
      "action": "1명 태그 ✕ 클릭 → '✕ 전체 해제' 클릭",
      "expected": "✕ 클릭 시 해당 1명 제거(2명 남음), 전체 해제 시 0명 + 메시지 폼 비활성",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "메시지 미입력 상태에서 발송 시도",
      "precondition": "메시지 본문 비어있음",
      "action": "발송/미리보기 버튼 확인",
      "expected": "'📱 미리보기' 및 '📨 발송하기' 버튼 비활성 유지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "수신자 미선택 상태 (선택 발송)",
      "precondition": "선택 발송 탭, 수신자 0명",
      "action": "메시지 작성 폼 확인",
      "expected": "메시지 작성 폼 비활성 + '수신자를 선택하세요' 안내 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "BANNED 사용자 선택 시도",
      "precondition": "선택 발송 탭, BANNED 상태 사용자가 검색 결과에 표시",
      "action": "BANNED 사용자의 체크박스 클릭 시도",
      "expected": "체크박스 비활성 + '❌ BANNED' 표시, 선택 불가",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "미리보기 발송 실패",
      "precondition": "이벤트 채널 발송 불가 (봇 미가입 등)",
      "action": "'📱 미리보기' 클릭",
      "expected": "토스트 '미리보기 발송에 실패했습니다.' (에러 스타일), 화면 유지, 재시도 가능",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "발송 API 호출 자체 실패 (네트워크/서버 에러)",
      "precondition": "발송 확정 과정에서 BE 500 응답",
      "action": "'발송' 클릭 → 서버 에러 발생",
      "expected": "토스트 '발송 요청에 실패했습니다. 다시 시도해주세요.' (에러 스타일), 폼 내용 유지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 로그인 리다이렉트",
      "precondition": "어드민 JWT 만료 (2시간 경과)",
      "action": "메시지 발송 페이지 진입 또는 발송 시도",
      "expected": "401 응답 → 로그인 화면으로 자동 리다이렉트",
      "dbCheck": "변경 없음"
    },
    {
      "id": "MS-E-007",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 발송 확인 모달에서 취소",
      "precondition": "전체 발송 확인 모달 표시 중",
      "action": "'취소' 버튼 클릭",
      "expected": "모달 닫힘, 화면 유지 (메시지 내용 보존), 발송 안 됨",
      "dbCheck": "변경 없음"
    }
  ]
};

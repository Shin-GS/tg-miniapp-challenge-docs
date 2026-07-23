// QA Test Data — 대시보드 (dashboard)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "대시보드",
  "screen": "dashboard",
  "lastUpdated": "2026-06-18",
  "priority": "medium",
  "cases": [
    {
      "id": "DB-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "대시보드 기본 진입 — 할 일 있음 + 통계 표시",
      "precondition": "로그인 완료, 출금 대기/이의제기/검토 필요 건 존재",
      "action": "로그인 성공 후 대시보드 자동 진입",
      "expected": "Todo Banner에 각 항목 카운트 표시, Stats Cards(전체 사용자/활성 사용자/활성 챌린지/오늘 인증), Revenue(월간 기본), 서비스 지갑 잔액, Top 10 랭킹 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "모두 처리 완료 상태 (할 일 0건)",
      "precondition": "출금 대기 0건, 이의제기 0건, 검토 필요 0건",
      "action": "대시보드 진입",
      "expected": "Todo Banner에 '✅ 모두 처리 완료' 표시, 나머지 섹션 정상 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "수익 통계 기간 변경 (DAILY → WEEKLY → MONTHLY → YEARLY)",
      "precondition": "대시보드 진입 완료",
      "action": "기간 선택 드롭다운에서 '일간' → '주간' → '월간' → '연간' 순서로 변경",
      "expected": "각 기간별 수입(구매수수료+패널티+숨기기+출금수수료), 지출(리워드+네트워크수수료), 순이익 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "서비스 지갑 잔액 조회",
      "precondition": "대시보드 진입 완료, TON 네트워크 정상",
      "action": "대시보드 진입 시 자동 조회",
      "expected": "서비스 지갑 TON 잔액 + 지갑 주소 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Top 10 랭킹 표시",
      "precondition": "랭킹 배치 실행 완료, 사용자 10명 이상",
      "action": "대시보드 진입",
      "expected": "Top 10 테이블 표시 (순위, 프로필 사진, serviceName, telegramUsername, 레벨, 완료 수, 최근 완료일), '매일 새벽 3시 갱신' 안내",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Top 100 랭킹 모달 열기",
      "precondition": "Top 10 랭킹 데이터 존재",
      "action": "'전체 보기 (Top 100)' 버튼 클릭",
      "expected": "모달 표시: 헤더 '🏆 Top 100 랭킹', 갱신 시각, 최대 100행 테이블 (1~3위 색상 강조), 스크롤 가능",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Todo 항목 클릭 시 해당 화면 이동",
      "precondition": "출금 대기 3건 존재",
      "action": "'출금 대기 3건' 클릭",
      "expected": "출금 관리 화면으로 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Top 100 모달에서 사용자 행 클릭 시 사용자 관리 이동",
      "precondition": "Top 100 모달 열린 상태",
      "action": "사용자 행 클릭",
      "expected": "사용자 관리 화면으로 이동 (해당 userId)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "overview API 호출 실패",
      "precondition": "서버 오류 또는 네트워크 단절",
      "action": "대시보드 진입",
      "expected": "Stats Cards + Todo Banner 영역에 '데이터를 불러올 수 없습니다.' + 재시도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "revenue API 호출 실패",
      "precondition": "서버 오류",
      "action": "기간 변경 시도",
      "expected": "Revenue 영역에 '수익 데이터를 불러올 수 없습니다.' + 재시도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "서비스 지갑 잔액 조회 실패",
      "precondition": "블록체인 조회 실패 (TON 네트워크 장애)",
      "action": "대시보드 진입",
      "expected": "서비스 지갑 잔액 영역에 '잔액 조회 실패' 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "랭킹 데이터 없음 (배치 미실행)",
      "precondition": "RankingScheduler 미실행 또는 ACTIVE 사용자 0명",
      "action": "대시보드 진입",
      "expected": "Top 10 랭킹 섹션에 '랭킹 데이터 없음' 표시, '전체 보기' 버튼 비활성",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 자동 리다이렉트",
      "precondition": "JWT 2시간 만료",
      "action": "대시보드 API 호출 시 401 응답",
      "expected": "로그인 화면으로 자동 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "DB-N-014",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "수익 통계에 이벤트 리워드(eventRewardPayouts) 별도 표시",
      "precondition": "EVENT 챌린지 정산 완료 건 존재 (EVENT_REWARD 타입 Transaction)",
      "action": "대시보드 Revenue 섹션 확인",
      "expected": "지출 항목에 '이벤트 리워드' 행이 별도 표시 (기존 '리워드 지급'과 분리), eventRewardPayouts 금액 표시",
      "dbCheck": "TRANSACTION(type=EVENT_REWARD, status=COMPLETED) 합산 금액 확인"
    },
    {
      "id": "DB-N-015",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "순이익 공식에 이벤트 리워드 지출 포함 확인",
      "precondition": "EVENT 챌린지 정산 리워드 5 TON 지급된 상태",
      "action": "대시보드 Revenue 섹션 순이익 값 확인",
      "expected": "순이익 = (수입 합계) - (리워드지급 + 이벤트리워드 + 네트워크수수료 + 운영비) — 이벤트 리워드가 지출에 포함됨",
      "dbCheck": "변경 없음"
    }
  ]
};

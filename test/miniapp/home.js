// QA Test Data — 홈 (home)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "홈",
  "screen": "home",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "HM-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "신규 사용자 홈 화면 정상 표시 (첫 진입)",
      "precondition": "최초 가입 직후, 활성 참여 0건, 스트릭 0, 잔액 0 TON, rewardTon=0",
      "action": "Telegram Mini App 실행 → 홈 화면 진입",
      "expected": "Level 0, 프로그레스 바 0%, 스트릭 0, Active 0, Badges 0, Win 0%, 지갑 카드 0.0 TON 표시",
      "dbCheck": "USERS(status=ACTIVE, level=0), USER_STATS(longestStreak=0, totalChallengesCompleted=0), WALLET_BALANCE(depositTon=0, rewardTon=0)"
    },
    {
      "id": "HM-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 참여 있음 + 오늘 인증 미완료 상태 표시",
      "precondition": "활성 참여 1건 이상, 해당 주기 내 인증 횟수 미달, currentStreak=5",
      "action": "홈 화면 진입",
      "expected": "스트릭 5 표시, 해당 챌린지명 표시, DO YOUR MISSION 버튼 파란색 활성, Active 수 정확히 표시",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=ACTIVE, currentStreak=5), 해당 주기 VERIFICATION(finalResult=APPROVED) 수 < requiredVerifications"
    },
    {
      "id": "HM-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "모든 활성 참여 오늘 인증 완료 상태 표시",
      "precondition": "활성 참여 2건, 모든 참여의 오늘 인증 횟수 충족",
      "action": "홈 화면 진입",
      "expected": "MISSION DONE! 버튼 초록색 표시, ✅ 아이콘, 스트릭 유지/증가 반영",
      "dbCheck": "각 CHALLENGE_PARTICIPATION의 오늘 VERIFICATION(finalResult=APPROVED) 수 >= requiredVerifications"
    },
    {
      "id": "HM-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "복수 활성 참여 중 일부만 인증 완료",
      "precondition": "활성 참여 3건, 챌린지A 인증 완료, 챌린지B/C 미완료",
      "action": "홈 화면 진입",
      "expected": "DO YOUR MISSION 버튼 파란색 (미완료 건 존재), Active 3 표시",
      "dbCheck": "CHALLENGE_PARTICIPATION(status=ACTIVE) 3건, 챌린지A 인증 충족, 챌린지B/C 미달"
    },
    {
      "id": "HM-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "가용 잔액 정확히 표시 (depositTon + rewardTon 합산)",
      "precondition": "WALLET_BALANCE(depositTon=10, lockedDepositTon=5, rewardTon=3)",
      "action": "홈 화면 진입 → 지갑 카드 확인",
      "expected": "지갑 카드에 13.0 TON 표시 (10+3, lockedDepositTon 제외)",
      "dbCheck": "WALLET_BALANCE(depositTon=10, lockedDepositTon=5, rewardTon=3)"
    },
    {
      "id": "HM-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "레벨 프로그레스 바 정확히 표시",
      "precondition": "rewardTon=5 (Level 2 구간: 3~6.9999 TON)",
      "action": "홈 화면 진입 → 레벨 바 확인",
      "expected": "Level 2 뱃지, 프로그레스 바 다음 레벨(Level 3, 7 TON) 기준 진행률 표시",
      "dbCheck": "USERS(level=2), WALLET_BALANCE(rewardTon=5)"
    },
    {
      "id": "HM-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공지 배너 1건 표시 (활성 공지 존재)",
      "precondition": "NOTICE 테이블에 active=true, starts_at<=now, ends_at>=now인 공지 1건 (type=GENERAL)",
      "action": "홈 화면 진입",
      "expected": "공지 배너에 해당 공지 제목 표시, neutral 스타일, +N more 뱃지 없음",
      "dbCheck": "NOTICE(active=true, noticeType=GENERAL, startsAt<=now, endsAt>=now)"
    },
    {
      "id": "HM-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공지 배너 복수 건 표시 (+N more 뱃지)",
      "precondition": "활성 공지 3건 존재 (GENERAL 1건, MAINTENANCE 1건, EVENT 1건)",
      "action": "홈 화면 진입",
      "expected": "최신/우선순위 높은 공지 1건 제목 + '+2 more' 뱃지 표시",
      "dbCheck": "NOTICE(active=true, startsAt<=now, endsAt>=now) 3건"
    },
    {
      "id": "HM-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "공지 배너 탭 → 공지 목록 이동",
      "precondition": "활성 공지 1건 이상 존재",
      "action": "공지 배너 탭",
      "expected": "공지 목록 화면으로 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "DO YOUR MISSION 버튼 탭 → 인증 제출 화면 이동",
      "precondition": "활성 참여 1건 이상, 오늘 인증 미완료",
      "action": "DO YOUR MISSION 버튼 탭",
      "expected": "인증 제출 화면(챌린지 선택 단계)으로 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-N-011",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "MISSION DONE 버튼 탭 → 인증 제출 화면 이동 (초과 인증 가능)",
      "precondition": "모든 활성 참여 오늘 인증 완료",
      "action": "MISSION DONE! 버튼 탭",
      "expected": "인증 제출 화면으로 이동 (초과 인증 가능, All Done! 표시)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-N-012",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "레벨 바 탭 → 레벨 화면 이동",
      "precondition": "홈 화면 정상 로드",
      "action": "레벨 프로그레스 바 영역 탭",
      "expected": "레벨 화면(레벨 구간 + 출금 수수료 표)으로 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-N-013",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "그리드 네비게이션 정상 동작 (My Challenges, New Challenge, Wallet, Leaderboard)",
      "precondition": "홈 화면 정상 로드",
      "action": "각 그리드 카드 순서대로 탭",
      "expected": "My Challenges → 내 챌린지, New Challenge → 챌린지 목록, Wallet → 지갑, Leaderboard → 리더보드 각각 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-N-014",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Settings 버튼 탭 → 설정 화면 이동",
      "precondition": "홈 화면 정상 로드",
      "action": "Settings 버튼 탭",
      "expected": "설정 화면으로 이동",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-N-015",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "스트릭 리셋 후 홈 화면 표시",
      "precondition": "이전 주기 인증 미달로 streak=0 리셋됨",
      "action": "홈 화면 진입",
      "expected": "스트릭 0 표시, 'Start your streak!' 또는 빈 상태 텍스트",
      "dbCheck": "CHALLENGE_PARTICIPATION(currentStreak=0)"
    },
    {
      "id": "HM-N-016",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "최초 진입 시 timezone 자동 감지",
      "precondition": "신규 사용자, timezone 미설정 (null 또는 기본값)",
      "action": "Mini App 최초 실행",
      "expected": "FE Intl.DateTimeFormat으로 감지된 timezone이 서버에 저장됨",
      "dbCheck": "USERS(timezone=감지된 timezone, 예: Asia/Seoul)"
    },
    {
      "id": "HM-N-017",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 참여 없을 때 DO YOUR MISSION 버튼 동작",
      "precondition": "활성 참여 0건",
      "action": "오늘의 인증 버튼 탭",
      "expected": "챌린지 목록 화면으로 유도 (활성 참여 없으므로)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-N-018",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "활성 공지 0건일 때 배너 미표시",
      "precondition": "NOTICE 테이블에 활성 공지 없음 (active=false 또는 기간 외)",
      "action": "홈 화면 진입",
      "expected": "공지 배너 영역 미표시 (빈 공간 없이 레이아웃 정상)",
      "dbCheck": "NOTICE(active=true, startsAt<=now, endsAt>=now) 0건"
    },
    {
      "id": "HM-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "BANNED 사용자 홈 화면 접근 차단",
      "precondition": "USERS(status=BANNED)",
      "action": "Mini App 실행 → 홈 화면 진입 시도",
      "expected": "403 에러 화면 표시, 모든 기능 비활성, 차단 안내 메시지",
      "dbCheck": "USERS(status=BANNED), lastLoginAt 갱신 안 됨"
    },
    {
      "id": "HM-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "initData 만료 시 인증 실패 (401)",
      "precondition": "auth_date 기준 10분 초과된 initData",
      "action": "Mini App 실행 → API 호출",
      "expected": "401 Unauthorized, 앱 재시작 유도 메시지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "네트워크 오류 시 에러 토스트 표시",
      "precondition": "네트워크 연결 불안정 또는 서버 다운",
      "action": "홈 화면 진입 (API 호출 실패)",
      "expected": "'Network error. Please try again.' 에러 토스트 + 재시도 버튼 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "서버 500 에러 시 에러 처리",
      "precondition": "서버 내부 오류 발생",
      "action": "홈 화면 진입 (GET /api/v1/home 500 응답)",
      "expected": "에러 토스트 표시 + 재시도 버튼, 화면 크래시 없음",
      "dbCheck": "변경 없음"
    },
    {
      "id": "HM-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "WALLET_BALANCE 레코드 없는 사용자 (잔액 0 처리)",
      "precondition": "WALLET_BALANCE 테이블에 해당 userId 레코드 없음",
      "action": "홈 화면 진입",
      "expected": "잔액 0.0 TON 정상 표시 (에러 없음)",
      "dbCheck": "WALLET_BALANCE 레코드 없음 → 서비스에서 0으로 처리"
    },
    {
      "id": "HM-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "UserStats 레코드 없는 사용자 (통계 0 처리)",
      "precondition": "USER_STATS 테이블에 해당 userId 레코드 없음",
      "action": "홈 화면 진입",
      "expected": "Badges 0, Win 0%, maxStreak 0 정상 표시 (에러 없음)",
      "dbCheck": "USER_STATS 레코드 없음 → 서비스에서 0으로 처리"
    },
    {
      "id": "HM-E-007",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "데이터 일부 로딩 실패 시 부분 표시",
      "precondition": "홈 API 내부에서 일부 쿼리 실패 (예: 공지 조회 실패)",
      "action": "홈 화면 진입",
      "expected": "실패한 섹션에 'Failed to load' + 재시도 링크, 나머지 섹션 정상 표시",
      "dbCheck": "변경 없음"
    }
  ]
};

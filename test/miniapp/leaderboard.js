// QA Test Data — 리더보드 (leaderboard)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "리더보드",
  "screen": "leaderboard",
  "lastUpdated": "2026-05-21",
  "priority": "medium",
  "cases": [
    {
      "id": "LB-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Top 100 안 사용자 — 랭크 표시",
      "precondition": "사용자의 globalRank가 1~100 사이 (예: 42위)",
      "action": "리더보드 화면 진입",
      "expected": "'#42' 랭크 표시 + 'Top 100 🏆' 뱃지 + 스트릭 뱃지",
      "dbCheck": "USER_STATS(global_rank=42) 확인"
    },
    {
      "id": "LB-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Top 100 밖 사용자 — Outside Top 100 표시",
      "precondition": "globalRank = null, totalChallengesCompleted > 0",
      "action": "리더보드 화면 진입",
      "expected": "'Outside Top 100' 표시 + 'Complete more challenges to climb the ranks!' 메시지",
      "dbCheck": "USER_STATS(global_rank=null, total_challenges_completed > 0) 확인"
    },
    {
      "id": "LB-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "참여 이력 없는 사용자 — Unranked 표시",
      "precondition": "globalRank = null, totalChallengesCompleted = 0",
      "action": "리더보드 화면 진입",
      "expected": "'Unranked' 표시 + 'Start a challenge to get ranked!' 메시지",
      "dbCheck": "USER_STATS(global_rank=null, total_challenges_completed=0) 확인"
    },
    {
      "id": "LB-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "내 통계 표시 — Level, Completed, Streak",
      "precondition": "사용자 통계 데이터 존재",
      "action": "리더보드 화면 진입",
      "expected": "현재 Level, 완료 챌린지 수(totalChallengesCompleted), 현재 Streak(currentStreak) 표시",
      "dbCheck": "USER_STATS(level, total_challenges_completed, current_streak) 확인"
    },
    {
      "id": "LB-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Top Players Coming Soon 표시",
      "precondition": "리더보드 화면 진입",
      "action": "Top Players 섹션 확인",
      "expected": "'Coming Soon' 표시 (Mini App에서는 비활성)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "LB-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "랭킹 데이터 로딩 실패",
      "precondition": "서버 오류 또는 네트워크 단절",
      "action": "리더보드 화면 진입",
      "expected": "에러 메시지 + 재시도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "LB-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "BANNED 사용자 랭킹 제외 확인",
      "precondition": "사용자가 BANNED 상태 (어드민에서 확인)",
      "action": "해당 사용자의 리더보드 데이터 확인",
      "expected": "BANNED 사용자는 globalRank = null, 랭킹 목록에서 제외",
      "dbCheck": "USER_STATS(global_rank=null) WHERE USERS(status=BANNED)"
    }
  ]
};

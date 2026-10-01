/**
 * QA Test Manifest
 * 카테고리별 테스트 파일 목록. 새 테스트 추가 시 해당 카테고리 items에 항목 추가.
 * totalCases: 해당 .js 파일의 cases 배열 길이 (진행률 계산용)
 */
window.__TEST_MANIFEST__ = {
  admin: {
    label: "Admin Dashboard",
    items: [
      { file: "admin/admin-login.js", feature: "로그인", screen: "admin-login", totalCases: 11 },
      { file: "admin/dashboard.js", feature: "대시보드", screen: "dashboard", totalCases: 15 },
      { file: "admin/challenge-management.js", feature: "챌린지 관리", screen: "challenge-management", totalCases: 19 },
      { file: "admin/verification-review.js", feature: "인증 검수", screen: "verification-review", totalCases: 15 },
      { file: "admin/user-management.js", feature: "사용자 관리", screen: "user-management", totalCases: 16 },
      { file: "admin/withdrawal-management.js", feature: "출금 관리", screen: "withdrawal-management", totalCases: 27 },
      { file: "admin/settlement.js", feature: "정산", screen: "settlement", totalCases: 26 },
      { file: "admin/notice-management.js", feature: "공지사항 관리", screen: "notice-management", totalCases: 14 },
      { file: "admin/transaction-history.js", feature: "거래 내역", screen: "transaction-history", totalCases: 16 },
      { file: "admin/activity-log.js", feature: "활동 로그", screen: "activity-log", totalCases: 10 },
      { file: "admin/settings.js", feature: "설정 관리", screen: "settings", totalCases: 14 },
      { file: "admin/message-send.js", feature: "메시지 발송", screen: "message-send", totalCases: 18 },
      { file: "admin/cache-management.js", feature: "캐시 관리", screen: "cache-management", totalCases: 10 },
      { file: "admin/biz-order-management.js", feature: "Biz 주문 관리", screen: "biz-order-management", totalCases: 20 }
    ]
  },
  miniapp: {
    label: "Mini App",
    items: [
      { file: "miniapp/home.js", feature: "홈", screen: "home", totalCases: 32 },
      { file: "miniapp/challenge-list.js", feature: "챌린지 목록", screen: "challenge-list", totalCases: 42 },
      { file: "miniapp/challenge-detail.js", feature: "챌린지 상세", screen: "challenge-detail", totalCases: 29 },
      { file: "miniapp/challenge-participation.js", feature: "챌린지 참여", screen: "challenge-detail, my-challenges", totalCases: 51 },
      { file: "miniapp/verification-submit.js", feature: "인증 제출", screen: "verification-submit", totalCases: 46 },
      { file: "miniapp/wallet.js", feature: "지갑", screen: "wallet", totalCases: 47 },
      { file: "miniapp/withdrawal-request.js", feature: "출금 요청", screen: "withdrawal-request", totalCases: 13 },
      { file: "miniapp/settings.js", feature: "설정", screen: "settings", totalCases: 11 },
      { file: "miniapp/leaderboard.js", feature: "리더보드", screen: "leaderboard", totalCases: 7 },
      { file: "miniapp/levels.js", feature: "레벨", screen: "levels", totalCases: 7 },
      { file: "miniapp/invite-friends.js", feature: "초대", screen: "invite-friends", totalCases: 7 },
      { file: "miniapp/notice-list.js", feature: "공지 목록", screen: "notice-list", totalCases: 10 },
      { file: "miniapp/faq.js", feature: "FAQ", screen: "faq", totalCases: 6 },
      { file: "miniapp/landing.js", feature: "랜딩 페이지", screen: "landing", totalCases: 8 },
      { file: "miniapp/telegram-gate.js", feature: "Telegram 외부 접근 안내", screen: "telegram-gate", totalCases: 7 },
      { file: "miniapp/daily-check-in.js", feature: "데일리 체크인", screen: "home", totalCases: 45 },
      { file: "miniapp/biz-marketplace.js", feature: "Biz 마켓플레이스", screen: "biz-landing, biz-order-flow, biz-order-list", totalCases: 33 }
    ]
  },
  web: {
    label: "Web (Public)",
    items: [
      { file: "web/public-pages.js", feature: "공개 웹 페이지", screen: "public-pages", totalCases: 50 }
    ]
  }
};

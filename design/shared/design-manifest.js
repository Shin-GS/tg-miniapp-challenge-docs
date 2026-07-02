/**
 * Design Docs Manifest
 * 카테고리별 디자인 문서 목록. 새 화면 추가 시 해당 카테고리 items에 항목 추가.
 * status: done | draft | outdated | todo
 */
window.__DESIGN_MANIFEST__ = {
    miniapp: {
        label: "Mini App",
        items: [
            {name: "홈", file: "miniapp/home", status: "done"},
            {name: "챌린지 목록", file: "miniapp/challenge-list", status: "done"},
            {name: "챌린지 상세", file: "miniapp/challenge-detail", status: "done"},
            {name: "내 챌린지", file: "miniapp/my-challenges", status: "done"},
            {name: "인증 제출", file: "miniapp/verification-submit", status: "done"},
            {name: "인증 결과", file: "miniapp/verification-result", status: "done"},
            {name: "지갑", file: "miniapp/wallet", status: "done"},
            {name: "출금 요청", file: "miniapp/withdrawal-request", status: "done"},
            {name: "설정", file: "miniapp/settings", status: "done"},
            {name: "FAQ", file: "miniapp/faq", status: "done"},
            {name: "리더보드", file: "miniapp/leaderboard", status: "done"},
            {name: "초대", file: "miniapp/invite-friends", status: "done"},
            {name: "공지 목록", file: "miniapp/notice-list", status: "done"},
            {name: "레벨", file: "miniapp/levels", status: "done"},
            {name: "Telegram 외부 접근 안내", file: "miniapp/telegram-gate", status: "done"}
        ]
    },
    admin: {
        label: "Admin Dashboard",
        items: [
            {name: "로그인", file: "admin/admin-login", status: "done"},
            {name: "대시보드", file: "admin/dashboard", status: "done"},
            {name: "챌린지 관리", file: "admin/challenge-management", status: "done"},
            {name: "인증 검수", file: "admin/verification-review", status: "done"},
            {name: "사용자 관리", file: "admin/user-management", status: "done"},
            {name: "출금 관리", file: "admin/withdrawal-management", status: "done"},
            {name: "거래 내역", file: "admin/transaction-history", status: "done"},
            {name: "정산", file: "admin/settlement", status: "done"},
            {name: "공지사항", file: "admin/notice-management", status: "done"},
            {name: "활동 로그", file: "admin/activity-log", status: "done"},
            {name: "설정 관리", file: "admin/settings", status: "done"},
            {name: "메시지 발송", file: "admin/message-send", status: "done"},
            {name: "캐시 관리", file: "admin/cache-management", status: "done"}
        ]
    },
    web: {
        label: "Public Web Pages",
        items: [
            {name: "랜딩", file: "web/landing", status: "done"},
            {name: "챌린지 공개 상세", file: "web/challenge-public", status: "done"},
            {name: "공개 페이지", file: "web/public-pages", status: "done"},
            {name: "챌린지 완료 공유", file: "web/challenge-completion-share", status: "done"},
            {name: "카테고리 공개", file: "web/category-public", status: "done"},
            {name: "리더보드 공개", file: "web/leaderboard", status: "done"},
            {name: "이벤트", file: "web/events", status: "done"}
        ]
    },
    shared: {
        label: "Design System",
        items: [
            {name: "Mini App 컴포넌트 카탈로그", file: "shared/miniapp-system", status: "done"},
            {name: "Admin 컴포넌트 카탈로그", file: "shared/admin-system", status: "done"},
            {name: "디자인 토큰 (tokens.css)", file: "shared/tokens", status: "done", cssOnly: true},
            {name: "공통 컴포넌트 (components.css)", file: "shared/components", status: "done", cssOnly: true},
            {name: "Base 스타일 (base.css)", file: "shared/base", status: "done", cssOnly: true},
            {name: "Admin 레이아웃 (admin-layout.css)", file: "shared/admin-layout", status: "done", cssOnly: true}
        ]
    }
};

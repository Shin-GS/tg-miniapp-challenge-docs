/**
 * Admin Sidebar Navigation — Single Source of Truth
 * 
 * 모든 어드민 HTML에서 이 스크립트를 로드하면 sidebar를 자동 생성.
 * 메뉴 추가/수정 시 여기만 변경하면 전체 어드민 HTML에 반영.
 */
(function () {
  'use strict';

  var currentPage = location.pathname.split('/').pop().replace('.html', '');

  var items = [
    { icon: '📊', label: '대시보드', file: 'dashboard' },
    { icon: '🔍', label: '인증 검수', file: 'verification-review' },
    { icon: '💸', label: '출금 관리', file: 'withdrawal-management' },
    { icon: '🎯', label: '챌린지 관리', file: 'challenge-management' },
    { icon: '👥', label: '사용자 관리', file: 'user-management' },
    { icon: '📋', label: '거래 내역', file: 'transaction-history' },
    { icon: '💰', label: '정산', file: 'settlement' },
    { icon: '📊', label: 'Biz 주문', file: 'biz-order-management' },
    { icon: '📬', label: '메시지 발송', file: 'message-send' },
    { icon: '📢', label: '공지사항', file: 'notice-management' },
    { icon: '📝', label: '활동 로그', file: 'activity-log' },
    { icon: '⚙️', label: '설정', file: 'settings' },
    { icon: '🗄️', label: '캐시 관리', file: 'cache-management' }
  ];

  var sidebars = document.querySelectorAll('.admin-sidebar');
  if (sidebars.length === 0) return;

  var html = '<div class="admin-sidebar__logo">DefyTON</div>';
  html += '<nav class="admin-sidebar__nav">';

  items.forEach(function (item) {
    var isActive = item.file === currentPage;
    html += '<a class="admin-sidebar__item' + (isActive ? ' admin-sidebar__item--active' : '') + '" href="' + item.file + '.html">';
    html += '<span class="admin-sidebar__item-icon">' + item.icon + '</span>';
    html += item.label;
    html += '</a>';
  });

  html += '</nav>';

  sidebars.forEach(function (sidebar) {
    sidebar.innerHTML = html;
  });
})();

// QA Test Data — 공개 웹 페이지 (public-pages)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "공개 웹 페이지",
  "screen": "public-pages",
  "lastUpdated": "2026-05-28",
  "priority": "medium",
  "cases": [
    {
      "id": "PW-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Terms of Service 페이지 정상 표시",
      "precondition": "브라우저에서 /terms URL 직접 접근",
      "action": "https://도메인/terms 접속",
      "expected": "Terms of Service 전문 표시, 15개 섹션 모두 렌더링, 'Open in Telegram' CTA 버튼 표시",
      "dbCheck": "변경 없음 (정적 페이지)"
    },
    {
      "id": "PW-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Privacy Policy 페이지 정상 표시",
      "precondition": "브라우저에서 /privacy URL 직접 접근",
      "action": "https://도메인/privacy 접속",
      "expected": "Privacy Policy 전문 표시, 12개 섹션 모두 렌더링, 'Open in Telegram' CTA 버튼 표시",
      "dbCheck": "변경 없음 (정적 페이지)"
    },
    {
      "id": "PW-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "챌린지 공개 상세 페이지 정상 표시 (FIXED_PERIOD)",
      "precondition": "active=true인 FIXED_PERIOD 챌린지 존재 (id=1)",
      "action": "https://도메인/challenges/1 접속",
      "expected": "챌린지 이름, 설명, 카테고리 뱃지, 난이도 뱃지, 기간(시작~종료일), 인증 빈도, 예치금 범위, 리워드율, 참여자 수 표시, 'Join Challenge in Telegram' CTA 버튼",
      "dbCheck": "CHALLENGE(id=1, active=true) 조회 확인"
    },
    {
      "id": "PW-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "챌린지 공개 상세 페이지 정상 표시 (RELATIVE_DAYS)",
      "precondition": "active=true인 RELATIVE_DAYS 챌린지 존재 (id=2, relativeDays=30)",
      "action": "https://도메인/challenges/2 접속",
      "expected": "기간 정보 '30 days from join' 형태로 표시, 나머지 정보 정상 표시",
      "dbCheck": "CHALLENGE(id=2, active=true, schedule_type=RELATIVE_DAYS) 조회 확인"
    },
    {
      "id": "PW-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "CTA 버튼 클릭 시 Telegram 딥링크 이동",
      "precondition": "챌린지 공개 상세 페이지 표시 (id=1)",
      "action": "'Join Challenge in Telegram' 버튼 클릭",
      "expected": "https://t.me/{봇이름}/app?startapp=challenge_1 URL로 이동, Telegram 설치 시 Mini App 열림",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "OG 메타태그 정상 포함 (소셜 공유 미리보기)",
      "precondition": "챌린지 공개 상세 페이지 (id=1, title='Morning Run')",
      "action": "페이지 소스 확인 또는 소셜 미디어에 URL 공유",
      "expected": "og:title='Morning Run - DefyTON', og:description=챌린지 설명, og:type='website', og:url 포함",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "반응형 레이아웃 — 모바일 (390px)",
      "precondition": "모바일 브라우저 또는 DevTools 390px 뷰포트",
      "action": "/terms, /privacy, /challenges/{id} 각각 접속",
      "expected": "max-width: 640px 컨테이너 내 정상 표시, 텍스트 잘림 없음, CTA 버튼 터치 가능",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "Terms/Privacy 캐싱 확인 (Cache-Control: 24시간)",
      "precondition": "/terms 또는 /privacy 접속",
      "action": "응답 헤더 확인",
      "expected": "Cache-Control: max-age=86400, public",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "존재하지 않는 챌린지 ID 접근 (404)",
      "precondition": "존재하지 않는 challengeId=99999",
      "action": "https://도메인/challenges/99999 접속",
      "expected": "'Challenge Not Found' 에러 페이지 표시, 'Open in Telegram' 버튼 표시, HTTP 404 응답",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "비활성 챌린지 접근 (404)",
      "precondition": "active=false인 챌린지 존재 (id=3)",
      "action": "https://도메인/challenges/3 접속",
      "expected": "'Challenge Unavailable' 에러 페이지 표시, 'Open in Telegram' 버튼 표시, HTTP 404 응답",
      "dbCheck": "CHALLENGE(id=3, active=false) 확인"
    },
    {
      "id": "PW-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "XSS 방지 — 챌린지 제목에 HTML 태그 포함",
      "precondition": "챌린지 title에 '<script>alert(1)</script>' 포함된 데이터",
      "action": "해당 챌린지 공개 상세 페이지 접속",
      "expected": "스크립트 실행 안 됨, 이스케이프된 텍스트로 표시 ('&lt;script&gt;...')",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잘못된 ID 형식 접근 (400 또는 404)",
      "precondition": "숫자가 아닌 ID",
      "action": "https://도메인/challenges/abc 접속",
      "expected": "에러 페이지 또는 400 응답 (서버 크래시 없음)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-009",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "robots.txt 정상 응답",
      "precondition": "서버 정상 동작",
      "action": "https://도메인/robots.txt 접속",
      "expected": "User-agent: * + Allow/Disallow 규칙 + Sitemap URL 포함, Content-Type: text/plain",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-010",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "sitemap.xml (index) 정상 응답",
      "precondition": "active 챌린지 1건 이상 존재",
      "action": "https://도메인/sitemap.xml 접속",
      "expected": "sitemapindex XML, sitemap-challenges-1.xml 포함, Content-Type: application/xml",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-011",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "sitemap-challenges-1.xml 정상 응답",
      "precondition": "active 챌린지 1건 이상 존재",
      "action": "https://도메인/sitemap-challenges-1.xml 접속",
      "expected": "urlset XML, /challenges/{id} URL 목록 포함 (최대 5000건)",
      "dbCheck": "CHALLENGE(active=true) 조회 확인"
    },
    {
      "id": "PW-N-012",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "tonconnect-manifest.json 동적 생성 확인",
      "precondition": "APP_DOMAIN, APP_NAME, APP_ICON_PATH 환경변수 설정됨",
      "action": "https://도메인/tonconnect-manifest.json 접속",
      "expected": "JSON 응답: url, name, iconUrl, termsOfUseUrl, privacyPolicyUrl 포함, 환경변수 기반 동적 값",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "sitemap-challenges-999.xml 존재하지 않는 페이지 (404)",
      "precondition": "active 챌린지 5000건 미만 (페이지 1만 존재)",
      "action": "https://도메인/sitemap-challenges-999.xml 접속",
      "expected": "HTTP 404 응답",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-013",
      "type": "normal",
      "regression": true,
      "regressionNote": "2026-05-28 카드형 레이아웃 + Level 뱃지 추가",
      "scenario": "인증 공유 페이지 정상 표시 (카드형 레이아웃 + Level 뱃지)",
      "precondition": "shared=true, finalResult=APPROVED인 인증 존재 (shareToken=유효UUID), 사용자 rewardTon=30 (Level 5)",
      "action": "https://도메인/verifications/shared/{shareToken} 접속",
      "expected": "카드형 레이아웃: 사진 상단 (라운드 코너) + 정보 하단 (serviceName · Level 5 뱃지 + 챌린지명 + 인증 날짜 May 26, 2026 형식) + '🚀 Try DefyTON in Telegram' CTA 버튼 + '✅ Verified!' 성공 배지",
      "dbCheck": "VERIFICATION(share_token=해당UUID, shared=true, final_result=APPROVED) 조회 확인, USER(reward_ton 기반 Level 계산)"
    },
    {
      "id": "PW-N-014",
      "type": "normal",
      "regression": true,
      "regressionNote": "2026-05-28 OG description에 Level 정보 추가",
      "scenario": "인증 공유 페이지 OG 메타태그 정상 포함 (Level 정보 포함)",
      "precondition": "shared=true, finalResult=APPROVED인 인증 (챌린지명='Morning Run', serviceName='Challenger_aB3xK9', rewardTon=30 → Level 5)",
      "action": "페이지 소스 확인 또는 소셜 미디어에 URL 공유",
      "expected": "og:title='Morning Run - Verified! ✅', og:description='Challenger_aB3xK9 (Level 5) completed this challenge on May 26, 2026', og:image=인증 사진 S3 URL, og:url=공유 페이지 URL",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-015",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "인증 공유 페이지 CTA 버튼 클릭 시 Telegram 딥링크 이동",
      "precondition": "인증 공유 페이지 정상 표시 상태",
      "action": "'🚀 Try DefyTON in Telegram' 버튼 클릭",
      "expected": "https://t.me/{봇이름}/app URL로 이동, Telegram 설치 시 Mini App 열림",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-016",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "인증 공유 페이지 반응형 레이아웃 (모바일 390px)",
      "precondition": "모바일 브라우저 또는 DevTools 390px 뷰포트",
      "action": "/verifications/shared/{shareToken} 접속",
      "expected": "max-width: 640px 컨테이너 내 정상 표시, 사진 비율 유지, CTA 버튼 터치 가능, 텍스트 잘림 없음",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-017",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "인증 공유 페이지 캐싱 확인 (no-cache)",
      "precondition": "/verifications/shared/{shareToken} 접속",
      "action": "응답 헤더 확인",
      "expected": "Cache-Control: no-cache (어드민 CANCEL 시 즉시 404 반영 위해)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잘못된 shareToken으로 접근 (404)",
      "precondition": "존재하지 않는 shareToken (임의 UUID)",
      "action": "https://도메인/verifications/shared/00000000-0000-0000-0000-000000000000 접속",
      "expected": "'Verification Not Found' + 'This shared verification is no longer available.' 에러 페이지 표시, 'Open in Telegram' 버튼, HTTP 404 응답",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-E-007",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "shared=false인 인증의 shareToken으로 접근 (404)",
      "precondition": "shared=false인 인증 (shareToken은 존재하지만 비활성)",
      "action": "https://도메인/verifications/shared/{shareToken} 접속",
      "expected": "'Verification Not Found' 에러 페이지 표시, HTTP 404 응답",
      "dbCheck": "VERIFICATION(share_token=해당UUID, shared=false) 확인"
    },
    {
      "id": "PW-E-008",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "APPROVED가 아닌 인증의 공유 페이지 접근 (어드민 CANCEL 후 404)",
      "precondition": "이전에 shared=true였으나 어드민이 CANCEL 처리한 인증 (final_result=CANCELLED)",
      "action": "https://도메인/verifications/shared/{shareToken} 접속",
      "expected": "'Verification Not Found' 에러 페이지 표시, HTTP 404 응답",
      "dbCheck": "VERIFICATION(share_token=해당UUID, shared=true, final_result=CANCELLED) 확인"
    },
    {
      "id": "PW-E-009",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "잘못된 shareToken 형식 접근 (UUID 아닌 문자열)",
      "precondition": "UUID 형식이 아닌 문자열",
      "action": "https://도메인/verifications/shared/invalid-token-abc 접속",
      "expected": "에러 페이지 또는 404 응답 (서버 크래시 없음)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "PW-N-018",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "인증 공유 페이지 Level 뱃지 실시간 반영 확인",
      "precondition": "shared=true, finalResult=APPROVED인 인증, 사용자 rewardTon이 변동된 상태 (예: 출금으로 Level 하락)",
      "action": "https://도메인/verifications/shared/{shareToken} 접속",
      "expected": "현재 rewardTon 기준 Level 표시 (공유 시점 Level이 아닌 실시간 Level)",
      "dbCheck": "USER(reward_ton) 기반 LevelTier 실시간 계산 확인"
    },
    {
      "id": "PW-E-010",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "인증 공유 페이지 XSS 방지 — 챌린지명에 HTML 태그 포함",
      "precondition": "챌린지 title에 '<script>alert(1)</script>' 포함된 데이터, 해당 챌린지의 APPROVED 인증 공유됨",
      "action": "해당 인증 공유 페이지 접속",
      "expected": "스크립트 실행 안 됨, 이스케이프된 텍스트로 표시",
      "dbCheck": "변경 없음"
    }
  ]
};

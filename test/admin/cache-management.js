// QA Test Data — 캐시 관리 (cache-management)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "캐시 관리",
  "screen": "cache-management",
  "lastUpdated": "2026-06-18",
  "priority": "medium",
  "cases": [
    {
      "id": "CM-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "캐시 관리 페이지 진입 — 요약 카드 + 그룹별 카드 표시",
      "precondition": "어드민 JWT 유효, Valkey 정상 동작 중",
      "action": "사이드바 '캐시 관리' 메뉴 클릭",
      "expected": "요약 카드: '1.15 MB / 128 MB (18 keys)', 8개 그룹별 카드 표시 (그룹명, 설명, 키 수, [삭제] 버튼), 전체 삭제 버튼 페이지 하단",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "그룹별 캐시 삭제 — 챌린지 상세 캐시 삭제",
      "precondition": "캐시 관리 진입, 챌린지 상세 그룹 keyCount >= 1",
      "action": "'챌린지 상세' 카드 [삭제] 클릭 → 확인 팝업 '챌린지 상세 캐시 N건을 삭제합니까?' → [확인]",
      "expected": "성공 토스트 '삭제 완료', 해당 그룹 키 수 0 갱신",
      "dbCheck": "Valkey: app:challenge:* 패턴 키 0건"
    },
    {
      "id": "CM-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "그룹별 캐시 삭제 — 공개 웹 캐시 삭제",
      "precondition": "캐시 관리 진입, 공개 웹 그룹 keyCount >= 1",
      "action": "'공개 웹' 카드 [삭제] 클릭 → 확인 팝업 → [확인]",
      "expected": "성공 토스트 '삭제 완료', 해당 그룹 키 수 0 갱신",
      "dbCheck": "Valkey: public:* 패턴 키 0건"
    },
    {
      "id": "CM-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "그룹별 캐시 삭제 — 인증 상태 캐시 삭제 (밴 처리 후)",
      "precondition": "사용자 밴 처리 직후, user:status:* 캐시 존재",
      "action": "'인증 상태' 카드 [삭제] 클릭 → 확인 팝업 → [확인]",
      "expected": "성공 토스트 '삭제 완료', 해당 그룹 키 수 0 갱신",
      "dbCheck": "Valkey: user:status:* 패턴 키 0건"
    },
    {
      "id": "CM-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 캐시 삭제",
      "precondition": "캐시 관리 진입, totalKeys > 0",
      "action": "하단 '전체 삭제' 빨간 버튼 클릭 → 확인 팝업 '정말 모든 캐시를 삭제합니까? 일시적으로 응답이 느려질 수 있습니다.' → [확인]",
      "expected": "성공 토스트 '전체 캐시 초기화 완료', 요약 '0 MB / 128 MB (0 keys)', 모든 그룹 키 수 0",
      "dbCheck": "Valkey: DBSIZE = 0"
    },
    {
      "id": "CM-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "삭제 확인 팝업에서 취소",
      "precondition": "그룹별 또는 전체 삭제 확인 팝업 표시 중",
      "action": "[취소] 클릭",
      "expected": "팝업 닫힘, 화면 유지, 삭제 실행되지 않음",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "캐시 삭제 후 서비스 정상 동작 확인 (DB fallback)",
      "precondition": "전체 캐시 삭제 완료",
      "action": "Mini App 챌린지 목록 조회 (별도 브라우저)",
      "expected": "캐시 미스 → DB에서 조회 → 정상 응답 (느려질 수 있으나 에러 없음)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "Valkey 연결 실패 상태",
      "precondition": "Valkey 컨테이너 다운 또는 네트워크 단절",
      "action": "캐시 관리 페이지 진입",
      "expected": "에러 상태: '캐시 서버에 연결할 수 없습니다. 서비스는 DB fallback으로 정상 동작 중입니다.', 삭제 버튼 모두 비활성화",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "캐시 비어 있음 (서버 재시작 직후)",
      "precondition": "Valkey 정상이나 모든 키 없음 (totalKeys=0)",
      "action": "캐시 관리 페이지 진입",
      "expected": "요약 '0 MB / 128 MB (0 keys)', 모든 그룹 '0 keys', 삭제 버튼 비활성 (삭제할 것 없음)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "CM-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 로그인 리다이렉트",
      "precondition": "어드민 JWT 만료 (2시간 경과)",
      "action": "캐시 관리 페이지 진입 또는 삭제 시도",
      "expected": "401 응답 → 로그인 화면으로 자동 리다이렉트",
      "dbCheck": "변경 없음"
    }
  ]
};

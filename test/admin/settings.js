// QA Test Data — 설정 관리 (settings)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "설정 관리",
  "screen": "settings",
  "lastUpdated": "2026-05-28",
  "priority": "high",
  "cases": [
    {
      "id": "ST-N-001",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "설정 페이지 진입 (전체 설정값 조회 성공)",
      "precondition": "어드민 JWT 유효, APP_SETTINGS 테이블에 모든 키 존재",
      "action": "사이드바 '설정' 메뉴 클릭",
      "expected": "환율 설정 3개 (TON/USD, TON/KRW, USD/KRW) + 운영 비용 2개 (AWS, AI) + 네트워크 수수료 1개 표시, 각 항목에 현재 값 + 마지막 수정 정보",
      "dbCheck": "APP_SETTINGS(6개 키 조회 확인: TON_TO_USD, EXCHANGE_TON_TO_KRW, EXCHANGE_USD_TO_KRW, MONTHLY_AWS_COSTS, MONTHLY_AI_COSTS, REVENUE_NETWORK_FEE)"
    },
    {
      "id": "ST-N-002",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "환율 설정 인라인 수정 (TON/USD 값 변경)",
      "precondition": "설정 페이지 진입 완료, TON_TO_USD 현재값=1.90",
      "action": "TON/USD 항목 수정 버튼(✏️) 클릭 → 2.10 입력 → 저장 클릭",
      "expected": "'설정이 저장되었습니다' 토스트, 값 2.10으로 갱신, 마지막 수정 정보 업데이트",
      "dbCheck": "APP_SETTINGS(key=TON_TO_USD, value=2.10, updatedAt=현재시각, updatedBy=현재 어드민)"
    },
    {
      "id": "ST-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "환율 설정 인라인 수정 (TON/KRW 값 변경)",
      "precondition": "설정 페이지 진입 완료, EXCHANGE_TON_TO_KRW 현재값=3038",
      "action": "TON/KRW 항목 수정 버튼(✏️) 클릭 → 3200 입력 → 저장 클릭",
      "expected": "'설정이 저장되었습니다' 토스트, 값 3200으로 갱신",
      "dbCheck": "APP_SETTINGS(key=EXCHANGE_TON_TO_KRW, value=3200, updatedAt=현재시각)"
    },
    {
      "id": "ST-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "운영 비용 JSON 수정 (AWS 비용 항목 추가)",
      "precondition": "설정 페이지 진입 완료, MONTHLY_AWS_COSTS 현재값={\"EC2\":25,\"RDS\":35,\"S3\":3}",
      "action": "AWS 비용 수정 버튼(✏️) 클릭 → JSON에 \"CloudFront\":5 추가 → 저장 클릭",
      "expected": "'설정이 저장되었습니다' 토스트, 테이블에 CloudFront $5 항목 추가 표시",
      "dbCheck": "APP_SETTINGS(key=MONTHLY_AWS_COSTS, value={\"EC2\":25,\"RDS\":35,\"S3\":3,\"CloudFront\":5})"
    },
    {
      "id": "ST-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "운영 비용 JSON 수정 (AI 비용 값 변경)",
      "precondition": "설정 페이지 진입 완료, MONTHLY_AI_COSTS 현재값={\"GPT-4o\":30}",
      "action": "AI 비용 수정 버튼(✏️) 클릭 → {\"GPT-4o\":45} 입력 → 저장 클릭",
      "expected": "'설정이 저장되었습니다' 토스트, 테이블에 GPT-4o $45로 갱신",
      "dbCheck": "APP_SETTINGS(key=MONTHLY_AI_COSTS, value={\"GPT-4o\":45})"
    },
    {
      "id": "ST-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "네트워크 수수료 수정",
      "precondition": "설정 페이지 진입 완료, REVENUE_NETWORK_FEE 현재값=0.01",
      "action": "네트워크 수수료 수정 버튼(✏️) 클릭 → 0.02 입력 → 저장 클릭",
      "expected": "'설정이 저장되었습니다' 토스트, 값 0.02로 갱신",
      "dbCheck": "APP_SETTINGS(key=REVENUE_NETWORK_FEE, value=0.02, updatedAt=현재시각)"
    },
    {
      "id": "ST-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "수정 후 마지막 수정 정보 갱신 확인",
      "precondition": "TON/USD 값 수정 완료",
      "action": "수정 완료 후 해당 항목 하단 확인",
      "expected": "'마지막 수정: {현재 날짜시간} ({현재 어드민 loginId})' 표시",
      "dbCheck": "APP_SETTINGS(key=TON_TO_USD, updatedBy=현재 어드민), ADMIN_ACTIVITY_LOG(actionType=SETTINGS_UPDATE, targetType=SETTING, targetId=TON_TO_USD)"
    },
    {
      "id": "ST-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "수정 후 대시보드 수익 통계에 즉시 반영 확인",
      "precondition": "EXCHANGE_TON_TO_KRW를 3038 → 3200으로 변경 완료",
      "action": "사이드바에서 대시보드 이동 → 수익 통계 원화 환산 확인",
      "expected": "원화 환산 금액이 새 환율(3200) 기준으로 표시 (서버 재시작 없이 즉시 반영)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-001",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "빈 값 입력 시 인라인 에러",
      "precondition": "TON/USD 수정 모드 진입",
      "action": "입력 필드를 비우고 저장 클릭",
      "expected": "인라인 에러 '값을 입력해주세요' 표시, API 호출 없음",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "유효하지 않은 숫자 입력 (문자열)",
      "precondition": "TON/USD 수정 모드 진입",
      "action": "'abc' 입력 → 저장 클릭",
      "expected": "인라인 에러 '유효한 숫자를 입력해주세요' 표시, API 호출 없음",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "유효하지 않은 JSON 입력",
      "precondition": "AWS 비용 수정 모드 진입 (JSON textarea)",
      "action": "'{EC2: 25}' (따옴표 없는 키) 입력 → 저장 클릭",
      "expected": "인라인 에러 '유효한 JSON 형식이 아닙니다' 표시, API 호출 없음",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "존재하지 않는 키 수정 시도 (404)",
      "precondition": "API 직접 호출로 존재하지 않는 키 수정 시도",
      "action": "PUT /api/admin/v1/settings/INVALID_KEY { value: '100' }",
      "expected": "404 Not Found 에러 응답",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 로그인 리다이렉트",
      "precondition": "어드민 JWT 만료 (2시간 경과)",
      "action": "설정 페이지 진입 또는 저장 시도",
      "expected": "401 응답 → 로그인 화면으로 자동 리다이렉트",
      "dbCheck": "변경 없음"
    },
    {
      "id": "ST-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "서버 오류 시 에러 토스트",
      "precondition": "설정 페이지 진입 완료, BE 서버 내부 오류 발생",
      "action": "TON/USD 수정 → 저장 클릭 → 서버 500 응답",
      "expected": "'설정 저장에 실패했습니다. 다시 시도해주세요.' 에러 토스트, 입력 필드 유지 (값 보존), 재시도 가능",
      "dbCheck": "변경 없음"
    }
  ]
};

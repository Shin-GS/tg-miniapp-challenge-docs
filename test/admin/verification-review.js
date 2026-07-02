// QA Test Data — 인증 검수 (verification-review)
// 이 파일은 qa-tester 에이전트가 관리합니다. 수동 수정 시 주의.
window.__TEST_DATA__ = {
  "feature": "인증 검수",
  "screen": "verification-review",
  "lastUpdated": "2026-05-28",
  "priority": "high",
  "cases": [
    {
      "id": "VR-N-001",
      "type": "normal",
      "regression": true,
      "regressionNote": "기본 탭이 '전체'로 변경됨 (기존: 검토 필요)",
      "scenario": "전체 탭 — 기본 진입 (필터 미적용)",
      "precondition": "인증 이력 존재",
      "action": "사이드바 '인증 검수' 클릭",
      "expected": "전체 탭 활성, 모든 상태의 인증 목록 표시 (ID, 사용자명, 챌린지명, 사진, AI 결과, 최종 결과 뱃지, 제출일), 최신순 정렬",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-001-1",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 탭 — 상태 필터 적용 (APPROVED)",
      "precondition": "APPROVED 인증 건 존재",
      "action": "상태 드롭다운에서 'APPROVED' 선택",
      "expected": "APPROVED 건만 표시, 페이지 1로 리셋",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-001-2",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 탭 — 상태 필터 해제",
      "precondition": "APPROVED 필터 적용 상태",
      "action": "상태 드롭다운에서 '전체 상태' 선택",
      "expected": "모든 상태 인증 목록 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-001-3",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "전체 탭 — 상세 보기 (조회 전용)",
      "precondition": "전체 탭에서 인증 건 존재",
      "action": "'상세' 버튼 클릭",
      "expected": "상세 모달 표시 (사진, AI 판정, 사용자/챌린지 정보, 최종 결과, 어드민 처리 정보), 액션 버튼 없음",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-001-4",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "탭 뱃지 — 미처리 건수 표시",
      "precondition": "needsReview 3건, 이의제기 2건 존재",
      "action": "인증 검수 화면 진입",
      "expected": "'검토 필요 (3)', '이의제기 (2)' 뱃지 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-001-5",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "탭 뱃지 — 액션 후 건수 갱신",
      "precondition": "검토 필요 탭에서 confirm-review 처리",
      "action": "확인 완료 후 탭 뱃지 확인",
      "expected": "검토 필요 건수 1 감소",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-002",
      "type": "normal",
      "regression": true,
      "regressionNote": "탭 순서 변경: 전체 | 검토 필요 (N) | 이의제기 (N)",
      "scenario": "검토 필요 탭 — 목록 조회",
      "precondition": "needsReview=true인 인증 건 존재",
      "action": "'검토 필요' 탭 클릭",
      "expected": "검토 필요 목록 표시 (ID, 사용자명, 챌린지명, 사진 썸네일, AI 결과=APPROVED, 상태=NEEDS_REVIEW, 제출일)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "이의제기 탭 — 목록 조회",
      "precondition": "이의제기 건 존재",
      "action": "'이의제기' 탭 클릭",
      "expected": "이의제기 목록 표시 (ID, 사용자명, 챌린지명, 사진 썸네일, AI 결과=REJECTED, 상태=DISPUTED, 제출일)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-003",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "검토 필요 건 — 확인 완료 (confirm-review)",
      "precondition": "needsReview=true 건 상세 패널 열림",
      "action": "'확인 완료' 버튼 클릭 → 확인 팝업 → 확인",
      "expected": "성공 토스트, 목록에서 해당 항목 제거",
      "dbCheck": "VERIFICATION(needs_review=false), ADMIN_ACTIVITY_LOG(action=CONFIRM_REVIEW, target_type=VERIFICATION)"
    },
    {
      "id": "VR-N-004",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "검토 필요 건 — 부정 인증 취소 (cancel)",
      "precondition": "needsReview=true 건 상세 패널 열림",
      "action": "'취소' 버튼 클릭 → 사유 입력 모달 → 사유 작성 → 확인",
      "expected": "성공 토스트, 목록에서 해당 항목 제거, 사용자에게 CHALLENGE_RESULT 알림 발송",
      "dbCheck": "VERIFICATION(final_result=CANCELLED, admin_reason=입력값), ADMIN_ACTIVITY_LOG(action=CANCEL_VERIFICATION, target_type=VERIFICATION)"
    },
    {
      "id": "VR-N-005",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "이의제기 건 — 승인 (approve-override)",
      "precondition": "이의제기 건 상세 패널 열림",
      "action": "'승인' 버튼 클릭 → 확인 팝업 (사유 optional) → 확인",
      "expected": "성공 토스트, 목록에서 해당 항목 제거, final_result=APPROVED로 변경, 사용자에게 CHALLENGE_RESULT 알림 발송",
      "dbCheck": "VERIFICATION(final_result=APPROVED, admin_action=APPROVE_OVERRIDE), ADMIN_ACTIVITY_LOG(action=APPROVE_OVERRIDE_VERIFICATION, target_type=VERIFICATION)"
    },
    {
      "id": "VR-N-006",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "이의제기 건 — 대응 작성 (dispute-respond)",
      "precondition": "이의제기 건 상세 패널 열림",
      "action": "'대응 작성' 버튼 클릭 → 대응 내용 입력 모달 → 내용 작성 → 확인",
      "expected": "성공 토스트, 목록에서 해당 항목 제거",
      "dbCheck": "VERIFICATION(admin_reason=대응내용), ADMIN_ACTIVITY_LOG(action=RESPOND_DISPUTE, target_type=VERIFICATION)"
    },
    {
      "id": "VR-N-007",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "상세 패널 — 사진 원본 크기 팝업",
      "precondition": "상세 패널 열린 상태",
      "action": "사진 이미지 클릭",
      "expected": "원본 크기 이미지 팝업 표시",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-N-008",
      "type": "normal",
      "regression": false,
      "regressionNote": "",
      "scenario": "대시보드에서 이의제기 탭으로 직접 진입",
      "precondition": "대시보드에서 '이의제기 N건' 클릭",
      "action": "대시보드 '이의제기 2건' 클릭",
      "expected": "인증 검수 화면 이의제기 탭 활성 상태로 진입",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-E-001",
      "type": "exception",
      "regression": true,
      "regressionNote": "전체 탭 빈 상태 메시지 변경: '인증 이력이 없습니다.'",
      "scenario": "처리할 건 없음 (빈 상태)",
      "precondition": "현재 탭에 해당하는 건 0건",
      "action": "탭 진입",
      "expected": "전체 탭: '인증 이력이 없습니다.', 검토 필요/이의제기 탭: '처리할 건이 없습니다.'",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-E-002",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "취소 시 사유 미입력",
      "precondition": "취소 모달 열린 상태",
      "action": "사유 미입력 상태에서 확인 클릭",
      "expected": "확인 버튼 비활성 또는 인라인 에러 (reason 필수)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-E-003",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "대응 작성 시 내용 미입력",
      "precondition": "대응 작성 모달 열린 상태",
      "action": "내용 미입력 상태에서 확인 클릭",
      "expected": "확인 버튼 비활성 또는 인라인 에러 (response 필수)",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-E-004",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "이미 처리된 건에 액션 시도 (409 Conflict)",
      "precondition": "다른 어드민이 이미 처리한 건",
      "action": "confirm-review 또는 approve 시도",
      "expected": "에러 토스트 '이미 처리된 건입니다.', 목록 새로고침",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-E-005",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "목록 API 호출 실패",
      "precondition": "서버 오류 또는 네트워크 단절",
      "action": "탭 진입",
      "expected": "'데이터를 불러올 수 없습니다.' + 재시도 버튼",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-E-006",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "액션 API 호출 실패",
      "precondition": "서버 오류",
      "action": "confirm-review / cancel / approve / dispute-respond 시도",
      "expected": "에러 토스트 '처리에 실패했습니다. 다시 시도해주세요.', 모달/패널 유지",
      "dbCheck": "변경 없음"
    },
    {
      "id": "VR-E-007",
      "type": "exception",
      "regression": false,
      "regressionNote": "",
      "scenario": "JWT 만료 시 자동 리다이렉트",
      "precondition": "JWT 2시간 만료",
      "action": "API 호출 시 401 응답",
      "expected": "로그인 화면으로 자동 이동",
      "dbCheck": "변경 없음"
    }
  ]
};

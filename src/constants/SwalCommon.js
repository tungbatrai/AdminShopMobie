export const SwalCommon = {
  ALERT_DELETE_ALL: {
    text:
      "해당 항목을 삭제하시겠습니까?\n" + "삭제 시 데이터 복구는 불가능합니다.",
    icon: "warning",
    buttons: ["취소", "삭제"],
    dangerMode: true,
  },
  ALERT_DELETE: {
    text: "해당 항목을 삭제하시겠습니까?\n삭제 시 데이터 복구는 불가능합니다.",
    icon: "warning",
    buttons: ["취소", "삭제"],
    dangerMode: true,
  },
  ALERT_SAVE_COMPLETE: {
    text: "저장이 완료되었습니다.",
    icon: "success",
    button: "확인",
  },
  ALERT_DELETE_FAILED: {
    text: "저장에 실패했습니다.",
    icon: "error",
    button: "확인",
  },
  COMMON_FAILED: {
    text: "오류가 발생했습니다.\n다시 시도해주세요.",
    icon: "error",
    button: "확인",
  },
  ALERT_MISSING_DATA: {
    text: "{미입력된 필수 입력 필드(항목)명}을\n" + "입력해 주세요.",
    icon: "error",
    button: "확인",
  },
  PLEASE_CHOOSE: {
    text: "삭제할 항목을 선택하세요.",
    icon: "error",
    button: "확인",
  },
  ALERT_CHECK_EMAIL: {
    text: "이메일을 다시 확인해주세요.",
    icon: "error",
    button: "확인",
  },
  ALERT_CHECK_IMAGE: {
    text: "사이즈는 3Mb 이하인 사진을 선택해주세요",
    icon: "error",
    button: "확인",
  },
};
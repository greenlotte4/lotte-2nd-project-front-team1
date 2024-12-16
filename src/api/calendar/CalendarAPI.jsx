import axios from "axios";
import {
  CALENDAR_ADDEVENT,
  CALENDAR_CREATE,
  CALENDAR_DELETE,
  CALENDAR_DELETEEVENT,
  CALENDAR_EDITEVENT,
  CALENDAR_INVITECODE,
  CALENDAR_LEAVE,
  CALENDAR_LIST,
} from "../URI";
//달력 생성
export async function createCalendar(calendarData) {
  try {
    const response = await axios.post(`${CALENDAR_CREATE}`, calendarData);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    if (error.response) {
      // 서버에서 응답한 에러 메시지
      console.log("캘린더", error.response);
      alert(`캘린더 생성 실패: ${error.response.data.message}`);
    } else {
      // 기타 에러
      alert("캘린더 생성 과정에서 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }
}
//초대 코드 달력 생성
export async function joinCalendarByInviteCode(inviteCode, userId) {
  try {
    const response = await axios.post(
      `${CALENDAR_INVITECODE}`,
      { inviteCode, userId }, // DELETE 메서드로 JSON 데이터 전달
      {
        headers: {
          "Content-Type": "application/json", // JSON 요청 명시
        },
      }
    );
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    if (error.response) {
      // 서버에서 응답한 에러 메시지
      alert(`캘린더 생성 실패: ${error.response.data}`);
    } else {
      // 기타 에러
      alert("캘린더 생성 과정에서 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }
}
//달력 리스트 출력
export async function fetchCalendarList(userId) {
  try {
    const response = await axios.post(CALENDAR_LIST, { userId });
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error("캘린더 리스트 가져오기 실패:", error);
    throw error;
  }
}
//달력 삭제
export const deleteCalendar = async (calendarId) => {
  try {
    const response = await axios.delete(`${CALENDAR_DELETE}`, {
      data: { calendarId }, // 데이터를 config의 data에 포함
      headers: {
        "Content-Type": "application/json", // 명시적으로 설정
      },
    });
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("캘린더 삭제 실패:", error);
    throw new Error("Failed to delete calendar");
  }
};
//달력 나가기
export const leaveCalendar = async (calendarId, userId) => {
  try {
    console.log("API 호출 데이터:", { calendarId, userId });
    const response = await axios.delete(`${CALENDAR_LEAVE}`, {
      data: { calendarId, userId }, // DELETE 메서드로 JSON 데이터 전달
      headers: {
        "Content-Type": "application/json", // JSON 요청 명시
      },
    });
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("팀 나가기 실패:", error);
    throw new Error("Failed to leave calendar");
  }
};
//일정 추가하기
export const addevent = async (eventlist) => {
  try {
    console.log("API 호출 데이터:", { eventlist });
    const response = await axios.post(`${CALENDAR_ADDEVENT}`, eventlist, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("일정 추가 실패:", error);
    throw new Error("Failed to leave calendar");
  }
};
//일정 수정하기
export const editevent = async (eventlist) => {
  try {
    console.log("API 호출 데이터:", { eventlist });
    const response = await axios.put(`${CALENDAR_EDITEVENT}`, eventlist, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("일정 추가 실패:", error);
    throw new Error("Failed to leave calendar");
  }
};
//일정 삭제하기
export const deleteevent = async (calendarEventId) => {
  try {
    console.log("API 호출 데이터:", { calendarEventId });
    const response = await axios.delete(
      `${CALENDAR_DELETEEVENT}/${calendarEventId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("일정 추가 실패:", error);
    throw new Error("Failed to leave calendar");
  }
};

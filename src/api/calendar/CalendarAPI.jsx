import axios from "axios";
import { CALENDAR_CREATE, CALENDAR_LIST } from "../URI";
export async function createCalendar(calendarData) {
  try {
    const response = await axios.post(`${CALENDAR_CREATE}`, calendarData);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error("방 생성에 실패했습니다:", error);
    throw error; // 실패 시 에러를 호출자에게 전달
  }
}
export async function fetchCalendarList(userId) {
  try {
    const response = await axios.post(CALENDAR_LIST, { userId });
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error("캘린더 리스트 가져오기 실패:", error);
    throw error;
  }
}

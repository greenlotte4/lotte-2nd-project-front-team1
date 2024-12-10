/*
    날짜 : 2024/12/03
    이름 : 이도영
    내용 : 세팅 백 API

    추가내역
    -------------
*/
import axios from "axios";
import {
  SETTING_USER_INFO,
  TEAMSPACE_DELETETEAM,
  TEAMSPACE_GETTEAMS,
  TEAMSPACE_JOINTEAM,
  TEAMSPACE_MAKETEAM,
  TEAMSPACE_OUTTEAM,
  TEAMSPACE_UPDATETEAM,
} from "../URI";

export const getSettingUser = async (userid) => {
  try {
    const response = await axios.get(`${SETTING_USER_INFO}/${userid}`);
    console.log("response.data : " + response.data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//팀 생성
export const getMakeTeam = async (datas) => {
  try {
    console.log("datas : " + datas);
    const response = await axios.post(`${TEAMSPACE_MAKETEAM}`, datas, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("팀 생성 성공 - 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("생성중 오류 발생 : ", error);
    throw error;
  }
};
//팀 참가
export const postJoinTeam = async (datas) => {
  try {
    const response = await axios.post(`${TEAMSPACE_JOINTEAM}`, datas, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("참가중 오류 발생 : ", error);
    throw error;
  }
};
//방 삭제
export const deleteTeam = async (datas) => {
  try {
    const response = await axios.delete(`${TEAMSPACE_DELETETEAM}`, datas, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("삭제중 오류 발생 : ", error);
    throw error;
  }
};
//팀 나가기,추방
export const deleteOutTeam = async (datas) => {
  try {
    const response = await axios.delete(`${TEAMSPACE_OUTTEAM}`, {
      data: datas,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("삭제중 오류 발생 : ", error);
    throw error;
  }
};
// 팀 정보 수정
export const putUpdateTeam = async (datas) => {
  try {
    const response = await axios.put(`${TEAMSPACE_UPDATETEAM}`, datas, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("수정중 오류 발생 : ", error);
    throw error;
  }
};
// 팀 목록 가져오기
export const getJoinedRooms = async (userId) => {
  try {
    const response = await axios.get(`${TEAMSPACE_GETTEAMS}`, {
      params: { userId }, // 사용자 ID를 쿼리 파라미터로 전달
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // 참여 중인 방 목록 반환
  } catch (error) {
    console.error("방 목록 가져오기 중 오류 발생 : ", error);
    throw error;
  }
};

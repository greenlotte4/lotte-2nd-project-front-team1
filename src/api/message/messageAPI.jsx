import axios from "axios";
import {
  MESSAGE_CHECK_DM,
  MESSAGE_GET_CHAT,
  MESSAGE_GET_LASTCHAT,
  MESSAGE_GET_ROOMS,
  MESSAGE_NEW_CHANNEL,
  MESSAGE_NEW_DM,
  MESSAGE_POST_IMAGE,
  MESSAGE_ROOM,
} from "../URI";
export const makeNewChannel = async (data) => {
  try {
    const response = await axios.post(`${MESSAGE_NEW_CHANNEL}`, data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const makeNewDM = async (data) => {
  try {
    const response = await axios.post(`${MESSAGE_NEW_DM}`, data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const leaveChatRoom = async (chatRoomId) => {
  try {
    const response = await axios.delete(
      `${MESSAGE_ROOM}?chatRoomId=${chatRoomId}`
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const checkNewDM = async (targetUserId, userId) => {
  try {
    const response = await axios.get(`${MESSAGE_CHECK_DM}`, {
      params: {
        targetUserId,
        userId,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error in checkNewDM:", err);
    throw err; // 필요한 경우 에러를 상위로 던지기
  }
};

export const getMyChatRoom = async (data) => {
  try {
    const response = await axios.get(`${MESSAGE_GET_ROOMS}?userId=${data}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getThisRoom = async (data) => {
  try {
    const response = await axios.get(`${MESSAGE_ROOM}?chatId=${data}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getChatList = async (data) => {
  try {
    const response = await axios.get(`${MESSAGE_GET_CHAT}?roomId=${data}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const setChatText = async (data) => {
  try {
    const response = await axios.post(`${MESSAGE_GET_CHAT}`, data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getLastChat = async (data) => {
  try {
    const response = await axios.get(`${MESSAGE_GET_LASTCHAT}?roomId=${data}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postMessageImg = async (formData) => {
  try {
    const response = await axios.post(`${MESSAGE_POST_IMAGE}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
      },
    });

    return response; // 서버의 응답 반환
  } catch (err) {
    console.log("파일 업로드 실패:", err); // 오류 처리
    throw err; // 오류를 호출한 곳으로 던져서 처리할 수 있도록 함
  }
};

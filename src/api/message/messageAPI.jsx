import axios from "axios";
import {
  MESSAGE_GET_CHAT,
  MESSAGE_GET_LASTCHAT,
  MESSAGE_GET_ROOM,
  MESSAGE_GET_ROOMS,
  MESSAGE_NEW_CHANNEL,
  MESSAGE_NEW_DM,
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
    const response = await axios.get(`${MESSAGE_GET_ROOM}?chatId=${data}`);
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

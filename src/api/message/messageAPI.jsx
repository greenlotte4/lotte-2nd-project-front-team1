import axios from "axios";
import { MESSAGE_GET_ROOMS, MESSAGE_NEW_CHANNEL, MESSAGE_NEW_DM } from "../URI";
export const makeNewChannel = async (data) => {
  try {
    const response = await axios.post(`${MESSAGE_NEW_CHANNEL}`, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const makeNewDM = async (data) => {
  try {
    const response = await axios.post(`${MESSAGE_NEW_DM}`, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMyChatRoom = async (data) => {
  try {
    const response = await axios.get(`${MESSAGE_GET_ROOMS}?userId=${data}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

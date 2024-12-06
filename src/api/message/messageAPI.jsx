import axios from "axios";
import { MESSAGE_NEW_CHANNEL } from "../URI";
export const makeNewChannel = async (data) => {
  try {
    const response = await axios.post(`${MESSAGE_NEW_CHANNEL}`, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
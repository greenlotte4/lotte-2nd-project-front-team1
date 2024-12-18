
/*

    날짜 : 2024/12/12
    이름 : 박준우
    내용 : api 설계
*/

import axios from "axios";
import { savePlanHistory } from "../URI";

export const savePlanHistoryAPI = async (data) => {
  try {
    const response = await axios.post(savePlanHistory, data);
    return response.data;
  } catch (error) {
    console.error("Error saving plan history:", error);
    throw error;
  }
};


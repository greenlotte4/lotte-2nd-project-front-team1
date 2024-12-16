import axios from "axios";
import { CREATE_PROJECT_ITEM, DELETE_PROJECT_ITEM, UPDATE_PROJECT_ITEM } from "../../URI";

export const postCreateProjectItem = async (data) => {
    try {
        console.log("Sending Data:", data);
        const response = await axios.post(CREATE_PROJECT_ITEM, data, {
            headers: {
            "Content-Type": "application/json",
            },
        });

    console.log("Response:", response.data); 
    return response.data;
    } catch (err) {
        console.error("Error:", err); 
        throw new Error("프로젝트 아이템 생성에 실패했습니다.");
    }
  };

  export const postUpdateProjectItem = async (no, data) => {
    try {
      console.log("Sending Data:", data);
      const response = await axios.put(UPDATE_PROJECT_ITEM(no), data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error:", err);
      throw new Error("프로젝트 아이템 수정에 실패했습니다.");
    }
  };
  
export const postDeleteProjectItem = async (id) => {
    try {
        console.log("Deleting Item ID:", id);
        const response = await axios.delete(DELETE_PROJECT_ITEM(id), {
        headers: {
            "Content-Type": "application/json",
            },
        });
        console.log("삭제 성공:", response.data);
        return response.data;
    } catch (err) {
        console.error("삭제 실패:", err);
        throw new Error("프로젝트 아이템 삭제에 실패했습니다.");
    }
};

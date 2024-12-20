import axios from "axios";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  PROJECT_LIST,
  SELECT_PROJECT,
  UPDATE_PROJECT,
  GETUSER_PROJECT,
} from "../../URI";

export const postCreateProject = async (project, userId) => {
  try {
    console.log("Sending userId:", userId);
    const response = await axios.post(
      `${CREATE_PROJECT}?userId=${userId}`,
      project,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Project created:", response.data);
    return response.data;
  } catch (err) {
    console.error("프로젝트 생성 실패:", err);
    throw err;
  }
};

export async function postSelectsProject(userId) {
  try {
    const response = await fetch(`${PROJECT_LIST}?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch projects");
    return await response.json();
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
}

export const postSelectProject = async (id) => {
  try {
    console.log("Sending Request to:", `${SELECT_PROJECT}/${id}`);
    const response = await axios.get(`${SELECT_PROJECT}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (err) {
    console.error("Error:", err.message);
    throw new Error("선택된 프로젝트 조회에 실패했습니다.");
  }
};

export const postUpdateProject = async (data) => {
  try {
    console.log("Sending Data:", data);
    const response = await axios.put(
      `${UPDATE_PROJECT}/${data.projectId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw new Error("프로젝트 수정에 실패했습니다.");
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${DELETE_PROJECT}/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("삭제 성공:", response.data);
    return response.data;
  } catch (err) {
    console.error("삭제 실패:", err);
    throw new Error("프로젝트 삭제에 실패했습니다.");
  }
};

export const fetchProjectParticipants = async (projectId) => {
  try {
    const response = await axios.get(`${GETUSER_PROJECT}/${projectId}/participants`);
    return response.data; 
  } catch (error) {
    console.error("프로젝트 참여자 목록 가져오기 실패:", error);
    throw error;
  }
};

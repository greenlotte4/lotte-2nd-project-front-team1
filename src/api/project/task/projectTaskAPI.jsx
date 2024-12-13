import axios from "axios";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../../URI";

export const postCreateProjectTask = async (data) => {
    try {
        console.log("Sending Data:", data);
        const response = await axios.post(CREATE_TASK, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Response:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw new Error("Task 생성에 실패했습니다.");
    }
};

export const postUpdateProjectTask = async (data) => {
    try {
        console.log("Sending Data:", data);
        const response = await axios.post(UPDATE_TASK, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Response:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw new Error("Task 수정에 실패했습니다.");
    }
};

export const postDeleteProjectTask = async (data) => {
    try {
        console.log("Sending Data:", data);
        const response = await axios.post(DELETE_TASK, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Response:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw new Error("Task 삭제에 실패했습니다.");
    }
};
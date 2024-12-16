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

export const postUpdateProjectTask = async (no, data) => {
    if (!no) {
        console.error("Task ID가 유효하지 않습니다:", no);
        throw new Error("Task ID가 누락되었습니다.");
    }

    try {
        console.log("Sending Data:", data);
        const response = await axios.put(UPDATE_TASK(no), data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Response:", response.data);
        return response.data; 
    } catch (err) {
        if (err.response) {
            console.error("Server Error:", err.response.data);
        } else {
            console.error("Error Message:", err.message);
        }
        throw new Error("Task 수정에 실패했습니다.");
    }
};

export const postDeleteProjectTask = async (id) => {
    try {
        console.log("Sending Data:", id);
        const response = await axios.delete(DELETE_TASK(id), {
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
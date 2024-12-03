/*

    날짜 : 2024/11/25
    이름 : 최영진
    내용 : api 설계

    추가내역
    2024-12-03 최영진 sandEmail, authEmail 추가

*/


import axios from "axios";
import { USER_CHECK, USER_EMAIL, USER_LOGIN_URI, USER_URI } from "../URI";

export const postUser = async (data) => {
    try {
        const response = await axios.post(`${USER_URI}`, data);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const postUserLogin = async (data) => {
    try {
        const response = await axios.post(`${USER_LOGIN_URI}`, data);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};


export const checkUserId = async (userId) => {
    try {
        const response = await axios.get(`${USER_CHECK}checkUserId/${userId}`)
        return response;
    } catch (err) {

        console.log("아이디 확인중 오류" + err)
    }
}

export const sandEmail = async (email) => {

    try {
        const response = await axios.post(`${USER_EMAIL}/send`, { email: email })
        return response;
    } catch (err) {

        console.log("이메일 인증 오류" + err)
        throw err;
    }
}
export const authEmail = async (email, authCode) => {

    try {
        const response = await axios.post(`${USER_EMAIL}/verify`, {

            email: email,
            authCode: authCode,
        })
        return response;

    } catch (err) {

        console.log("이메일 인증 오류" + err)
        throw err;
    }
}
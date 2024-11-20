import {createSlice} from '@reduxjs/toolkit';

const initState = {
    username : "",
    role: '',
    accessToken: "",
    refreshToken: "",
};

const userSlice = createSlice({
    name: "userSlice",
    initialState: initState,
    reducers:{
        login:(state, action) => {
            const data = action.payload;
            console.log('userSlice login data : ' + JSON.stringify(data));

            //리덕스 상태 초기화
            state.username = data.username;
            state.role = data.role;
            state.accessToken = data.accessToken;
            state.refreshToken = data.refreshToken;

            //쿠키 저장(영구저장을 위해 쿠키 사용)

        },
        logout : (state) => {
            console.log('로그아웃...');
            
            //쿠키 삭제

            //초기화 상태 반환
            return { ...initState };
        },
    },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;

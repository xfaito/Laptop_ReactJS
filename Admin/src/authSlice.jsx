/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'))
export const authSlice = createSlice({
    name: 'Auth', 
    initialState: {daDangNhap: false, user:user|| null, token: token||null, expiresIn:0},
    reducers: {
      thoat: (state) => {
        state = {daDangNhap: false, user:localStorage.removeItem('user'), token:localStorage.removeItem('token'), expiresIn:0 };
      },
      dalogin: (state, param) => {    
        localStorage.setItem('token', param.payload.token);
        localStorage.setItem('user', JSON.stringify(param.payload.userInfo));
        state.token = param.payload.token ;
        state.expiresIn = param.payload.expiresIn ;
        state.user = param.payload.userInfo ;
        state.daDangNhap = true;
        console.log("Đã ghi nhận state đăng nhập", state.user) 
      },
    }, 
})
export const { dalogin, thoat } = authSlice.actions;
export default authSlice.reducer;

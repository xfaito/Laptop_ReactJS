import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: { listSP: [] },
    reducers: {
        themSP: (state, param) => {
            let sp = param.payload; 
            let index = state.listSP.findIndex(item => item.id === sp.id);
            if (index === -1) {
                sp['so_luong'] = 1;
                state.listSP.push(sp);                
            }
            else {
                state.listSP[index]['so_luong'] ++;
            }
            console.log("Đã thêm sản phẩm thành công. Số SP=" + state.listSP.length);
        },
        suaSL: (state, param) => {
            let id = param.payload[0];
            let so_luong = param.payload[1];
            let index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP[index].so_luong = Number(so_luong);
                console.log("Đã sửa sản phẩm", param)
            }
        },
        xoaSP: (state, param) => {
            let id = param.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP.splice(index, 1);
            }
        },
        xoaGH: state => { state.listSP = []; },
    }
});

export const { themSP, suaSL, xoaSP, xoaGH } = cartSlice.actions;
export default cartSlice.reducer;
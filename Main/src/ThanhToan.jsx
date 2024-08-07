import React from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { xoaSP } from "./cartSlice"
function ThanhToan() {
  const dispatch = useDispatch()
  let htRef = React.createRef();
  let emRef = React.createRef();
  let diachiRef = React.createRef();
  let sdtRef = React.createRef();
  const cart = useSelector(state => state.cart.listSP)
  const submitDuLieu = () => {
    let ht = htRef.current.value;
    let diachi = diachiRef.current.value; 
    let sdt = sdtRef.current.value;

    if (ht === "" ||  diachi === "" || sdt === "") { alert("Vui lòng nhập thông tin"); return; }
    if (cart.length === 0) { alert("Bạn chưa chọn sản phẩm nào"); return; }

    let url = "http://localhost:3000/luudonhang";
    let tt = {
      ho_ten: htRef.current.value,
      email: emRef.current.value,
      diachi: diachiRef.current.value, 
      sdt: sdtRef.current.value,
    };

    var opt = {
      method: "POST",
      body: JSON.stringify(tt),
      headers: { "Content-Type": "application/json" },
    }
    fetch(url, opt).then(res => res.json()).then(data => {
      if (data.id_dh < 0) alert("Lỗi lưu đơn hàng", data)
      else {
        let id_dh = data.id_dh;
        alert("Đã lưu đơn hàng", id_dh);
        luuchitietdonhang(id_dh, cart);
      }
    });
  }
  const luuchitietdonhang = (id_dh, cart) => {
    let url = "http://localhost:3000/luugiohang";
    cart.forEach(sp => {
      let t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong };
      var opt = {
        method: "POST",
        body: JSON.stringify(t),
        headers: { "Content-Type": "application/json" }
      }
      fetch(url, opt).then(res => res.json())
        .then(data => luuxongsp(data))
        .catch(sp => console.log("Lỗi lưu sp", sp));
    });
  }
  const luuxongsp = (data) => {
    console.log("Đã lưu", data);
    dispatch(xoaSP(data.id_sp))
  }

  return (
    <form id="frmthanhtoan" >
      <h2>Thanh toán đơn hàng</h2>
      <div> <label>Họ tên</label> <input ref={htRef} type="text" /> </div>
      <div> <label>Số điện thoại</label> <input ref={sdtRef} type="text" /> </div>
      <div> <label>Địa chỉ</label> <input ref={diachiRef} type="text" /> </div>
      <div> <label>Email(Không bắt buộc)</label> <input ref={emRef} type="email" /> </div>
      <div><button onClick={() => submitDuLieu()} type="button">Lưu đơn hàng</button></div>
    </form>
  );

}
export default ThanhToan  
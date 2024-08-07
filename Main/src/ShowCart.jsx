import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { xoaSP, xoaGH, suaSL } from "./cartSlice";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ShowCart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.listSP);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promotionAmount, setPromotionAmount] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      let total = 0;
      let promo = 0;
      cart.forEach(item => {
        const itemTotal = Number(item.gia * item.so_luong);
        const itemPromo = Number(itemTotal - item.gia_km * item.so_luong);
        total += item.gia_km * item.so_luong; // Total price after discount
        promo += itemPromo; // Total promotion amount
      });
      setTotalPrice(total);
      setPromotionAmount(promo);
    };

    calculateTotals();
  }, [cart]);

  return (
    <div id="giohang">
      <h2>Giỏ hàng</h2>
      {cart.map((sp, index) => {
        return (
 
            <div id="cart" key={sp.id || index}>
              <table className="gh-trai">
                <tbody>
                  <tr>
                    <td><img src={sp.hinh} alt={sp.ten_sp} /></td>
                    <td><p className="ten-gh">{sp.ten_sp}</p></td>
                    <td>
                      <input
                        min="1"
                        type="number"
                        defaultValue={sp.so_luong}
                        onChange={e => dispatch(suaSL([sp.id, e.target.value]))}
                      />
                    </td>
                    <td>
                      <div className="gia-gh">
                        <p className="gia-gh-km">{Number(sp.gia_km).toLocaleString("vi")} VND</p>
                        <p className="gia-gh-t">{Number(sp.gia).toLocaleString("vi")} VND</p>
                      </div>
                    </td>
                    <td><FontAwesomeIcon onClick={() => dispatch(xoaSP(sp.id))} className="trash" icon={faTrash} /></td>
                  </tr>
                </tbody>
              </table>
            </div>

        );
      })}
      <button onClick={() => dispatch(xoaGH())}>Xóa tất cả</button>
      <div className="hoadon">
        <h3>Hoá đơn</h3>
        <div className="hoadon-tien">
        <p>Tổng tiền:</p><span>{totalPrice.toLocaleString("vi")} VND</span>
        <p>Khuyến Mãi:</p><span> {promotionAmount.toLocaleString("vi")} VND</span>
        <hr style={{ width: "90%" }} />
        <p className="thanhtoan">Thanh Toán:  </p><span>{totalPrice.toLocaleString("vi")} VND</span>

        </div>
        <button className="btn-thanhtoan"><Link to="/thanhtoan">Xác nhận thanh toán</Link></button>
      </div>
    </div>
  );
}

export default ShowCart;

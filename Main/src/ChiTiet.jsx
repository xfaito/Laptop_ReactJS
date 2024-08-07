import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SPLienQuan from "./SPLienQuan";
import { themSP } from "./cartSlice";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

function ChiTiet() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [sp, ganSP] = useState([]);
    const [ttsp, ganTTSP] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/sp/${id}`)
            .then(res => res.json())
            .then(data => ganSP(data))
        fetch(`http://localhost:3000/ttsp/${id}`)
            .then(res => res.json())
            .then(data => ganTTSP(data))
    }, [id])
    return (
        <div id='chitiet'>
            <div id="row1">
                <div id="trai"> <img className="img-ct" src={sp['hinh']} alt={sp['ten_sp']} /> </div>
                <div id="phai">
                    <p className="h3"> {sp['ten_sp']} </p>
                    <div className="ttsp">
                        <p className="ttsp-ct">RAM: {ttsp['ram']} </p>
                        <p className="ttsp-ct">Dung lượng: {ttsp['dia_cung']} </p> 
                        <p className="ttsp-ct">Màu: {ttsp['mau_sac']} </p> 
                        <p className="ttsp-ct">CPU: {ttsp['cpu']} </p>
                    </div>
                    <p className="gia-km-ct"> {Number(sp['gia_km']).toLocaleString("vi")} VNĐ</p>
                    <p className="gia-ct"> {Number(sp['gia']).toLocaleString("vi")} VNĐ</p>
                    <div className="mua">
                        <div className="cart">
                            <Link to={"/showcart"}>
                                <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
                            </Link>
                        </div>
                        <button onClick={() => dispatch(themSP(sp))}>Mua Ngay</button>
                    </div>
                </div>
            </div>
            <div id="row2">
                <SPLienQuan id_loai={sp.id_loai} />
            </div>
        </div>

    );
}
export default ChiTiet;

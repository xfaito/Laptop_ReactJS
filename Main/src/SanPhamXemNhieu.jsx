
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SanPhamXemNhieu() {
    const [listsp, ganListSP] = useState( [] );
   useEffect ( () => {
      fetch("http://localhost:3000/spxn/5")
      .then(res=>res.json()).then(data => ganListSP(data));
   } , []);
    
    return (
        <>
    <h1>Sản phẩm xem nhiều</h1>
    <div className="spxn">
        {listsp.map((sp) =>
        <div className="sp" key={sp.id}>
            <Link to={ "/sp/" + sp.id } ><img src={sp['hinh']} alt={sp['ten_sp']} /></Link>
            <h4> {sp['ten_sp']} </h4>
            <p className="gia_km">{Number(sp['gia_km']).toLocaleString('vi')} VND</p>
            <p className="gia">{Number(sp['gia']).toLocaleString('vi')} VND</p>
        </div> 
        )
        }
        </div>
    </>
    );
}

export default SanPhamXemNhieu
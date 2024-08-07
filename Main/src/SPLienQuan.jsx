/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function SPLienQuan({id_loai}) {
    const [listsp, ganListSP] = useState([]);
    const [loai, ganLoai] = useState("");


    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
      
        fetch(`http://localhost:3000/sptrongloai/${id_loai}`, { signal })
          .then(res => res.json())
          .then(data => {
            if(Array.isArray(data)) ganListSP(data);
          });
      
        fetch(`http://localhost:3000/loai/${id_loai}`, { signal })
          .then(res => res.json())
          .then(data => ganLoai(data));
      
        return () => abortController.abort(); // Cleanup function
      }, [id_loai]);
      

    return (
        <div id="listsp" >
            <h1> Sản phẩm liên quan {loai['ten_loai']}</h1>
            <div id="data">
                {listsp.slice(0, 5).map((sp, index) =>
                    <div className="sp" key={index}>
                        <Link to={"/sp/" + sp.id} ><img src={sp['hinh']} alt={sp['ten_sp']} /></Link>
                        <h4>  {sp['ten_sp']}  </h4>
                        <p className="gia_km">{Number(sp['gia_km']).toLocaleString('vi')} VND</p>
                        <p className="gia">{Number(sp['gia']).toLocaleString('vi')} VND</p>
                    </div>
                )}
            </div>
        </div>

    );
}

export default SPLienQuan;

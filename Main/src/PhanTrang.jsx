import ReactPaginate from "react-paginate";
import PropTypes from 'prop-types';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";

function HienSPTrongMotTrang({ spTrongTrang }) {  
  const dispatch = useDispatch();
  return (<div id="data">
    {spTrongTrang.map((sp, index) =>
      <div className="sp" key={index}>
      <Link to={ "/sp/" + sp.id } ><img src={sp['hinh']} alt={sp['ten_sp']} /></Link>
      <h4> {sp['ten_sp']} </h4>
      <p className="gia_km">{Number(sp['gia_km']).toLocaleString('vi')} VND</p>
      <p className="gia">{Number(sp['gia']).toLocaleString('vi')} VND</p>
      <button onClick={() => dispatch(themSP(sp))}>Mua Ngay</button>       
  </div> 
    )}
  </div>);
} //HienSPTrongMotTrang
HienSPTrongMotTrang.propTypes = {
  spTrongTrang: PropTypes.array.isRequired,
};

function PhanTrang({ listSP, pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = listSP.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(listSP.length / pageSize);
    const chuyenTrang = (event) => {
      const newIndex = (event.selected * pageSize) % listSP.length;
      setfromIndex(newIndex);
    };
    return (
     <div> <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
           <ReactPaginate nextLabel=">" previousLabel="<" pageCount={tongSoTrang} 
             pageRangeDisplayed={5} onPageChange={chuyenTrang} className="thanhphantrang" 
           />
     </div>);
  }//PhanTrang
 PhanTrang .propTypes = {
    listSP: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
  };
  
  export default PhanTrang
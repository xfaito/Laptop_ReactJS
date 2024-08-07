import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function LoaiSua () {
    const { id } = useParams();
    const [loai, setLoai] = useState({
        ten_loai: "",
    });

    useEffect(() => {
        let url = `http://localhost:3000/admin/loai/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setLoai(data))
    },[id]);
    const Navigate = useNavigate();
    const submitDuLieu = () => {
        let url = `http://localhost:3000/admin/loai/${id}`;
        let opt = {
            method: "put",
            body: JSON.stringify(loai),
            headers: { 'Content-Type': 'application/json' }
          };
        fetch(url,opt)
            .then(res => {
               if(res.ok){
                Navigate('/admin/loai');
               }
               else{
                alert("Sửa không được!!!");
               }
            })
            .catch(err => {
                console.log(err);
            })
      };
    

      const handlerChange = (e) => {
        const { name, value } = e.target;
        setLoai(prev => ({ ...prev,  [name]: value  }));
      };
    return (
        <form id="frmupdatesp">
            <h2>Thêm Loại</h2>
            <div className="row mb-3">
                <div className="col">
                    <label>Tên Loại</label>
                    <input type="text"
                    name="ten_loai" className="form-control border border-black border-opacity-70"
                        value={loai.ten_loai} onChange={handlerChange}
                    />
                </div>
                <div className="col form-check">
                    <input className="form-check-input border border-black"
                    name="an_hien" type="checkbox"
                        checked={loai.an_hien ? true : false} onChange={e => loai.an_hien = e.target.checked}
                    />
                    <label className="form-check-label"> Hiện </label>
                </div>
            </div>
            <div className="mb-3">
                <button className="btn btn-warning mx-2" type="button" 
                onClick={() => submitDuLieu()}>
                    Sửa Loại
                </button>
                <a href="/admin/loai" className="btn btn-info">
                    Danh sách Loại
                </a>
            </div>
        </form>
    );
}
export default LoaiSua
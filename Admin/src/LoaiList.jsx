import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoaiList() {
  const [loaiList, setLoaiList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/loai') 
      .then((res) => res.json())
      .then((data) => setLoaiList(data));
  }, []);

  const xoaLoai = (id) => {
    if (window.confirm("Xóa loại này?") === false) return false;
    fetch(`http://localhost:3000/admin/loai/${id}`,
        { method: "DELETE" })
      .then((res) => res.json())
      .then(() => navigate("/admin/loai"));
      window.location.reload()
  };

  return (
    <table className="table">
      <thead>
        <tr className="text-center">
          <th>Mã Loại</th>
          <th>Tên Loại</th>
          <th>Ẩn/Hiện</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {loaiList.map((loai, index) => (
          <tr key={index} className="text-center">
            <td>{loai.id}</td>
            <td>{loai.ten_loai}</td>
            <td>
              {loai.an_hien === 1 ? 'Hiện' : 'Ẩn'} 
            </td>
            <td>
              <button className="btn btn-danger mx-2" onClick={() => xoaLoai(loai.id)}>
                Xóa
              </button>
              <Link to={"/admin/loaisua/" + loai.id} className="btn btn-primary">
                Sửa
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LoaiList;

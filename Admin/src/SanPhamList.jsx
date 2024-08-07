import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import ReactPaginate from "react-paginate";

function SanPhamList() {
  const [listSP, setListSP] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/sp")
      .then((res) => res.json())
      .then((data) => setListSP(data));
  }, []);

  return (
    <div id="adminspList">
      <HienSPTrongMotTrang listSP={listSP} pageSize={10} />
    </div>
  );
}

function HienSPTrongMotTrang({ listSP, pageSize }) {
  const navigate = useNavigate();
  const xoaSP = (id) => {
    if (window.confirm("Xóa thật không ?") === false) return false;

    fetch(`http://localhost:3000/admin/sp/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => navigate("/admin/sp"));
      window.location.reload()
  };

  const [currentPage, setCurrentPage] = useState(0);
  const indexOfLastSP = (currentPage + 1) * pageSize;
  const indexOfFirstSP = indexOfLastSP - pageSize;
  const currentSPs = listSP.slice(indexOfFirstSP, indexOfLastSP);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Mã SP</th>
            <th>Ảnh</th>
            <th>Tên SP</th>
            <th>Ngày</th>
            <th>Giá</th>
            <th>Giá KM</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentSPs.map((sp, index) => (
            <tr key={index} className="text-center">
              <td>{sp.id}</td>
              <td>
                <img src={sp.hinh} alt={sp.ten_sp} width={100} />
              </td>
              <td>{sp.ten_sp}</td>
              <td>{new Date(sp.ngay).toLocaleDateString("vi")}</td>
              <td>{Number(sp['gia']).toLocaleString("vi")} VNĐ</td>
              <td>{Number(sp['gia_km']).toLocaleString("vi")} VNĐ</td>
              <td>
                <button className="btn btn-danger mx-2" onClick={() => xoaSP(sp.id)}>
                  Xóa
                </button>
                <Link to={"/admin/spsua/" + sp.id} className="btn btn-primary">
                  Sửa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        nextLabel=">"
        previousLabel="<"
        pageCount={Math.ceil(listSP.length / pageSize)}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="thanhphantrang"
        activeClassName="active"
      />
    </div>
  );
}

HienSPTrongMotTrang.propTypes = {
  listSP: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default SanPhamList;
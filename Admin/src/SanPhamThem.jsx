import { useState } from 'react';

function SanPhamThem() {
  const [sp, setSp] = useState({});
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!sp.ten_sp) {
      newErrors.ten_sp = "Vui lòng nhập tên sản phẩm.";
    }
    if (!sp.gia || isNaN(sp.gia) || sp.gia < 0) {
      newErrors.gia = "Giá là số không âm.";
    }
    if (!sp.gia_km || isNaN(sp.gia_km) || sp.gia_km < 0) {
      newErrors.gia_km = "Giá KM là số không âm.";
    }
    if (!sp.hinh) {
      newErrors.hinh = "Vui lòng nhập đường dẫn hình.";
    }
    const isValidDate = (dateString) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(dateString);
    };
    if (!sp.ngay || !isValidDate(sp.ngay)) {
      newErrors.ngay = "Vui lòng chọn ngày hợp lệ (YYYY-MM-DD).";
    }

    if (!sp.luot_xem) {
      newErrors.luot_xem = "Vui lòng nhập lượt xem.";
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const submitDuLieu = () => {
    if (validateForm()) {
      const url = 'http://localhost:3000/admin/sp';
      const opt = {
        method: "post",
        body: JSON.stringify(sp),
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(url, opt)
        .then(res => res.json())
        .then(() => {
          alert('Đã thêm');
          document.getElementById("frmaddsp").reset();
          setSp({});
          setErrors({});
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSp(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors({});
  };

  return (
    <form id="frmaddsp">
      <h2>Thêm sản phẩm</h2>

      <div className="row mb-3">
        <div className='col '>
          Tên SP
          <input
            type="text"
            className="form-control border border-black border-opacity-70"
            name="ten_sp"
            onChange={handleChange}
          />
          {errors.ten_sp && <span className="text-danger">{errors.ten_sp}</span>}
        </div>
        <div className='col'>
          Giá
          <input
            type="number"
            className="form-control border border-black"
            name="gia"
            onChange={handleChange}
          />
          {errors.gia && <span className="text-danger">{errors.gia}</span>}
        </div>
        <div className='col'>
          Giá KM
          <input
            type="number"
            className="form-control border border-black"
            name="gia_km"
            onChange={handleChange}
          />
          {errors.gia_km && <span className="text-danger">{errors.gia_km}</span>}
        </div>
      </div>
      <div className="row mb-3">
        <div className='col'>
          Hình
          <input
            type="text"
            className="form-control border border-black"
            name="hinh"
            onChange={handleChange}
          />
          {errors.hinh && <span className="text-danger">{errors.hinh}</span>}
        </div>
        <div className='col'>
          Ngày
          <input
            type="date"
            className="form-control border border-black"
            name="ngay"
            onChange={handleChange}
          />
          {errors.ngay && <span className="text-danger">{errors.ngay}</span>}
        </div>
        <div className='col'>
          Lượt xem
          <input
            type="number"
            className="form-control border border-black"
            name="luot_xem"
            onChange={handleChange}
          />
          {errors.luot_xem && <span className="text-danger">{errors.luot_xem}</span>}
        </div>
      </div>
      <div className='mb-3'>
        <button className="btn btn-warning" type="button" onClick={submitDuLieu}>Thêm sản phẩm</button> &nbsp;
        <a href="/admin/sp" className='btn btn-info'>Danh sách</a>
      </div>
    </form>
  );
}

export default SanPhamThem;

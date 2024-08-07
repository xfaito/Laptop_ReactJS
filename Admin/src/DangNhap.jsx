import { useState } from "react";
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

function DangNhap() {
  let unRef = React.createRef();
  let pwRef = React.createRef();
  const [sp, setSp] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!sp.un) {
      newErrors.un = "Vui lòng nhập tên đăng nhập.";
    }
    if (!sp.pw) {
      newErrors.pw = "Vui lòng nhập mật khẩu.";
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const submitDuLieu = () => {
    if (validateForm()) {
      const url = "http://localhost:3000/dangnhap";
      let sp = { un: unRef.current.value, pw: pwRef.current.value };
      const opt = {
        method: "POST",
        body: JSON.stringify(sp),
        headers: { "Content-Type": "application/json" },
      };

      fetch(url, opt)
        .then((res) => {
          if (!res.ok) {
            if (res.status === 401) {
              throw new Error("Đăng nhập thất bại. Kiểm tra lại thông tin đăng nhập.");
            } else if (res.status === 500) {
              throw new Error("Lỗi server. Vui lòng thử lại sau.");
            } else {
              throw new Error("Đăng nhập thất bại.");
            }
          }
          return res.json();
        })
        .then((data) => {
          dispatch(dalogin(data));
          navigate("/");
        })
        .catch((error) => {
          setErrors({ form: error.message });
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form id="frmlogin" className="col-7 m-auto border border-secondary mt-5">
      <h2 className="h5 p-2 border-bottom border-secondary">Thành viên đăng nhập</h2>
      <div className="m-3">
        Tên đăng nhập
        <input
          className="form-control border border-secondary"
          type="text"
          ref={unRef}
          name="un"
          onChange={handleChange}
        />
        {errors.un && <div className="text-danger">{errors.un}</div>}
      </div>
      <div className="m-3">
        Mật khẩu
        <input
          className="form-control border border-secondary"
          type="password"
          ref={pwRef}
          name="pw"
          onChange={handleChange}
        />
        {errors.pw && <div className="text-danger">{errors.pw}</div>}
      </div>
      <div className="m-3">
        <button
          className="btn btn-info bg-white border border-secondary"
          type="button"
          onClick={submitDuLieu}
        >
          Đăng nhập
        </button>
        <button className="btn btn-info bg-white border border-secondary ms-1">
          <Link className="text-black" to={"/dangky"}>
            Đăng ký
          </Link>
        </button>
        <button className="btn btn-info bg-white border border-secondary ms-1">
          <Link className="text-black" to={"/doimatkhau"}>
            Đổi mật khẩu
          </Link>
        </button>
      </div>
      {errors.form && <div className="text-danger">{errors.form}</div>}
    </form>
  );
}

export default DangNhap;

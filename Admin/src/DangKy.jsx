import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DangKy() {
  let emailRef = React.createRef();
  let unRef = React.createRef();
  let pwRef = React.createRef();
  const [sp, setSp] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!sp.email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/\S+@\S+\.\S+/.test(sp.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ.";
    }
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
      const url = "http://localhost:3000/dangky";
      let sp = {
        email: emailRef.current.value,
        un: unRef.current.value,
        pw: pwRef.current.value,
      };
      console.log(sp);
      
      const opt = {
        method: "POST",
        body: JSON.stringify(sp),
        headers: { "Content-Type": "application/json" },
      };

      fetch(url, opt)
        .then((res) => res.json())
        .then(() => {
          navigate("/");
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
    <form id="frmregister" className="col-7 m-auto border border-secondary mt-5">
      <h2 className="h5 p-2 border-bottom border-secondary">Thành viên đăng ký</h2>
      <div className="m-3">
        Email
        <input
          className="form-control border border-secondary"
          ref={emailRef}
          type="email"
          name="email"
          onChange={handleChange}
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}
      </div>
      <div className="m-3">
        Tên đăng nhập
        <input
          className="form-control border border-secondary"
          ref={unRef}
          type="text"
          name="un"
          onChange={handleChange}
        />
        {errors.un && <span className="text-danger">{errors.un}</span>}
      </div>
      <div className="m-3">
        Mật khẩu
        <input
          className="form-control border border-secondary"
          ref={pwRef}
          type="password"
          name="pw"
          onChange={handleChange}
        />
        {errors.pw && <span className="text-danger">{errors.pw}</span>}
      </div>
      <div className="m-3">
        <button
          className="btn btn-info bg-white border border-secondary"
          type="button"
          onClick={submitDuLieu}
        >
          Đăng ký
        </button>
      </div>
    </form>
  );
}

export default DangKy;

import { useState } from 'react';

function DoiPass() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email không bỏ chống';
    if (!formData.password) errors.password = 'Nhập mật khẩu hiện tại';
    if (!formData.newPassword) errors.newPassword = 'Nhập mật khẩu mới';
    if (formData.newPassword !== formData.confirmPassword) errors.confirmPassword = 'Mật khẩu không trùng nhau';
    return errors;
  };

  const submitDuLieu = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const url = "http://localhost:3000/doimatkhau";
      const opt = {
        method: "POST",
        body: JSON.stringify({
          em: formData.email,
          pw: formData.password,
          newPw: formData.newPassword
        }),
        headers: { "Content-Type": "application/json" }
      };

      const response = await fetch(url, opt);
      const data = await response.json();

      if (response.ok) {
        setMessage(data.thongbao);
      } else {
        setMessage('Server error');
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error');
    }
  };

  return (
    <form id="frmlogin" className="col-7 m-auto border border-secondary mt-5">
      <h2 className="h5 p-2 border-bottom border-secondary">Đổi Mật Khẩu</h2>
      <div className="m-3">
        Email
        <input
          className="form-control border border-secondary"
          type="text"
          name="email"
          onChange={handleChange}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>
      <div className="m-3">
        Mật Khẩu
        <input
          className="form-control border border-secondary"
          type="password"
          name="password"
          onChange={handleChange}
        />
        {errors.password && <div className="text-danger">{errors.password}</div>}
      </div>
      <div className="m-3">
        Mật khẩu mới
        <input
          className="form-control border border-secondary"
          type="password"
          name="newPassword"
          onChange={handleChange}
        />
        {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
      </div>
      <div className="m-3">
        Nhập lại mật khẩu mới
        <input
          className="form-control border border-secondary"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
      </div>
      <div className="m-3">
        <button
          className="btn btn-info bg-white border border-secondary"
          type="button"
          onClick={submitDuLieu}
        >
          Đổi mật khẩu
        </button>
      </div>
      {message && <div className="m-3 text-success">{message}</div>}
    </form>
  );
}

export default DoiPass;

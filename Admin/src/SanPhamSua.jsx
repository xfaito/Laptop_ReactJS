import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SanPhamSua() {
    const { id } = useParams();
    const [sp, setSP] = useState({
        ten_sp: "",
        gia: 0,
        gia_km: 0,
        hinh: "",
        ngay: "",
        luot_xem: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let url = `http://localhost:3000/admin/sp/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setSP(data));
    }, [id]);

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

    const Navigate = useNavigate();
    const submitDuLieu = () => {
        if (validateForm()) {
            let url = `http://localhost:3000/admin/sp/${id}`;
            let opt = {
                method: "put",
                body: JSON.stringify(sp),
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(url, opt)
                .then(res => {
                    if (res.ok) {
                        Navigate('/admin/sp');
                    } else {
                        alert("Sửa không được!!!");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSP(prev => ({ ...prev, [name]: value }));
        setErrors({});
    };

    return (
        <form id="frmfixsp">
            <h2>Sửa sản phẩm</h2>
            <div className="row mb-3">
                <div className='col'>
                    Tên SP
                    <input
                        type="text"
                        name="ten_sp"
                        className="form-control border border-black border-opacity-70"
                        value={sp.ten_sp}
                        onChange={handleChange}
                    />
                    {errors.ten_sp && <span className="text-danger">{errors.ten_sp}</span>}
                </div>
                <div className='col'>
                    Giá
                    <input
                        type="number"
                        name="gia"
                        className="form-control border border-black"
                        value={sp.gia}
                        onChange={handleChange}
                    />
                    {errors.gia && <span className="text-danger">{errors.gia}</span>}
                </div>
                <div className='col'>
                    Giá KM
                    <input
                        type="number"
                        name="gia_km"
                        className="form-control border border-black"
                        value={sp.gia_km}
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
                        name="hinh"
                        className="form-control border border-black"
                        value={sp.hinh}
                        onChange={handleChange}
                    />
                    {errors.hinh && <span className="text-danger">{errors.hinh}</span>}
                </div>
                <div className='col'>
                    Ngày
                    <input
                        type="date"
                        name="ngay"
                        className="form-control border border-black"
                        value={sp.ngay}
                        onChange={handleChange}
                    />
                    {errors.ngay && <span className="text-danger">{errors.ngay}</span>}
                </div>
                <div className='col'>
                    Lượt xem
                    <input
                        type="number"
                        name="luot_xem"
                        className="form-control border border-black"
                        value={sp.luot_xem}
                        onChange={handleChange}
                    />
                    {errors.luot_xem && <span className="text-danger">{errors.luot_xem}</span>}
                </div>
            </div>
            <div className='mb-3'>
                <button className="btn btn-warning" type="button" onClick={submitDuLieu}>Sửa sản phẩm</button> &nbsp;
                <a href="/admin/sp" className='btn btn-info'>Danh sách</a>
            </div>
        </form>
    );
}

export default SanPhamSua;

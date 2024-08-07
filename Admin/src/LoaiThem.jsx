
function LoaiThem() {
    let loai = {};

    const submitDuLieu =  () => {
            const url = 'http://localhost:3000/admin/loai'; 
            const opt = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loai),
            };
            fetch(url, opt)
            .then(res => res.json())
            .then(() => {
              alert('Đã thêm');
              document.getElementById("frmaddsp").reset(); 
              loai = {};
            })
    };
    submitDuLieu;

    return (
        <form id="frmaddsp">
            <h2>Thêm Loại</h2>
            <div className="row mb-3">
                <div className="col">
                    <label>Tên Loại</label>
                    <input type="text" className="form-control border border-black border-opacity-70"
                         onChange={e => loai.ten_loai = e.target.value}
                    />
                </div>
                <div className="col form-check">
                    <input className="form-check-input border border-black" type="checkbox"
                        onChange={e => loai.an_hien = e.target.checked}
                    />
                    <label className="form-check-label"> Hiện </label>
                </div>
            </div>
            <div className="mb-3">
                <button className="btn btn-warning mx-2" type="button" 
                onClick={() => submitDuLieu()}>
                    Thêm Loại
                </button>
                <a href="/admin/loai" className="btn btn-info">
                    Danh sách Loại
                </a>
            </div>
        </form>
    );
}

export default LoaiThem;

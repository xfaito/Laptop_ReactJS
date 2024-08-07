import mysql from 'mysql';
import express from "express";
import cors from 'cors';

const app = express();

app.use([cors(), express.json()]);

const db = mysql.createConnection({
  host: 'localhost', user: 'root', password: '', port: 3306, database: 'laptop_react'
});

db.connect(err => { if (err) throw err; console.log('Da ket noi database') });
app.listen(3000, () => console.log(`Ung dung dang chay voi port 3000`));

//lay san pham moi
app.get('/spmoi/:sosp', function (req, res) {
  let sosp = parseInt(req.params.sosp || 6);
  if (sosp <= 1) sosp = 6;
  let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE an_hien = 1 ORDER BY ngay DESC LIMIT 0, ?`;
  db.query(sql, sosp, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy list sp", err })
    else res.json(data);
  });
})
//lay san pham xem nhieu
app.get('/spxn/:sosp', function (req, res) {
  let sosp = parseInt(req.params.sosp || 6);
  if (sosp <= 1) sosp = 6;
  let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE luot_xem >=500 ORDER BY ngay DESC LIMIT 0, ?`;
  db.query(sql, sosp, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy list sp", err })
    else res.json(data);
  });
})
//lay san pham hot
app.get('/sphot/:sosp', function (req, res) {
  let sosp = parseInt(req.params.sosp || 6);
  if (sosp <= 1) sosp = 6;
  let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE an_hien = 1 AND hot = 1 ORDER BY ngay DESC LIMIT 0, ?`;
  db.query(sql, sosp, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy list sp", err })
    else res.json(data);
  });
})

//chi tiet 1 san pham
// app.get('/sp/:id', function(req, res) {
//   let id = parseInt(req.params.id || 0);
//   if (isNaN(id) || id <= 0) {
//     res.json({ "thongbao": "Không biết sản phẩm", "id": id });
//     return;
//   }

//   let sql = `
//       SELECT * FROM san_pham WHERE id = ?;
//       SELECT * FROM thuoc_tinh WHERE id_sp = ?;
//   `;
//   console.log(sql);

//   db.query(sql, [id, id], (err, data) => {
//     console.log(sql, id);
//     if (err) {
//       res.json({ "thongbao": "Lỗi lấy 1 sp", err });
//     } else if (!data[0] || !data[0].length) {
//       res.json({ "thongbao": "Sản phẩm không tồn tại", "id": id });
//     } else {
//       let sp = data[0][0];
//       let tt = data[1][0]; 
//       let obj = Object.assign(sp, tt);
//       res.json(obj);
//     }
//   });
// });
//chi tiet 1 sp
app.get('/sp/:id', function (req, res) {
  let id = parseInt(req.params.id || 0);
  if (isNaN(id) || id <= 0) {
    res.json({ "thongbao": "Không biết sp", "id": id });
    return;
  }
  let sql = `
      SELECT * FROM san_pham WHERE id = ?;
  `;
  db.query(sql, id, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err })
    else res.json(data[0]);
  });
})
//Lay thong tin cua 1 
app.get('/ttsp/:id', function (req, res) {
  let id = parseInt(req.params.id || 0);
  if (isNaN(id) || id <= 0) {
    res.json({ "thongbao": "Không biết sp", "id": id });
    return;
  }
  let sql = `
      SELECT * FROM thuoc_tinh WHERE id = ?;
  `;
  db.query(sql, id, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err })
    else res.json(data[0]);
  });
})
//lay loai
app.get('/loai', function (req, res) {
  let sql = `SELECT * FROM loai WHERE an_hien = 1`;
  db.query(sql, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy list loai", err })
    else res.json(data);
  });
})
//lay sp trong loai
app.get('/sptrongloai/:id_loai', function (req, res) {
  let id_loai = parseInt(req.params.id_loai);
  if (isNaN(id_loai) || id_loai <= 0) {
    res.json({ "thong bao": "Không biết sp trong loai", "id_loai": id_loai }); return;
  }
  let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE id_loai = ? and an_hien = 1 ORDER BY id DESC
    
    `

  db.query(sql, [id_loai], (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err })
    else res.json(data);
  });
})

// lay 1 loai
app.get('/loai/:id_loai', function (req, res) {
  let id_loai = parseInt(req.params.id_loai || 0);
  if (isNaN(id_loai) || id_loai <= 0) {
    res.json({ "thong bao": "Không biết loai", "id_loai": id_loai }); return;
  }
  let sql = `SELECT id, ten_loai FROM loai WHERE id = ?`
  db.query(sql, id_loai, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err })
    else res.json(data[0]);
  });
});

//luadonhang
app.post('/luudonhang', function (req, res) {
  let data = req.body;
  let sql = "INSERT INTO don_hang SET ?";
  let id_dh;
  db.query(sql, data, (err, data) => {
    if (err) res.json({ "id_dh": -1, "thongbao": "Lỗi lấy 1 sp", err })
    else {
      id_dh = data.insertId
      res.json({ "id_dh": id_dh, "thongbao": "Đã lưu đơn hàng" });
    }
  });
});

//luagiohang
app.post('/luugiohang', function (req, res) {
  let data = req.body;
  let sql = "INSERT INTO don_hang_chi_tiet SET ?";
  db.query(sql, data, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lưu sp", err })
    else {
      res.json({ "thongbao": "Đã lưu", "id_sp": data.id_sp });
    }
  });
});

//timkiem
app.get('/timkiem', function (req, res) {
  let searchTerm = req.query.ten_sp || "";
  searchTerm = searchTerm.replace(/[%_&\\/\\\\]/g, "");
  let sql = `
    SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham
    WHERE ten_sp LIKE '%${searchTerm}%'
  `;
  db.query(sql, (err, data) => {
    if (err) {
      res.json({ "thongbao": "Lỗi tìm kiếm", err });
    } else {
      res.json(data);
    }
  });
});

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import mysql from 'mysql';
import express from "express";
import cors from 'cors';
import jwt from 'node-jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
// const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync('private-key.txt');

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



//admin lay danh sach sp
app.get('/admin/sp', function (req, res) {
  let sql = 'SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem FROM san_pham ORDER BY id asc';

  db.query(sql, (err, data) => {
    if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
    else res.json(data);
  });
});

//admin chi tiet 1 sp
app.get('/admin/sp/:id', function(req, res) {
  let id = parseInt(req.params.id);
  if (id <= 0) {
      res.json({"thong bao": "Không biết sản phẩm", "id": id});
      return;
  }
  let sql = 'SELECT * FROM san_pham WHERE id = ?';
  db.query(sql, id, (err, data) => {
      if (err) res.json({"thongbao": "Lỗi lấy 1 sp", err });
      else res.json(data[0]);
  });
});

//admin them sp 
app.post('/admin/sp', function (req, res) {
  let data = req.body;

  let sql = 'INSERT INTO san_pham SET ?';
  db.query(sql, data, (err, data) => {
      if (err) res.json({"thongbao": "Lỗi chèn 1 sp", err });
      else res.json({"thongbao": "Đã chèn 1 sp", "id": data.insertId });
  });
});

//admin sua sp
app.put('/admin/sp/:id', function (req, res) {
  let data = req.body;
  let id = req.params.id;
  let sql = 'UPDATE san_pham SET ? WHERE id = ?';
  db.query(sql, [data, id], (err, d) => {
      if (err) res.json({"thongbao": "Lỗi cập nhật sp", err });
      else res.json({"thongbao": "Đã cập nhật sp"});
  });
});

//admin xoa sp
app.delete('/admin/sp/:id', function (req, res) {
  let id = req.params.id;
  let sql = 'DELETE FROM san_pham WHERE id = ?';
  db.query(sql, id, (err, d) => {
      if (err) res.json({"thongbao": "Lỗi khi xóa sp", err });
      else res.json({"thongbao": "Đã xóa sp" });
  });
});


//admin lay list loai
app.get('/admin/loai', function (req, res) {
  let sql = 'SELECT * FROM loai ORDER BY id asc';
  db.query(sql, (err, data) => {
      if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
      else res.json(data);
  });
});

//admin chi tiet 1 loai
app.get('/admin/loai/:id', function (req, res) {
  let id = parseInt(req.params.id);
  if (id <= 0) {
      res.json({ "thong bao": "Không biết loai", "id": id });
      return;
  }
  let sql = 'SELECT * FROM loai WHERE id = ?';
  db.query(sql, id, (err, data) => {
      if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err });
      else res.json(data[0]);
  });
});

//admin them loai
app.post('/admin/loai', function (req, res) {
  let data = req.body;
  let sql = 'INSERT INTO loai SET ?';
  db.query(sql, data, (err, data) => {
      if (err) res.json({ "thongbao": "Lỗi chèn 1 sp", err });
      else res.json({ "thongbao": "Đã chèn 1 sp", "id": data.insertId });
  });
});

//admin sua loai
app.put('/admin/loai/:id', function (req, res) {
  let data = req.body;
  let id = req.params.id;
  let sql = 'UPDATE loai SET ? WHERE id = ?';
  db.query(sql, [data, id], (err, d) => {
      if (err) res.json({ "thongbao": "Lỗi cập nhật sp", err });
      else res.json({ "thongbao": "Đã cập nhật sp" });
  });
});

//admin xoa loai
app.delete('/admin/loai/:id', function (req, res) {
  let id = req.params.id;
  let sql = 'DELETE FROM loai WHERE id = ?';
  db.query(sql, id, (err, d) => {
      if (err) res.json({ "thongbao": "Lỗi khi xóa sp", err });
      else res.json({ "thongbao": "Đã xóa sp" });
  });
});
//dang ky

app.post("/dangky", (req, res) => {
  const em = req.body.email;
  const pw = req.body.pw;
  const un = req.body.un;

  console.log(em, pw, un);

  let sql = `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`;
  bcrypt.hash(pw, 10, (err, hash) => {
    db.query(sql, [em, hash, un], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ "thongbao": "Lỗi server", err });
      }
      res.status(200).json({ "thongbao": "Đã đăng ký" });
    })
  })
})


//dang nhap

app.post("/dangnhap", (req, res) => {
  const un = req.body.un;
  const pw = req.body.pw;

  let sqlCheckUser = `SELECT * FROM users WHERE name = ?`;
  db.query(sqlCheckUser, [un], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ "thongbao": "Lỗi server", err });
    }
    if (data.length > 0) {
      const userInfo = data[0];      
      bcrypt.compare(pw, userInfo.password, (err, checkUser) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ "thongbao": "Lỗi server", err });
        }        
        if (checkUser) {
          const jwtBearToken = jwt.sign(
            {},
            PRIVATE_KEY,
            { algorithm: "RS256", expiresIn: 120, subject: String(userInfo.id) }
          );
          res.status(200).json({
            "thongbao": "Dang nhap thanh cong",
            token: jwtBearToken,
            expiresIn: 120,
            userInfo: userInfo
          });
        } else {
          res.status(401).json({ "thongbao": "Sai mật khẩu" }); 
        }
      });
    } else {
      res.status(401).json({ "thongbao": "Dang nhap that bai" });
    }
  });
});

// doi mat khau

app.post("/doimatkhau", (req, res) => {
  const em = req.body.em;
  const pw = req.body.pw;
  const newPw = req.body.newPw;
  let sql = `UPDATE users SET password = ? WHERE email = ?`;
  bcrypt.hash(newPw, 10, (err, hash) => {
    db.query(sql, [hash, em], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ "thongbao": "Lỗi server", err });
      }
      res.status(200).json({ "thongbao": "Đã đổi mật khẩu" });
    })
  })
})
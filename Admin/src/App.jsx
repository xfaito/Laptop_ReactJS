import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './Admin';
import NotFound from './NotFound';
import Menu from './Menu';
import SanPhamList from './SanPhamList';
import SanPhamThem from './SanPhamThem';
import SanPhamSua from './SanPhamSua';
import LoaiList from './LoaiList';
import LoaiThem from './LoaiThem';
import LoaiSua from './LoaiSua';
import DangNhap from './DangNhap';
import DangKy from './DangKy';
import Doipass from './DoiPass';
import Download from './Download';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function App() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.token);

  return (
    <BrowserRouter basename='/'>
      <div className="container">
        <header>
          <div className="userinfo">
            {user ? " Xin chào "  + user.name : "chào"}
          </div>
        </header>
        <nav> <Menu />  </nav>
        <main><Routes>
          <Route path="/dangnhap" element={<DangNhap />} />
          <Route path="/dangky" element={<DangKy />} />
          <Route path="/doimatkhau" element={<Doipass />} />
          <Route path="/download" element={token === true ? <Download /> : < Navigate to='/dangnhap' />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" exact element={<Admin />} />
            <Route path="/admin/sp" element={<SanPhamList />} />
            <Route path="/admin/spthem" element={<SanPhamThem />} />
            <Route path="/admin/spsua/:id" element={<SanPhamSua />} />
            <Route path="/admin/loai" element={<LoaiList />} />
            <Route path="/admin/loaithem" element={<LoaiThem />} />
            <Route path="/admin/loaisua/:id" element={<LoaiSua />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
        </main>
        <footer><p>Họ tên sinh viên: leminhthinh-ps34148</p> </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;

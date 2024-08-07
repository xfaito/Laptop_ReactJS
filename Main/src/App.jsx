import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './menu';
import Home from './Home';
import TimKiem from './TimKiem';
import ChiTiet from './ChiTiet';
import GioiThieu from './GioiThieu';
import NotFound from './NotFound';
import SPTrongLoai from './SPTrongLoai';
import ShowCart from './ShowCart';
import ThanhToan from './ThanhToan';
import Header from './Header';
// var sotin = 10;
function App() {
  return (
    <BrowserRouter basename='/'>
      <div className="container">
        <Header />
        <nav> <Menu /> </nav>
        <main className='box'>
          <article className='col-md-9'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/gioithieu' element={<GioiThieu />} />
              <Route path='/sp/:id' element={<ChiTiet />} />
              <Route path='/loai/:id_loai' element={<SPTrongLoai />} />
              <Route path='/timkiem' element={<TimKiem />} />
              <Route path='/showcart' element={<ShowCart />} />
              <Route path='/thanhtoan' element={<ThanhToan />} />
              <Route element={<NotFound />} />
            </Routes>
          </article>
        </main>
        <footer><p>Đây là trang web bán laptop làm bằng React. Của Lê Minh Thịnh-PS34148</p></footer>
      </div>
    </BrowserRouter>


  );
}

export default App

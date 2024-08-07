import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thoat } from "./authSlice";
function Menu() {
    const dispatch = useDispatch();
    return (
        <div id="menu">
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fw-semibold" aria-current="page" to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý loại
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={"/admin/loaithem"}>Thêm loại</Link></li>
                                    <li><Link className="dropdown-item" to={"/admin/loai"}>Danh sách loại</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý sản phẩm
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={"/admin/spthem"} >Thêm sản phẩm</Link></li>
                                    <li><Link className="dropdown-item" to={"/admin/sp"}>Danh sách sản phẩm</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản đơn hàng
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="#">Xem đơn hàng mới</Link></li>
                                    <li><Link className="dropdown-item" href="#">Danh sách đơn hàng</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/dangnhap"} >Đăng nhập</Link>
                            </li>
                            <button className="btn btn-outline-failure" ><Link className="nav-link" to={"/dangnhap"} onClick={() => { dispatch(thoat()) }}>Thoát</Link></button>

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 border border-black" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav></div>
    )
}
export default Menu;
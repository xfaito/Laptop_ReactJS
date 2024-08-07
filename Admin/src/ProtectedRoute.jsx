import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import  { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const token = useSelector(state => state.auth.token);
  console.log("daDangNhap=", token);
  if (!token)  return <Navigate to="/dangnhap"/>
  else return ( <Outlet/>);
};
export default ProtectedRoute;

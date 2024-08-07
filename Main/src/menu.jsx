import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function Menu() {
    const[listloai, setlistloai] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/loai")
        .then(res => res.json())
        .then(data =>{if(Array.isArray(data)) setlistloai(data)})
    },[])
    return ( <ul>
        <li> <Link to={"/"}> Trang chủ </Link>  </li>  
        { listloai.map( (loai, i) => 
         <li key={i}> <Link to= {"/loai/"+ loai.id} > {loai.ten_loai} </Link> </li>  
        )
        }
        <li> <Link to= "/gioithieu" > Giới thiệu </Link> </li>
        </ul>)
    }

export default Menu
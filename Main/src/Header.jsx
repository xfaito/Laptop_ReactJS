// import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { useState } from "react";
import TimKiem from "./TimKiem";
// import KqTimKiemList from "./KqTimKiemList";


function Header() {
    return (
        <header className="header">
                <Link to={"/"} className="logo"> <img className="logo-img" src="./img/logo.png" alt="" />LOGO </Link>
            <div className="search-bar-container">
            <div className="search">
                <TimKiem />  {/* setResult={setResult} */}
                <div className="search-results">
                    {/* <KqTimKiemList result={result}/> */}
                </div>
                
            </div>
            </div>
            <div className="user-box">
                <div className="user">
                    <Link to={"/login"}>
                        <FontAwesomeIcon className="user-icon" icon={faUser} />
                    </Link>
                </div>
                <div className="cart">
                    <Link to={"/showcart"}>
                        <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
export default Header
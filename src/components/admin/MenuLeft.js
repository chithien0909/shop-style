import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RESET_BASKET } from "../../actions/types";

function MenuLeft() {
  const [user, setUser] = useState("");
  const [hamburger, setHamburger] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchDataFromForm() {
      setUser(localStorage.getItem("user"));
    }
    fetchDataFromForm();
  }, [hamburger]);

  function logOut() {
    dispatch({
      type: RESET_BASKET,
    });
    localStorage.clear();
    history.push("/");
  }

  function logIn() {
    history.push("/login");
  }

  function showMenuLeft() {
    const menuLeft = document.querySelector(".menu-left");
    menuLeft.classList.toggle("close-menu");
    setHamburger(!hamburger);
  }

  return (
    <div className="left">
      <div className="main-header">
        <div className="menu-left">
          <h3>KStore</h3>
          <ul className="list-item">
            <Link to="/">
              <i className="fas fa-home"></i>
              <li>Cửa hàng</li>
            </Link>
            {localStorage.getItem("role") === "employee1" ||
            localStorage.getItem("role") === "admin" ? (
              <Link to="/list-product">
                <i className="fas fa-table"></i>
                <li>Sản phẩm</li>
              </Link>
            ) : (
              ""
            )}
            {localStorage.getItem("role") === "employee1" ||
            localStorage.getItem("role") === "admin" ? (
              <Link to="/list-order">
                <i className="fas fa-pen"></i>
                <li>Đơn hàng</li>
              </Link>
            ) : (
              ""
            )}
            {localStorage.getItem("role") === "admin" ? (
              <Link to="/bar-chart">
                <i className="fas fa-chart-bar"></i>
                <li>Thống kê </li>
              </Link>
            ) : (
              ""
            )}
            {localStorage.getItem("role") === "employee2" ||
            localStorage.getItem("role") === "admin" ? (
              <Link to="/list-user">
                <i className="fas fa-users"></i>
                <li>Người dùng</li>
              </Link>
            ) : (
              ""
            )}
            {localStorage.getItem("role") === "employee2" ? (
              <Link to="/list-chat">
                <i className="fas fa-comment"></i>
                <li>Tin nhắn</li>
              </Link>
            ) : (
              ""
            )}
          </ul>

          {user ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <button onClick={logIn}>LogIn</button>
          )}
        </div>

        <div className="hamburger" onClick={showMenuLeft}>
          {hamburger === true ? (
            <i className="fas fa-chevron-circle-left"></i>
          ) : (
            <i className="fas fa-chevron-circle-right"></i>
          )}
        </div>

        <div className="user-avatar">
          Xin chào, {localStorage.getItem("user").split("@")[0]}
        </div>
      </div>
    </div>
  );
}

export default MenuLeft;

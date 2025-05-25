import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
import SideCart from "../../product/cartSideBar/CartSideBar"; // adjust path as needed
import "./css/Header.module.scss";
import { cartContext } from "../../../../store/user/product/Cart";
import { Link, useLocation } from "react-router-dom";
import { ToastContext } from "../../../../store/ToastContext";
import { SideCartContext } from "../../../../store/user/sideCart/SideCartContext";

const Header = () => {
  const { isOpen, toggleCart } = useContext(SideCartContext);
  const { cartProducts } = useContext(cartContext);

  const { toast, showToast } = useContext(ToastContext);
    const location = useLocation();
  
    useEffect(() => {
      if (location.state?.toastMessage) {
        showToast(location.state.toastMessage, location.state.toastType);
        window.history.replaceState({}, document.title);
      }
    }, [location]);

  return (
    <>
      {toast?.message && (
        <div
          className={`toast align-items-center text-bg-${toast.type} position-fixed top-0 end-0 m-3 show`}
          role="alert"
          style={{ zIndex: 9999 }}
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
          </div>
        </div>
      )}
      <header className="rounded-pill p-2 px-4 d-flex align-items-center justify-content-between mt-3 mx-auto">
        {/* Left - Logo and Menu */}
        <div className="d-flex align-items-center gap-3">
          <FaBars className="text-muted" />
          <Link to={"/"}>
            <img src="/images/logo.png" alt="Logo" style={{ height: "40px" }} />
          </Link>
        </div>

        {/* Middle - Search Bar */}
        <div className="flex-grow-1 mx-4">
          <div className="input-group rounded-pill overflow-hidden">
            <span className="input-group-text bg-white border-0">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search for Products..."
              aria-label="Search"
            />
            <button className="btn btn-dark text-white px-4 rounded-end-pill">Search</button>
          </div>
        </div>

        {/* Right - Icons */}
        <div className="d-flex align-items-center gap-3 position-relative">
          <FaUser className="text-muted" />
          <div className="position-relative">
            <FaHeart className="text-muted" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </div>
          <div className="position-relative" onClick={toggleCart} style={{ cursor: "pointer" }}>
            <FaShoppingCart className="text-muted" />
            {cartProducts.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartProducts.length}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Side Cart Overlay */}
      <SideCart 
        isOpen={isOpen} 
        toggleCart={toggleCart} 
      />
    </>
  );
};

export default Header;

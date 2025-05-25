import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./SideBar.module.css";
import { useContext } from "react";
import { categoriesList } from "../../../store/CategoriesList";
import { FaShoppingBag } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { TbAlignBoxTopRight } from "react-icons/tb";
import { RiApps2AiLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa6";
import { TbBrandBebo } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { sideBarData } = useContext(categoriesList);
  const { pathname } = useLocation();

  const { t } = useTranslation('sidebar');

  const { storeName, product, productCategories, productAttributes, productSpecifications, brands } = t('text')

  return (
    
    <div
      className={`${styles["side-bar-container"]} d-flex flex-column flex-shrink-0 p-3 text-bg-dark`}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg
          className="bi pe-none me-2"
          width="40"
          height="32"
          aria-hidden="true"
        >
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">{ storeName }</span>
      </a>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li
          className="nav-item"
          onClick={() => sideBarData.setActivePage("products")}
        >
          <Link
            to={"/admin/products"}
            className={`${
              pathname.includes("products") | (pathname === "/") ? "active" : ""
            } nav-link text-white`}
            aria-current="page"
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#home"></use>
            </svg>
            <FaShoppingBag /> { product }
          </Link>
        </li>
        <li onClick={() => sideBarData.setActivePage("categories")}>
          <Link
            to={"/admin/categories"}
            href="#"
            className={`${
              pathname.includes("categor") ? "active" : ""
            } nav-link text-white`}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2"></use>
            </svg>
            <FaBoxArchive /> { productCategories }
          </Link>
        </li>
        <li onClick={() => sideBarData.setActivePage("attributes")}>
          <Link
            to={"/admin/all-attributes"}
            href="#"
            className={`${
              (pathname === "/add-attribute") |
              (pathname === "/edit-attribute") |
              (pathname === "/all-attributes")
                ? "active"
                : ""
            } nav-link text-white`}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2"></use>
            </svg>
            <TbAlignBoxTopRight /> { productAttributes }
          </Link>
        </li>
        <li onClick={() => sideBarData.setActivePage("attributes")}>
          <Link
            href="#"
            className={`${pathname.includes("specification") ? "active" : ""} ${
              styles["list-button"]
            } nav-link text-white btn-toggle text-decoration-none collapsed `}
            data-bs-toggle="collapse"
            data-bs-target={`#product-specification`}
            aria-expanded="true"
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2"></use>
            </svg>
            <RiApps2AiLine /> { productSpecifications }
          </Link>
          <div
            className={`${styles["sub-category"]}  collapse`}
            id={"product-specification"}
          >
            {" "}
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="ms-2">
                <Link
                  to={"/admin/specification-groups"}
                  className={`${
                    pathname === "/specification-groups" ? "bg-secondary" : ""
                  } bg-opacity-10 nav-link text-white`}
                >
                  <svg
                    className="bi pe-none me-2"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#speedometer2"></use>
                  </svg>
                  <FaRegCircle className={`${styles.icon}`} /> Specification
                  Groups
                </Link>
              </li>
              <li className="ms-2">
                <Link
                  to={"/admin/specification-attributes"}
                  className={`${
                    pathname === "/specification-attributes"
                      ? "bg-secondary"
                      : ""
                  } nav-link text-white bg-opacity-10`}
                >
                  <svg
                    className="bi pe-none me-2"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#speedometer2"></use>
                  </svg>
                  <FaRegCircle className={`${styles.icon}`} /> Specification
                  Attributes
                </Link>
              </li>
              <li className="ms-2">
                <Link
                  to={"/admin/specification-tables"}
                  className={`${
                    pathname === "/specification-tables" ? "bg-secondary" : ""
                  } nav-link text-white bg-opacity-10`}
                >
                  <svg
                    className="bi pe-none me-2"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#speedometer2"></use>
                  </svg>
                  <FaRegCircle className={`${styles.icon}`} /> Specification
                  Tables
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li onClick={() => sideBarData.setActivePage("categories")}>
          <Link
            to={"/admin/brands"}
            href="#"
            className={`${
              pathname.includes("brands") ? "active" : ""
            } nav-link text-white`}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2"></use>
            </svg>
            <TbBrandBebo /> { brands }
          </Link>
        </li>
        <li onClick={() => sideBarData.setActivePage("categories")}>
          <Link
            to={"/admin/stores"}
            href="#"
            className={`${
              pathname.includes("stores") ? "active" : ""
            } nav-link text-white`}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2"></use>
            </svg>
            <TbBrandBebo /> Stores
          </Link>
        </li>
        <li onClick={() => sideBarData.setActivePage("categories")}>
          <Link
            to={"/admin/review"}
            href="#"
            className={`${
              pathname.includes("review") ? "active" : ""
            } nav-link text-white`}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2"></use>
            </svg>
            <TbBrandBebo /> Review
          </Link>
        </li>
       
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

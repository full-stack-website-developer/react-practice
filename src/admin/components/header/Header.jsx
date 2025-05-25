import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContext } from "../../../store/ToastContext";
import LanguageSelector from "../lang/languageSelector";

const Header = () => {
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
      {toast.message && (
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

      <header className="p-3 text-bg-dark mw-100">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
              <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
              <li><a href="#" className="nav-link px-2 text-white">About</a></li>
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="d-flex align-items-center text-end">
              <button type="button" className="btn btn-outline-light me-2">
                Login
              </button>
              <button type="button" className="btn btn-warning me-3">
                Sign-up
              </button>

              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

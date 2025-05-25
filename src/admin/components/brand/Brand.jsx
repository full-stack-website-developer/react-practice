import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { brandList } from "../../../store/brand/brandList";
import styles from "./Brand.module.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";


const Brand = () => {

    const { brands, deleteBrand } = useContext(brandList);
    const navigate = useNavigate();

    function editBrand(id) {
      navigate(`edit/${id}`);
    }

    return (
        <>
            <h1>All Brands</h1>
            <div className="d-grid gap-2 d-md-flex m-2 ">
              <div className="d-flex w-50 justify-content-end">
                <Link to={"add"} className="text-white text-decoration-none">
                  <button className="btn btn-success align-center">Create</button>
                </Link>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">LOGO</th>
                          <th scope="col">NAME</th>
                          <th scope="col">OPERATIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {brands.map((brand, i) => {
                          return (
                            <tr key={brand.id}>
                              <th scope="row">{i + 1}</th>
                              <td><img src={brand.logo} alt="logo" style={{ width: "80px" }} /></td>

                              {/* <td>{getlogo(brand.logo)}</td> */}
                              <td>{brand.name}</td>
                              <td className={`${styles["icons-container"]}`}>
                                <span className={`${styles["icon-edit"]} `}>
                                  <TbEdit
                                    className={`${styles.icon}`}
                                    onClick={() => editBrand(brand.id)}
                                  />
                                </span>
                                <span className={`${styles["icon-remove"]} `}>
                                  <RiDeleteBin6Line
                                    className={`${styles.icon} `}
                                    onClick={() => deleteBrand(brand.id)}
                                  />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
            </div>
        </>
    );
}

export default Brand
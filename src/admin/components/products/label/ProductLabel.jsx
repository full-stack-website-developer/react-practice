import { Link, useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./ProductLabel.module.scss"
import { useContext } from "react";
import { productLabelList } from "../../../../store/label/ProductLabelList";

const ProductLabel = () => {
    const { productLabels, removeLabel } = useContext(productLabelList)
    const navigate = useNavigate();

    const editLabel = (id) => {
        navigate(`edit/${id}`);
    }

    return (
        <>
            <h1>All Product Labels</h1>
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
                        <th scope="col">NAME</th>
                        <th scope="col">OPERATIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productLabels.map((productLabel, i) => {
                        return (
                        <tr key={productLabel.id}>
                            <th scope="row">{i + 1}</th>
                            <td>{productLabel.name}</td>
                            <td className={`${styles["icons-container"]}`}>
                            <span className={`${styles["icon-edit"]} `}>
                                <TbEdit
                                className={`${styles.icon}`}
                                onClick={() => editLabel(productLabel.id)}
                                />
                            </span>
                            <span className={`${styles["icon-remove"]} `}>
                                <RiDeleteBin6Line
                                className={`${styles.icon} `}
                                onClick={() => removeLabel(productLabel.id)}
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
        
    )
}

export default ProductLabel;
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { storeList } from "../../../store/store/StoreList";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./Store.module.scss"

const Store = () => {
    const { stores, removeStore } = useContext(storeList)
    const navigate = useNavigate();

    const editStore = (id) => {
        navigate(`edit/${id}`);
    }

    return (
        <>
            <h1>All Store List</h1>
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
                    {stores.map((store, i) => {
                        return (
                        <tr key={store.id}>
                            <th scope="row">{i + 1}</th>
                            <td>{store.name}</td>
                            <td className={`${styles["icons-container"]}`}>
                            <span className={`${styles["icon-edit"]} `}>
                                <TbEdit
                                className={`${styles.icon}`}
                                onClick={() => editStore(store.id)}
                                />
                            </span>
                            <span className={`${styles["icon-remove"]} `}>
                                <RiDeleteBin6Line
                                className={`${styles.icon} `}
                                onClick={() => removeStore(store.id)}
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

export default Store
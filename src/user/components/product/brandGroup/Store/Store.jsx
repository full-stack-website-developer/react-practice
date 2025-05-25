import { useContext } from "react";
import styles from "./css/Store.module.scss";
import useItemById from "../../../../../hooks/useItemById";
import { storeList } from "../../../../../store/store/StoreList";
import { useNavigate } from "react-router-dom";

const Store = ({ storeId }) => {
    const { stores } = useContext( storeList );
    const store = useItemById( stores, storeId );
    const navigate = useNavigate();

    function handleStorePage(storeId) {
        navigate(`/Store/${storeId}`);
    }

    return (
        <span className={`${styles['store-name']}`} onClick={() => handleStorePage(store?.id)}>{ store?.name }</span>
    );
}

export default Store;
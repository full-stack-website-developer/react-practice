import styles from "./css/BtnWishList.module.scss";

const BtnWishList = () => {
    return (
        <button type="button" className={`${styles["wishlist-btn"]} btn btn-outline-secondary`}>Add to WishList</button>
    )
}

export default BtnWishList;
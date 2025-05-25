import styles from "./css/Discount.module.scss"

const Discount = ({ discount, price }) => {

    return (
        <div className={`${styles["discount"]}`}>
            <span>+</span>
            <span className={`${styles["amount"]}`}>
                <del>
                    <span className={`${styles["curr"]}`}>$</span>
                    <span className={`${styles["price"]}`}>{ price }</span>
                </del>
            </span>
            <span className={`${styles["percent"]}`}>
                <span>{discount}% off</span>
            </span>
        </div>
    )
}

export default Discount;
import styles from "./css/Sku.module.scss"

const Sku = ({ sku }) => {
    return (
        <div className={`${styles["sku-container"]}`}>
            <span className={`${styles["label"]}`}>SKU :</span>
            <span className={`${styles["sku"]}`}>{sku}</span>
        </div>
    )
}

export default Sku;
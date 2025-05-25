import FormikControl from "../../../../../admin/components/FormikControl";
import styles from "./css/Price.module.css";

const Price = ({ name, price }) => {

    return (
        <div className={`${styles["price"]}`}>
            <FormikControl control="input" name={name} type="hidden"/>
            <span className={`${styles["curr"]}`}>$</span>
            <span className={`${styles["amount"]}`}>{ price || "0.00" }</span>
        </div>
    )
}

export default Price;
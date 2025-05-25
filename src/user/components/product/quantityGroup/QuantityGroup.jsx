import Label from "../../../../admin/components/FormikFieldComponents/Label";
import BtnCart from "./cart/BtnCart";
import Quantity from "./quantity/Quantity";
import styles from "./css/QuantityGroup.module.scss";
import { ErrorMessage } from "formik";
import ErrorText from "../../../../admin/components/specification/groups/ErrorText";

const QuantityGroup = ({ product, name }) => {
    return (
        <>
            <div className={`${styles["quantity-group"]}`}>
                <div>
                    <Label label="Quantity" />
                    <Quantity name={name}/>
                    
                </div>
                <BtnCart product={product}/>
            </div>
            <ErrorMessage name={name} component={ErrorText}/>
        </>
    )
}

export default QuantityGroup;
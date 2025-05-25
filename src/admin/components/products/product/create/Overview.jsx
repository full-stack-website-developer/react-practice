import { ErrorMessage } from "formik"
import FormikControl from "../../../FormikControl"
import Label from "../../../FormikFieldComponents/Label"
import styles from "./Overview.module.scss"
import ErrorText from "../../../specification/groups/ErrorText"
import { useTranslation } from "react-i18next"

const Overview = ({label}) => {

    const { t } = useTranslation('addProduct')
    const { sku, price, discount } = t('text');

    return (
        <div>
            <h5>{label}</h5>
            <div className="d-flex gap-2">
                <div class={`${styles['column']} mb-3 col-4`}>
                    <FormikControl 
                        control="input" 
                        label={sku} 
                        name='sku' 
                    />
                </div>
                <div class={`${styles['column']} mb-3 col-4`}>
                    <Label label={price} />
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <FormikControl 
                            control="input" 
                            type="number" 
                            name='price' 
                            shouldError={false}
                        />
                        <span class="input-group-text">.00</span>
                    </div>
                    <ErrorMessage 
                        name="price" 
                        component={ErrorText}
                    />
                </div>
                <div class={`${styles['column']} mb-3 col-4`}>
                    <Label label={discount} />
                    <div class="input-group mb-3">
                        <FormikControl 
                            control="input" 
                            type="number" 
                            name='discount' 
                            shouldError={false}
                        />
                        <span class="input-group-text">%</span>
                    </div>
                    <ErrorMessage 
                        name="discount" 
                        component={ErrorText}
                    />
                </div>
            </div>
        </div>
    )
}

export default Overview
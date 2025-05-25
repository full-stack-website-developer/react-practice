import FormikControl from "../../../FormikControl";
import styles from "./Status.module.scss"

const Status = ({label}) => {
    const statusOptions = ["In Stock", "Out of Stock"]

    return (
        <div className={`${styles['stock-conatiner']}`}>
            <div>
                <FormikControl 
                    control="radio" 
                    label={label} 
                    name="stock" 
                    options={statusOptions} 
                />
            </div>
        </div>
    )
}

export default Status;
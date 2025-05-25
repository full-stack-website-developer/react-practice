import styles from "./Label.module.css"

const Label = (props) => {
    const { name, label, required = false, ...rest } = props
    return <>
        <label 
            htmlFor={ name } 
            className={`${styles.label} 'form-label'`}
            {...rest}
        >
            { label }
            {required &&
                <span className="text-danger">*</span>
            }
        </label>
    </>
}

export default Label
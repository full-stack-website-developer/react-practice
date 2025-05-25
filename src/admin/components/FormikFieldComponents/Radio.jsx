// Radio.jsx
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import styles from "./Radio.module.scss";

const Radio = ({ name, label, options }) => {
    return (
        <div>
            <h5>{label}</h5>
            <div className="d-flex gap-2">
                {options.map((option, index) => (
                    <div className="form-check" key={index}>
                        <Field 
                            className={`${styles.input} form-check-input`} 
                            type="radio" 
                            name={name} 
                            value={option} 
                            id={`${name}-${index}`}
                        />
                        <Label 
                            label={option} 
                            htmlFor={`${name}-${index}`} 
                        />
                    </div>
                ))}
            </div>
            <ErrorMessage 
                name={name}
                component="div" 
                className="text-danger" 
            />
        </div>
    );
}

export default Radio;

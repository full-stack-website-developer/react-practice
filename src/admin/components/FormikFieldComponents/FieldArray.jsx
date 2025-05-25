import { Field, FieldArray } from "formik";
import FormikControl from "../FormikControl";
import { IoAdd } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import styles from './FieldArray.module.css'
function FieldArrayControl(props) {
    const { name, label, ...rest } = props;

    return(
        <FieldArray name={name}>
            {
                fieldArrayProps => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { optionValues } = values;
                    return <>
                        <div class="d-grid gap-2 d-md-flex justify-content-between">
                            <label
                            htmlFor={name}
                            className="form-label"
                            >
                                {label}
                            </label>
                            <button
                                type="button"
                                onClick={() => push('')}
                                class="btn btn-outline-dark"
                            >
                                <IoAdd /> Add new option
                            </button>
                        </div>

                        <div
                            id="valuesInp"
                            className={`${styles["values-input-conatiner"]}`}
                        >
                            {optionValues.map((option, i) => {
                            return (
                                <div key={i}>

                                    <Field
                                        name={`optionValues[${i}]`}
                                        className="w-100 mt-3"
                                    />
                                    <CiCircleRemove
                                        className={`${styles.icon}`}
                                        onClick={() => remove(i)}
                                    />
                                </div>
                            );
                            })}
                        </div>
                    </>
                }
            }
        </FieldArray>
    )
}

export default FieldArrayControl
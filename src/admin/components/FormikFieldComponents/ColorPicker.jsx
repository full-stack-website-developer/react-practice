import { Field } from "formik"

const ColorPicker = ({ label, name }) => {
    return (
        <>
            <label htmlFor={name}>
                {label}
            </label>
            <Field 
                type="color" 
                name={name} 
                id={name} 
                className="form-control form-control-color"
            />
        </>
    )
}

export default ColorPicker
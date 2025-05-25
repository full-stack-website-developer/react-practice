import { Field, ErrorMessage, useFormikContext } from "formik";
import ErrorText from "../specification/groups/ErrorText";
import Label from "./Label";

function Select(props) {
    const { name, label, options, defOption, handleFieldTypeChange, selected, ...rest } = props;
    const formik = useFormikContext();
    const { setFieldValue } = formik;

    const handeleChange = (e) => {
        const selectedValue = e.target.value;
        setFieldValue(name, selectedValue);
        if (typeof handleFieldTypeChange === 'function') {
            handleFieldTypeChange(e.target.value)
        }
    }
    
    return (
        <>
            {label && 
                <Label 
                    name={name} 
                    label={label} 
                />
            }
            <Field 
                as='select' 
                name={name} 
                className="form-select text-capitalize" 
                onChange={handeleChange} 
                defaultValue={selected || defOption?.value} 
                {...rest} 
            >
                { 
                    defOption && 
                    <option value={defOption.value}>
                        {defOption.key}
                    </option> 
                }
                {
                    (options) ? options.map(option => {
                            return <option 
                                key={option.id} 
                                value={option.id} 
                                >
                                    {option.value || option.name}
                                </option>
                        }) : null
                }
            </Field>
            <ErrorMessage 
                name={name} 
                component={ErrorText} 
            />
        </>
    )
}

export default Select
import { Field, ErrorMessage } from 'formik'
import ErrorText from '../specification/groups/ErrorText';
import Label from './Label';


function Input(props) {
    const { label, name, placeHolder, required = false, shouldError = true, ...rest } = props;
    
    return (
        <div className="form-group flex-grow-1">
            {
                label && <Label nam={ name } label={ label }/>
            }

            <Field
                className = 'form-control'
                name={name}
                id={name}
                {...rest}
                placeholder={placeHolder}
                required={required}
            />

            {
                shouldError && 
                <ErrorMessage 
                    name={name} 
                    component={ErrorText}
                />
            }
            
        </div>
    )
}

export default Input;
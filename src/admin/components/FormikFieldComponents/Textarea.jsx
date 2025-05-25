import { Field, ErrorMessage } from 'formik'
import ErrorText from '../specification/groups/ErrorText';

function Textarea(props) {
    const { label, name, placeholder, ...rest } = props;

    return (
        <div>
            <label 
                className="form-label" 
                htmlFor={name}
            >
                {label} 
                <span className="text-danger">*</span>
            </label>
            <Field 
                as='textarea' 
                name={name} 
                id={name} 
                {...rest} 
                className='form-control' 
                placeholder={placeholder}
            />
            <ErrorMessage 
                name={name} 
                component={ErrorText}
            />
        </div>
    )
}

export default Textarea
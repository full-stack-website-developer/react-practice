import { Field, ErrorMessage } from 'formik'
import ErrorText from '../specification/groups/ErrorText';
import Label from './Label';


function checkboxGroup(props) {
    const { label, name, options, ...rest } = props;
    return (
        <>
            <Label label={label}/>
            <div className='d-flex gap-2'>
                <Field 
                    name={name} 
                    {...rest}
                >
                    {
                        props => {
                            const { field } = props;
                            return options.map((option) => {
                                return <div key={option.id}>
                                            <input
                                                type="checkbox"
                                                className="btn-check"
                                                id={option.id}
                                                {...field}
                                                value={option.id}
                                                checked={field.value.includes((option.id).toString())}
                                            />
                                            <label 
                                                className="btn btn-outline-success" 
                                                htmlFor={option.id}
                                            >
                                                {option.name} 
                                            </label>
                                        </div>
                            })
                        }
                    }
                </Field>
            </div>
            <ErrorMessage 
                name={name} 
                component={ErrorText}
            />
        </>
    )
}

export default checkboxGroup
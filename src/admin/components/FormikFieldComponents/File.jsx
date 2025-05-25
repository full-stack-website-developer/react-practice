import { ErrorMessage, useFormikContext } from 'formik'
import ErrorText from '../specification/groups/ErrorText';
import Label from './Label';

function File(props) {
    const { label, name, placeHolder, logoPreview, ...rest } = props;
    const { setFieldValue} = useFormikContext();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            logoPreview(e); 
            setFieldValue(name, file); 
        }
    };

    return (
        <>
            {
                label &&
                <Label 
                    label={label} 
                    htmlFor={name} 
                />
            }
            <input 
                type='file' 
                className='form-control' 
                name={name} 
                id={name}  
                onChange={handleFileChange} 
                {...rest} 
                placeholder={placeHolder}
            />
        </>
    )
}

export default File;
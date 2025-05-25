import { PiImagesBold } from "react-icons/pi";
import styles from "./ImageUploader.module.scss"
import Label from "../FormikFieldComponents/Label";
import ImagesPreview from "./ImagesPreview";
import { ErrorMessage, useFormikContext } from "formik";
import ErrorText from "../specification/groups/ErrorText";

const ImagesUploader = (props) => {
    const { name, label, ...rest } = props;
    const { values, setFieldValue } = useFormikContext();

    async function handleImageSelection(e) {
        const files = Array.from(e.target.files);
    
        const validFiles = files.filter(file => 
            ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
        );
    
        if (validFiles.length < files.length) {
            alert("Only PNG, JPG, and JPEG images are allowed.");
        }
    
        const base64Images = await Promise.all(
            validFiles.map(file => 
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (err) => reject(err);
                    reader.readAsDataURL(file);
                })
            )
        );
    
        setFieldValue(name, [...(values[name] || []), ...base64Images]);
    }

    return (
        <>
            {
                label && 
                <Label 
                    name={ name } 
                    label={ label }
                />
            }
            <label 
                htmlFor={name} 
                className={styles['upload-label']}
            >
                <div className={styles['upload-box']}>
                    <PiImagesBold className="fs-1" />
                    <p className={styles.paragraphs}>Click here to add more images.</p>
                </div>
            </label>
            <input 
                multiple
                type="file" 
                id={name} 
                name={name} 
                className={styles['upload-input']} 
                onChange={handleImageSelection}
                {...rest} 
            />
            <ImagesPreview images={values.additionalImages}/>
            <ErrorMessage 
                name={name}
                component={ErrorText}
            />
        </>
    )

}

export default ImagesUploader;
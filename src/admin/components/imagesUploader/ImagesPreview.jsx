import { useFormikContext } from "formik";
import styles from "./ImagesPreview.module.scss"
import { TiDeleteOutline } from "react-icons/ti";

const ImagesPreview = (props) => {
    const { images } = props;

    const { values, setFieldValue } = useFormikContext();

    function removeAdditionalImage(index) {
        const filteredImages = values.additionalImages.filter((image, i) => i !== index);
        setFieldValue("additionalImages", filteredImages);
    }

    return (
        <div className={`${styles.images}`}>
            {
                images.map((image, index) => {
                    return (
                        <div 
                            className={`${styles.image}`} 
                            key={index}
                        >
                            <img 
                                src={image} 
                                alt="Image not found" 
                            />
                            <span className={`${styles['remove-icon-container']}`}>
                                <TiDeleteOutline 
                                    className={`${styles['remove-icon']} fs-4`} 
                                    onClick={() => removeAdditionalImage(index)}
                                />
                            </span>
                        </div>
                    ) 
                })
            }
        </div>
    )
}

export default ImagesPreview;
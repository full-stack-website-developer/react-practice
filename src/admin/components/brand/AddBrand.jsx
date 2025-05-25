import { useNavigate } from "react-router-dom";
import styles from "./AddBrand.module.css"
import { useContext, useRef } from "react";
import { brandList } from "../../../store/brand/brandList";
import { TiDeleteOutline } from "react-icons/ti";
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import FormikControl from '../FormikControl'
import { navigateWithToaster } from "../../../helper";
import { useTranslation } from "react-i18next";

const AddBrand = () => {

    const { logoPreviewHandle, add, logoPreview, brands } = useContext(brandList)
    const prevInpVal = useRef();
    const navigate = useNavigate();

    function logoPreview1(e) {
        let file = e.target.files?.[0];
 

        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = () => logoPreviewHandle(reader.result);
        reader.readAsDataURL(file);
    }

    function removeLogoPreview(formik) {
        prevInpVal.current.value = "";
        logoPreviewHandle("");
        formik.setFieldValue("logo", null);
    }

    const initialValues = {
        name: '',
        logo: null,
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .required("Name is required")
            .test(
            "unique-name",
            "Name Already Exist!",
            function (value) {
                if (!value) return true;
        
                const name = value.toLowerCase().trim();
                const brandExists = brands.some(
                (brand) => brand.name.toLowerCase().trim() === name
                );
        
                return !(brandExists);
            }
            ),
        logo: Yup.string().required('Required'),
    })

    const onSubmit = async (values) => {
        const { name, logo } = values;
        const file = logo;
        const logoBase64 = await convertFileToBase64(file);
      
        const newBrand = {
          id: Date.now(),
          name,
          logo: logoBase64,
        };
        const result = add(newBrand);
        if(result.success) {
            navigateWithToaster(navigate, '/brands', result.message, 'success')
        }
      };
      
      // Helper Function to Convert File to Base64
      const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
      
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
      
      const { t, i18n } = useTranslation("addBrand");



      const { mainHeading_text, name_text, logo_text } = t('text');
 
    return (
        <>
            <h1>{ mainHeading_text }</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return <Form className={`${styles["add-container"]}`} >
                            <div className="d-flex flex-column gap-2 d-md-flex ">
                                <div className="mb-3">
                                    <FormikControl control='input' name='name' placeHolder={ name_text } label={ name_text }  />
                                </div>
                                <div className="mb-3">
                                    <FormikControl control='file' name='logo' label={ logo_text } type='file' ref={prevInpVal} logoPreview={logoPreview1}/>
                                    {(logoPreview ? 
                                        <div className={`${styles['preview-container']}`}>
                                            <TiDeleteOutline className={`${styles.icon} fs-4`} onClick={() => removeLogoPreview(formik)}/>
                                            <img src={logoPreview} class={`${styles["image-preview"]}`} alt="..." />
                                        </div>
                                    : null)}
                                    
                                </div>
                            </div>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button type="submit" className="mt-3 btn btn-success me-md-2">Create</button>
                                    </div>
                        </Form>
                    }
                }
            </Formik>
        </>
    )
}

export default AddBrand;
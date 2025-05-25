import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditBrand.module.css"
import { useContext, useRef } from "react";
import { brandList } from "../../../store/brand/brandList";
import { TiDeleteOutline } from "react-icons/ti";
import { Formik, Form } from 'formik'
import FormikControl from "../FormikControl";
import * as Yup from 'yup'
import { getDelConfirmation, navigateWithToaster } from "../../../helper";

const EditBrand = () => {
    const { edit, logoPreviewHandle, brands, logoPreview } = useContext(brandList);
    const prevInpVal = useRef();
    const { id } = useParams();
    const navigate = useNavigate();

    function logoPreview1(e) {
        let file = e.target.files?.[0];

        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = () => logoPreviewHandle(reader.result);
        reader.readAsDataURL(file);
    }

    function removeLogoPreview(formik) {
        const isConfirm = getDelConfirmation('related image to this table permanently')
        if(isConfirm) {
            prevInpVal.current.value = "";
            logoPreviewHandle("");
            
            const filteredBrands= brands.filter((brand) => parseInt(brand.id) === parseInt(id));
            const [filteredBrand] = filteredBrands; 
            if(filteredBrand.logo) {
            
                    const imgRemovedBrand = {
                        id: filteredBrand.id,
                        name: filteredBrand.name,
                        logo: null,
                    }
            
                    edit(imgRemovedBrand)
                
            }
            formik.setFieldValue('logo', null)
        }
    }

    const relatedBrands= brands.filter((brand) => parseInt(brand.id) === parseInt(id));
    
    const [ relatedBrand ] = relatedBrands;
    // prevInpVal.current.value = "relatedBrand.logo.name";

    const initialValues = {
        name: relatedBrand.name,
        logo: relatedBrand.logo,
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
                const currentName = relatedBrand.name.toLowerCase().trim();
                
                const brandExists = brands.some((brand) => {
                  return brand.name.toLowerCase().trim() === name && brand.name.toLowerCase().trim() !== currentName;
                });
        
                return !brandExists;
              }
            ),
        logo: Yup.string().required('Required'),
    })

    const onSubmit = async values => {

        const { name, logo } = values;
        const file = logo;

        let logoBase64;
        if(typeof file !== 'string') {
            logoBase64 = await convertFileToBase64(file);
        }

        const newBrand = {
            id,
            name,
            logo: logoBase64 ? logoBase64 : file,
        };

        const result = edit(newBrand);

        if(result.success) {
            navigateWithToaster(navigate, '/brands', result.message, 'success')
        }

    }

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
      
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
      

    return (
        <>
            <h1>Edit Brand</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return <Form className={`${styles["add-container"]}`} >
                            <div className="d-flex flex-column gap-2 d-md-flex ">
                                <div className="mb-3">
                                   <FormikControl control='input' name='name' label='Name' placeholder='Name' />
                                </div>
                                <div className="mb-3">
                                    <FormikControl control='file' name='logo' label='Logo' type='file' ref={prevInpVal} logoPreview={logoPreview1}/>
                                    {(logoPreview || relatedBrand.logo ? 
                                        <div className={`${styles['preview-container']}`}>
                                            <TiDeleteOutline className={`${styles.icon} fs-4`} onClick={() => removeLogoPreview(formik)}/>
                                            <img src={logoPreview || relatedBrand.logo} class={`${styles["image-preview"]}`} alt="..." />
                                        </div>
                                    : null)}
                                </div>
                            </div>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button type="submit" className="mt-3 btn btn-success me-md-2">Update</button>
                                    </div>
                        </Form>
                    }
                }
            </Formik>
        </>
    )
}

export default EditBrand;
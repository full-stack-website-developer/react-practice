import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storeList } from "../../../store/store/StoreList";
import * as Yup from "yup"
import { Form, Formik } from "formik";
import FormikControl from "../FormikControl";
import styles from "./EditStore.module.scss"
import { navigateWithToaster } from "../../../helper";

const EditStore = () => {
    const { stores, update } = useContext(storeList)
    const navigate = useNavigate();
    const { id } = useParams();

    const getRelatedStores = stores.filter(store => parseInt(store.id) === parseInt(id))
    const [ getRelatedStore ] = getRelatedStores;

    const initialValues = {
        name: getRelatedStore.name,
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is Required!"),
    })

    const onSubmit = (values) => {
        const { name } = values;
        const result = update(name, id);
        if(result.success) {
            navigateWithToaster(navigate, "/admin/stores", result.message, "success")
        }
    }

    return (
        <>
            <h1>Edit Store</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return <Form className={`${styles["add-container"]}`} >
                            <div className="d-flex flex-column gap-2 d-md-flex ">
                                <div className="mb-3">
                                    <FormikControl control="input" name="name" label="Name"/>
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

export default EditStore
import { Form, Formik } from "formik"
import FormikControl from "../FormikControl"
import * as Yup from "yup"
import styles from "./AddStore.module.scss"
import { useContext } from "react"
import { storeList } from "../../../store/store/StoreList"
import { navigateWithToaster } from "../../../helper"
import { useNavigate } from "react-router-dom"

const AddStore = () => {

    const { create } = useContext(storeList)
    const navigate = useNavigate();

    const initialValues = {
        name: "",
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is Required!"),
    })

    const onSubmit = (values) => {
        const { name } = values;
        const result = create(name);
        if(result.success) {
            navigateWithToaster(navigate, "/admin/stores", result.message, "success")
        }
    }

    return (
        <>
            <h1>Add New Store</h1>
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

export default AddStore
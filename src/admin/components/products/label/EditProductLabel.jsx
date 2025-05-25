import { Form, Formik } from "formik"
import FormikControl from "../../FormikControl"
import { useContext } from "react";
import { productLabelList } from "../../../../store/label/ProductLabelList";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditProductLabel.module.scss"
import Create from "../../common/button/Create";
import { navigateWithToaster } from "../../../../helper";

const EditProductLabel = () => {
    const { id } = useParams();
    const { productLabels, update } = useContext(productLabelList)
    const navigate = useNavigate();

    const relatedLabels = productLabels.filter(productLabel => parseInt(productLabel.id) === parseInt(id));
    const [ relatedLabel ] = relatedLabels;

    const initialValues = {
        name: relatedLabel.name,
        backgroundColor: relatedLabel.backgroundColor,
        textColor: relatedLabel.textColor,
    };

    const onSubmit = values => {
        const { name, backgroundColor, textColor } = values;
        const updtedLabel = {
            id,
            name,
            backgroundColor,
            textColor,
        }

        const result = update(updtedLabel);

        if(result.success) {
            navigateWithToaster(navigate, "/label", result.message, "success")
        }
    
    };

    return (
        <>
            <h1>Edit Product Label</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {formik => (
                    <Form className={`${styles["add-container"]}`}>
                        <div className="d-flex flex-column gap-2">
                            <div className="mb-3">
                                <FormikControl control="input" name="name" label="Name" />
                            </div>
                            <div className="mb-3">
                                <FormikControl control="color" name="backgroundColor" label="Background Color" />
                            </div>
                            <div className="mb-3">
                                <FormikControl control="color" name="textColor" label="Text Color" />
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" className="mt-3 btn btn-success me-md-2">Update</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditProductLabel
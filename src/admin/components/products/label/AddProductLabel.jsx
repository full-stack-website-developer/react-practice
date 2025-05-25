import { Field, Form, Formik } from "formik";
import Create from "../../common/button/Create";
import styles from "./AddProductLabel.module.scss";
import FormikControl from "../../FormikControl";
import { useContext } from "react";
import { productLabelList } from "../../../../store/label/ProductLabelList";
import { navigateWithToaster } from "../../../../helper";
import { useNavigate } from "react-router-dom";

const AddProductLabel = () => {
    const { create } = useContext(productLabelList);
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        backgroundColor: '#CCCCCC',
        textColor: '#CCCCCC'
    };

    const onSubmit = values => {
        const { name, backgroundColor, textColor } = values;
        const result = create(name, backgroundColor, textColor)
        if(result.success) {
            navigateWithToaster(navigate, "/label", result.message, "success")
        }
    };

    return (
        <>
            <h1>Add New Label</h1>
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
                            <Create type="submit" />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default AddProductLabel;

import { useNavigate } from "react-router-dom";
import styles from "./AddSpecificationGroup.module.css";
import { useContext, useState }  from "react";
import { specificationGroupList } from "../../../../store/specification/SpecificationGroupsList";
import { Formik, Form } from "formik";
import FormikControl from "../../FormikControl";
import * as Yup from 'yup'
import { navigateWithToaster } from "../../../../helper";

const AddSpecificationGroup = () => {
  const { create, specGroupList  } = useContext(specificationGroupList);
  const navigate = useNavigate();

  const [ savedValues, setSavedValues ] = useState(null)

  let savedData = 
  {
    name: "Talha",
    description: "This description",
    phNumbers: [''],
    comments: {
      like: "",
      messages: "",
    }
  };

  const initialValues = {
        name: "",
        description: "",
        phNumbers: [''],
        comments: {
          like: "",
          messages: "",
        }
      };

  const onSubmit = (values, onSubmitProps) => {
    const { name, description } = values;

    const result = create(name.trim(), description.trim());
    if(result.success) {
      onSubmitProps.setSubmitting(false);
      navigateWithToaster(navigate, '/admin/specification-groups', result.message, 'success')
    }
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
          const specGroupExists = specGroupList.some(
            (specGroup) => specGroup.name.toLowerCase().trim() === name
          );

          return !(specGroupExists);
        }
      ),
  })


  return (
    <>
      <h1>Add New Group</h1>
      <Formik initialValues={savedValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
        { formik => (
            <Form className={`${styles["add-container"]}`} >
              <div className="d-flex flex-column gap-2 d-md-flex">
                <div className="mb-3">
                  <FormikControl control='input' name='name' label='Name' placeholder='Enter name here...' />
                </div>
                <div className="mb-3">
                  <FormikControl control='textarea' name='description' label='Description' placeholder="Short description"/>
                </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" onClick={() => setSavedValues(savedData)} className="mt-3 btn btn-success me-md-2">Load Data</button>
                    <button type="submit" disabled={formik.isSubmitting || !formik.isValid} className="mt-3 btn btn-success me-md-2">Create</button>
                  </div>
              </div>
            </Form>
          )
        } 
      </Formik>
      
    </>
  );
};

export default AddSpecificationGroup;

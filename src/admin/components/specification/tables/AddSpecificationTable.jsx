import { useNavigate } from "react-router-dom";
import styles from "./AddSpecificationTable.module.css";
import { useContext } from "react";
import { specificationGroupList } from "../../../../store/specification/SpecificationGroupsList";
import { specificationTableList } from "../../../../store/specification/SpecificationTableList";
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import FormikControl from "../../FormikControl";
import { navigateWithToaster } from "../../../../helper";


const AddSpecificationTable = () => {
  const { specGroupList } = useContext(specificationGroupList);
  const { create, tableList } = useContext(specificationTableList);

  const navigate = useNavigate();

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
          const tableExists = tableList.some(
            (table) => table.name.toLowerCase().trim() === name
          );
  
          return !(tableExists);
        }
      ),
    group: Yup.array().min(1, 'At least 1 group is required').required('Required'),
  })

  const initialValues = {
    name: "",
    description: "",
    group: [],
  };

  const onSubmit = (values) => {
    const { name, description, group } = values;

    const result = create(name, description, group);
    if(result) {
      navigateWithToaster(navigate, '/admin/specification-tables', result.message, 'success')
    }
  };

  return (
    <>
      <h1>Add Specification Table</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={`${styles["add-container"]}`} >
          <div className="d-flex flex-column gap-2 d-md-flex ">
            <div>
              <FormikControl control='input' name='name' label='Name' placeholder='Name' />
            </div>
            <div>
              <FormikControl control='textarea' name='description' label='Description' placeholder="Short description"/>
            </div>
            
            <div>
              <FormikControl name='group' label='Select the groups to display in this table' control='checkbox' options={specGroupList}/>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className=" btn btn-success me-md-2">
                Create
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AddSpecificationTable;

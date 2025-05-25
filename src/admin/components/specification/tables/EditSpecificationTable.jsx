import { useNavigate } from "react-router-dom";
import styles from "./EditSpecificationTable.module.css";
import { useContext } from "react";
import { specificationTableList } from "../../../../store/specification/SpecificationTableList";
import { specificationGroupList } from "../../../../store/specification/SpecificationGroupsList";
import { useParams } from "react-router-dom";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from "../../FormikControl";
import { navigateWithToaster } from "../../../../helper";

const EditSpecificationTable = () => {
  const { id } = useParams();
  const { specGroupList } = useContext(specificationGroupList);

  const { edit, tableList } = useContext(specificationTableList);
  const navigate = useNavigate();

  const getRealatedtables = tableList.filter(
    (table) => parseInt(table.id) === parseInt(id)
  );

  const [getRealatedtable] = getRealatedtables;

const initialValues = {
  name: getRealatedtable.name,
  description: getRealatedtable.description,
  group: getRealatedtable.selectedGroups,
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
        const currentName = getRealatedtable.name.toLowerCase().trim();
        
        const tableExists = tableList.some((table) => {
          return table.name.toLowerCase().trim() === name && table.name.toLowerCase().trim() !== currentName;
        });

        return !tableExists;
      }
    ),
  description: Yup.string().trim().min(3, 'at least enter 3 char').required('Required'),
  group: Yup.array().min(1, 'At least 1 group is required').required('Required'),
})

const onSubmit = values => {
  const { name, description, group } = values;
  const updatedTable = {
    id,
    name,
    description,
    selectedGroups: group,
  };

  const result = edit(updatedTable);
  if(result) {
    navigateWithToaster(navigate, '/admin/specification-tables', result.message, 'success')
  }
}

  return (
    <>
      <h1>Edit Specification Table</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
          formik => {
            return <Form className={`${styles["add-container"]}`} >
              <div className="d-flex flex-column gap-2 d-md-flex ">
                <div className="mb-3">
                  <FormikControl control='input' name='name' label='Name' placeholder="Name" />
                </div>
                <div className="mb-3">
                  <FormikControl control='textarea' name='description' label='Description' placeholder="Short description" />
                </div>
                <div className="mb-3">
                  <FormikControl control='checkbox' name='group' label='Select the groups to display in this table' options={specGroupList}/>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" className=" btn btn-success me-md-2">Update</button>
                </div>
              </div>
            </Form>
          }
        }
      </Formik>
    </>
  );
};

export default EditSpecificationTable;

import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { specificationGroupList } from "../../../../store/specification/SpecificationGroupsList";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from "../../FormikControl";
import { navigateWithToaster } from "../../../../helper";

const EditSpecificationGroup = () => {
  const { id } = useParams();
  const { specGroupList, editGroup } = useContext(specificationGroupList);
  const navigate = useNavigate();

  const groups = specGroupList.filter(
    (group) => group.id === parseInt(id)
  );

  const [group] = groups;

  const initialValues = {
    name: group.name,
    description: group.description,
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
        const currentName = group.name.toLowerCase().trim();
        
        const specGroupExists = specGroupList.some((specGroup) => {
          return specGroup.name.toLowerCase().trim() === name && specGroup.name.toLowerCase().trim() !== currentName;
        });

        return !specGroupExists;
      }
    ),
    description: Yup.string().trim().required('Required'),
  })

  const onSubmit = (values) => {

    const { name, description } = values;
    const updatedGroup = {
      id: parseInt(id),
      name: name.trim(),
      description: description.trim(),
    };
    const result = editGroup(updatedGroup);

    if(result.success) {
      navigateWithToaster(navigate, '/admin/specification-groups', result.message, 'success')
    }
  }

  return (
    <>
      <h1>Edit Specification Group</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {
            (formik) => (
              <Form>
                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">NAME</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">OPERATIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <FormikControl name='name' control='input'/>
                        </td>
                        <td>
                          <FormikControl name='description' control='input' />
                        </td>
                        <td>
                          <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn btn-success">Update</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Form>
            )
          }
      </Formik>
    </>
  );
};

export default EditSpecificationGroup;

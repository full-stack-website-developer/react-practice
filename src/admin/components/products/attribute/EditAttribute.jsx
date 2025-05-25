import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { attributeList } from "../../../../store/AttributeList";
import styles from "./EditAttribute.module.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from "../../FormikControl";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const EditAttribute = () => {
  const { id } = useParams();
  const { attributes, updateAttribute } = useContext(attributeList);
  const navigate = useNavigate();

  const relatedAttributes = attributes.filter(
    (attribute) => attribute.id === parseInt(id)
  );

  const [attribute] = relatedAttributes;

  const initialValues = {
    name: attribute.name,
    attValues: attribute.values,
  }

  const validateSchema = Yup.object({
    name: Yup.string()
    .trim()
    .required("Name is required")
    .test(
      "unique-name",
      "Name Already Exist!",
      function (value) {
        if (!value) return true;

        const name = value.toLowerCase().trim();
        const currentName = attribute.name.toLowerCase().trim();
        
        const attributeExists = attributes.some((attribute) => {
          return attribute.name.toLowerCase().trim() === name && attribute.name.toLowerCase().trim() !== currentName;
        });

        return !attributeExists;
      }
    ),
    attValues: Yup.array()
      .of(
        Yup.string()
          .trim()
          .required("Value cannot be empty")
          .test(
            "unique-attrValues",
            "Each value must be unique",
            function (value, context) {
              const values = context.parent;
              const duplicates = values.filter(
                (val) => val.trim().toLowerCase() === value.trim().toLowerCase()
              );
              return duplicates.length === 1;
            }
          )
      )
      .required("At least one value is required"),
  })

  const onSubmit = values => {
    const { name, attValues } = values;
    
    const updatedAttribute = {
      id: parseInt(id),
      name: name.trim(),
      values: attValues.map(attValue => attValue.trim()),
    };

    const result = updateAttribute(updatedAttribute);

    if(result.success){
      navigate("/admin/all-attributes", {
        state: { toastMessage: result.message, toastType: "success" }
      });
    }
  }

  return (
    <>
      <h1>Edit Attribute</h1>
      <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
        {
          formik => {
            return <Form>
              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Values</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <FormikControl name="name" control="input"/>
                      </td>
                      <td className={`${styles["values-conatiner"]}`}>
                        <div
                          id="valuesInp"
                          className={`${styles["values-input-conatiner"]}`}
                        >
                          <FieldArray name="attValues">
                            {
                              fieldArrayProps => {
                                const { form, push, remove } = fieldArrayProps;
                                const { values } = form;
                                const { attValues } = values;

                                return attValues.map((attValue, index) => {
                                  return <div className="d-flex" key={index}>
                                            <div>
                                              <FormikControl control='input' name={`attValues[${index}]`} />
                                            </div>
                                            {
                                              index < 1 && <IoMdAddCircleOutline className={`${styles.icon} fs-5`} onClick={() => push('')} /> 
                                            }
                                            { index > 0 && <IoIosRemoveCircleOutline className={`${styles.icon} fs-5`} onClick={() => remove(index)} /> }
                                    </div>
                                })

                              }
                            }
                          </FieldArray>
                        </div>
                      </td>
                      <td>
                        <button type="submit" className="btn btn-success">Update</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Form>
          }
        }
      </Formik>
    </>
  );
};

export default EditAttribute;

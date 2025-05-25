import { useContext } from "react";
import styles from "./AddAttribute.module.css";

import { useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { attributeList } from "../../../../store/AttributeList";
import { Formik, Form, FieldArray } from 'formik'
import FormikControl from '../../FormikControl'
import * as Yup from 'yup'
import { IoIosRemoveCircleOutline } from "react-icons/io";

const AddAttribute = () => {
  const { attributes, createAttribute } = useContext(attributeList);
  const navigate = useNavigate();

  const initialValues = {
     name: '',
    attrValues: [''],
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
          const attributeExists = attributes.some(
            (attribute) => attribute.name.toLowerCase().trim() === name
          );
  
          return !(attributeExists);
        }
      ),
      attrValues: Yup.array()
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

    const { name, attrValues } = values;

    const newAttribute = {
      id: Date.now(),
      name: name.trim(),
      values: attrValues.map(attrValue => attrValue.trim()),
    };

    const result = createAttribute(newAttribute);

    if(result.success){
      navigate("/admin/all-attributes", {
        state: { toastMessage: result.message, toastType: "success" }
      });
    }
  }

  return (
    <>
      <h1>Create Product Attribute</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
                        <FormikControl name='name' control='input'/>
                      </td>
                      <td className={`${styles["values-conatiner"]}`}>
                        <div
                          id="valuesInp"
                          className={`${styles["values-input-conatiner"]}`}
                        >
                          <FieldArray name="attrValues">
                              {
                                fieldArrayProps => {
                                  const { form, push, remove } = fieldArrayProps;
                                  const { values } = form;
                                  const { attrValues } = values;

                                  return attrValues.map((attrValue, index) => {
                                    return <div className="d-flex" key={index}>
                                        <div>
                                          <FormikControl control='input' name={`attrValues[${index}]`} id="" />
                                        </div>
                                        { index < 1 && <IoMdAddCircleOutline
                                          className={`${styles.icon} fs-5`}
                                          onClick={() => push('')}
                                        /> }
                                        { index > 0 && <IoIosRemoveCircleOutline 
                                          className={`${styles.icon} fs-5`}
                                          onClick={() => remove(index)}
                                        /> }
                                    </div> 
                                    
                                  })
                                  
                                }
                              }
                          </FieldArray>
                        </div>
                      </td>
                      <td>
                        <button type="submit" className="btn btn-success">Create</button>
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

export default AddAttribute;

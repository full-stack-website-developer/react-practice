import { useNavigate } from "react-router-dom";
import styles from "./AddSpecificationAttributes.module.css";
import { useContext } from "react";
import { specificationGroupList } from "../../../../store/specification/SpecificationGroupsList";
import { specificationAttributeList } from "../../../../store/specification/SpecificationAttributeList";
import { Formik, Form, FieldArray, Field } from 'formik'
import * as Yup from 'yup'
import FormikControl from "../../FormikControl";
import { CiCircleRemove } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { navigateWithToaster } from "../../../../helper";

const AddSpecificationAttribute = () => {
  const { specGroupList } = useContext(specificationGroupList);
  const { createAttribute, setFieldType, fieldTypeOptions, selectedFieldType, specAttributes } = useContext(specificationAttributeList);
  const navigate = useNavigate();

  const initialValues = {
    associatedGroup: '',
    name: '',
    fieldType: '',
    defaultValue: '',
    optionValues: [''],
  }

  const validationSchema = Yup.object({
    associatedGroup: Yup.string().required('Required'),
    name: Yup.string()
      .trim()
      .required("Name is required")
      .test(
        "unique-name",
        "Name Already Exist!",
        function (value) {
          if (!value) return true;
  
          const name = value.toLowerCase().trim();
          const specAttributeExists = specAttributes.some(
            (specAttribute) => specAttribute.name.toLowerCase().trim() === name
          );
  
          return !(specAttributeExists);
        }
      ),
      
  })

  const onSubmit = values => {
    const { associatedGroup, name, defaultValue, optionValues } = values;
    let { fieldType } = values;

    if(fieldType === '') {
      fieldType = 1;
    }

    const newSpecAttribute = {
      id: Date.now(),
      associatedGroup,
      name,
      fieldType,
      defaultValue,
      optionValues,
    };

    const result = createAttribute(newSpecAttribute);
    navigateWithToaster(navigate, '/specification-attributes', result.message, 'success')
  }

  const defOptionsAssGroup = {
    key: 'Choose any Group',
    value: '',
  }

  function fieldTypeChange(selectedFieldType) {
    setFieldType(selectedFieldType);
  }

  return (
    <>
      <h1>Add Specification Attribute</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
          formik => {
            return <Form className={`${styles["add-container"]}`} >
              <div className="d-flex flex-column gap-2 d-md-flex ">
                <div className="mb-3 ">
                  <FormikControl control='select' name='associatedGroup' options={specGroupList} defOption={defOptionsAssGroup} label='Associated Group' />
                </div>

                <div className="mb-3">
                  <FormikControl name='name' placeholder='Name' control='input' label='Name' />
                </div>

                <div className="mb-3 ">
                  <FormikControl control='select' name='fieldType' options={fieldTypeOptions} label='Field Type' handleFieldTypeChange={(value) => fieldTypeChange(value)}/>
                </div>

                <div className="mb-3">
                  <FormikControl name='defaultValue' control='input' label='Default Value' />
                </div>

                {(selectedFieldType === '3') |
                (selectedFieldType === '5') ? (
                  <div className="mb-3">
                   <FieldArray name="optionValues">
                      {
                        fieldArrayProps => {
                          const { push, remove, form } = fieldArrayProps;
                          const { values } = form;
                          const { optionValues } = values;
                          return <>
                              <div class="d-grid gap-2 d-md-flex justify-content-between">
                                  <label
                                  htmlFor="optionValues"
                                  className="form-label"
                                  >
                                  Options
                                  </label>
                                  <button
                                  type="button"
                                  onClick={() => push('')}
                                  class="btn btn-outline-dark"
                                  >
                                  <IoAdd /> Add new option
                                  </button>
                              </div>

                              <div
                                  id="valuesInp"
                                  className={`${styles["values-input-conatiner"]}`}
                              >
                                  {optionValues.map((option, i) => {
                                  return (
                                      <div key={i}>
                                          <div className="d-block w-100">
                                            <FormikControl control='input'
                                                name={`optionValues[${i}]`}
                                                className="w-100 mt-3"
                                            />
                                          </div>
                                          <div className={`${styles['icon-container']}`}>
                                            <CiCircleRemove
                                                className={`${styles.icon}`}
                                                onClick={() => remove(i)}
                                            />
                                          </div>
                                      </div>
                                  );
                                  })}
                              </div>
                          </>
                      }
                      }
                   </FieldArray>
                  </div>
                ) : (
                  null
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-success">
                  Create
                </button>
              </div>
            </Form>
          }
        }
      </Formik>
    </>
  );
};

export default AddSpecificationAttribute;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { specificationAttributeList } from "../../../../store/specification/SpecificationAttributeList";
import styles from "./EditSpecificationAttribute.module.css";
import { specificationGroupList } from "../../../../store/specification/SpecificationGroupsList";
import { IoAdd } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { Formik, Form, FieldArray } from 'formik'
import FormikControl from "../../FormikControl";
import * as Yup from 'yup'
import { navigateWithToaster } from "../../../../helper";

const EditSpecificationAttribute = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { specAttributes, setFieldType, updateAttribute, selectedFieldType } = useContext(specificationAttributeList);
  const { specGroupList } = useContext(specificationGroupList);

  let getRelatedAttr = [];
  let attribute = [];

  getRelatedAttr = specAttributes.filter((attr) => {
    return parseInt(attr.id) === parseInt(id);
  });

  [attribute] = getRelatedAttr;

  const getAssGroups = specGroupList.filter((group) => {
    return parseInt(group.id) === parseInt(attribute.associatedGroup);
  });

  const [getAssGroup] = getAssGroups;

  const fieldTypeOptions = [
    {
      id: 1,
      value: "Text",
    },
    {
      id: 2,
      value: "Textarea",
    },
    {
      id: 3,
      value: "Select",
    },
    {
      id: 4,
      value: "Checkbox",
    },
    {
      id: 5,
      value: "Radio",
    },
  ];

  useEffect(() => {
    setFieldType(attribute.fieldType);
  }, []);


  function handleFieldTypeChange(value) {
    setFieldType(value);
  }

 const initialValues = {
    associatedGroup: attribute.associatedGroup,
    name: attribute.name,
    fieldType: attribute.fieldType,
    defaultValue: attribute.defaultValue,
    optionValues: attribute.optionValues ? attribute.optionValues : [''],
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
          const currentName = attribute.name.toLowerCase().trim();
          
          const specAttributeExists = specAttributes.some((specAttribute) => {
            return specAttribute.name.toLowerCase().trim() === name && specAttribute.name.toLowerCase().trim() !== currentName;
          });

          return !specAttributeExists;
        }
      ),
    defaultValue: Yup.string().trim().required('Required'),
  })

  const onSubmit = values => {
    const { associatedGroup, name, fieldType, defaultValue, optionValues } = values;
    const updatedAttribute = {
      id,
      associatedGroup,
      name,
      fieldType,
      defaultValue,
      optionValues,
    };

    const result = updateAttribute(updatedAttribute);
    navigateWithToaster(navigate, '/specification-attributes', result.message, 'success')
  }
  return (
    <>
      <h1>Edit Specification Attribute</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
          formik => {
            return <Form className={`${styles["add-container"]}`} >
              <div className="d-flex flex-column gap-2 d-md-flex ">
                <div className="mb-3 ">
                  <FormikControl name='associatedGroup' control='select' label='Associated Group' options={specGroupList}/>
                </div>

                <div className="mb-3">
                  <FormikControl name='name' control='input' label='Name' type='text' />
                </div>

                <div className="mb-3 ">
                  <FormikControl name='fieldType' control='select' label='Field Type' handleFieldTypeChange = {handleFieldTypeChange} options={fieldTypeOptions} />
                </div>

                <div className="mb-3">
                  <FormikControl name='defaultValue' control='input' label='Default Value' type='text' />
                </div>

                {(selectedFieldType === "3") |
                (selectedFieldType === "5") ? (
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
                  Update
                </button>
              </div>
            </Form>
          }
        }
      </Formik>
    </>
  );
};

export default EditSpecificationAttribute;

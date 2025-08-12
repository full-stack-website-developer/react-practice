import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { specificationAttributeList } from "../../../store/specification/SpecificationAttributeList";
import styles from "./EditSpecificationAttribute.module.css";
import { specificationGroupList } from "../../../store/specification/SpecificationGroupsList";
import { IoAdd } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { Formik, Form } from 'formik'
import FormikControl from "../../FormikControl";
import * as Yup from 'yup'

const EditSpecificationAttribute = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { specDataAttributes } = useContext(specificationAttributeList);
  const { specGroupList } = useContext(specificationGroupList);

  let getRelatedAttr = [];
  let attribute = [];

  getRelatedAttr = specDataAttributes.specAttributes.filter((attr) => {
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
    specDataAttributes.setFieldType(attribute.fieldType);
  }, []);

  function updateAttribute(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const associatedGroup = formData.get("associatedGroup");
    const name = formData.get("name");
    const fieldType = formData.get("fieldType");
    const defaultValue = formData.get("defaultValue");
    const optionValues = formData.getAll("optionVal");
    const updatedAttribute = {
      id,
      associatedGroup,
      name,
      fieldType,
      defaultValue,
      optionValues,
    };

    specDataAttributes.updateAttribute(updatedAttribute);

    navigate("/specification-attributes");
  }

  function removeValInp(index) {
    const newOptions = attribute.optionValues.filter(
      (option, i) => i !== index
    );

    let newOnj = {};
    specDataAttributes.specAttributes.map((attr) => {
      if (parseInt(attr.id) === parseInt(id)) {
        newOnj = { ...attr, optionValues: newOptions };
      }
    });

    specDataAttributes.updateAttribute(newOnj);
  }

  function fieldTypeChange(e) {
    const selectedFieldType = e.target.value;
    specDataAttributes.setFieldType(selectedFieldType);
  }

  function addNewInp() {
    specDataAttributes.createInpField();
  }

  // specDataAttributes.setOptVal(id);

  const optVal = attribute.optionValues;

 const initialValues = {
    associatedGroup: '',
    name: '',
    fieldType: '',
    defaultValue: '',
    optionValues: [''],
  }

  const validationSchema = Yup.object({
    associatedGroup: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    defaultValue: Yup.string().required('Required'),
  })

  return (
    <>
      <h1>Edit Specification Attribute</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
          formik => {
            return <Form className={`${styles["add-container"]}`} >
              <div className="d-flex flex-column gap-2 d-md-flex ">
                <div className="mb-3 ">
                  <FormikControl name='associatedGroup' control='select' label='Associated Group' options={specGroupList} selected={getAssGroup.name}/>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Name"
                    name="name"
                    defaultValue={attribute.name}
                  />
                </div>

                <div className="mb-3 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Field Type
                  </label>
                  <select
                    className="form-select  text-capitalize"
                    aria-label="Default select example"
                    name="fieldType"
                    onChange={fieldTypeChange}
                    defaultValue={attribute.fieldType}
                  >
                    {fieldTypeOptions.map((option) => {
                      return (
                        <option
                          className={`${styles["parent-category-name"]}`}
                          value={`${option.value}`}
                          key={option.id}
                        >
                          {option.value}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Default Value
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="defaultValue"
                    defaultValue={attribute.defaultValue}
                  />
                </div>
                {(specDataAttributes.selectedFieldType === "Select") |
                (specDataAttributes.selectedFieldType === "Radio") ? (
                  <div className="mb-3">
                    <div class="d-grid gap-2 d-md-flex justify-content-between">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Options
                      </label>
                      <button
                        type="button"
                        onClick={addNewInp}
                        class="btn btn-outline-dark"
                      >
                        <IoAdd /> Add new option
                      </button>
                    </div>

                    <div
                      id="valuesInp"
                      className={`${styles["values-input-conatiner"]}`}
                    >
                      {optVal.map((option, i) => {
                        return (
                          <div key={i}>
                            <input
                              type="text"
                              name="optionVal"
                              id=""
                              className="w-100 mt-3"
                              value={option}
                            />
                            <CiCircleRemove
                              className={`${styles.icon}`}
                              onClick={() => removeValInp(i)}
                            />
                          </div>
                        );
                      })}
                      {specDataAttributes.inp.map((inp, i) => {
                        if (optVal.length > 0) {
                          if (i < 1) {
                            return;
                          }
                        }
                        return (
                          <div key={inp.id}>
                            <input
                              type="text"
                              name="optionVal"
                              id=""
                              className="w-100 mt-3"
                            />
                            <CiCircleRemove
                              className={`${styles.icon}`}
                              onClick={() => specDataAttributes.removeInp(inp.id)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </Form>
          }
        }
      </Formik>
    </>
  );
};

export default EditSpecificationAttribute;

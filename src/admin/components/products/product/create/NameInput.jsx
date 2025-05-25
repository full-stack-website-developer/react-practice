import { Field, ErrorMessage } from "formik";
import { slugify } from "../../../../../utils/slugify"
import Label from "../../../FormikFieldComponents/Label";
import ErrorText from "../../../specification/groups/ErrorText";

const NameInput = ({ setFieldValue, label, placeHolder, required }) => {
  const handleChange = (e) => {
    const name = e.target.value;
    setFieldValue("name", name);
    setFieldValue("permalink", slugify(name));
  };

  return (
    <div className="mb-3">
      <Label label={label}/>

      <Field
        type="text"
        name="name"
        className="form-control"
        placeholder={placeHolder}
        onChange={handleChange}
        required={required}
      />

      <ErrorMessage 
        name="name" 
        component={ErrorText}
      />

    </div>
  );
};

export default NameInput;

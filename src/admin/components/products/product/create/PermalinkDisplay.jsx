import { Field, ErrorMessage } from "formik";
import Label from "../../../FormikFieldComponents/Label";
import FormikControl from "../../../FormikControl";
import ErrorText from "../../../specification/groups/ErrorText";
import { permalinkUrlHandler } from "../../../../../helper";

const PermalinkDisplay = ({ permalink, label }) => (
  <div className="mb-3">
    <Label label={label}/>

    <div className="input-group">
      <span className="input-group-text">{ permalinkUrlHandler() }</span>
      <FormikControl control="input" name="permalink" />
    </div>
    
    <div className="form-text">
      Preview: 
      <a
        href={ permalinkUrlHandler(permalink) }
        className="text-decoration-none"
        target="_blank"
        rel="noopener noreferrer"
      >
        { permalinkUrlHandler(permalink) }
      </a>
    </div>

    <ErrorMessage 
      name="permalink" 
      component={ErrorText}
    />
  </div>
);

export default PermalinkDisplay;

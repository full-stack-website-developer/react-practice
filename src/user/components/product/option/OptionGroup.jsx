// import { useFormikContext } from "formik";
// import styles from "./css/OptionGroup.module.scss";
// import OptionSelect from "./OptionSelect";
// import { useEffect, useState } from "react";

// const OptionGroup = ({ relatedOption, option }) => {
//     const { setFieldValue } = useFormikContext();
//     const [ selectedOptions, setSelectedOptions ] = useState([]);

//     function handleChange(e) {
//         const value = e.target.value;
//         const selectedOption= {
//             optionId: option.id,
//             value,
//         }

//     }
        
//     return (
//         <>
//             <span className={`${styles["label"]}`}>
//                 { relatedOption.name }  
//                 <span className="text-danger"> *</span>
//             </span>
//             <select 
//                 class="form-select" 
//                 aria-label="Default select example"
//                 onChange={(e) => handleChange(e)}
//             >
//                 <OptionSelect option={option} />
//             </select>
//         </>
//     )
// }

// export default OptionGroup;

import { ErrorMessage, useFormikContext } from "formik";
import styles from "./css/OptionGroup.module.scss";
import OptionSelect from "./OptionSelect";
import ErrorText from "../../../../admin/components/specification/groups/ErrorText";

const OptionGroup = ({ relatedOption, option, name }) => {
  const { setFieldValue, values } = useFormikContext();

  function handleChange(e) {
    const value = e.target.value;
    const selectedOption = {
      optionId: option.id,
      value,
    };

    const updatedOptions = [...(values.options || [])];
    const existingIndex = updatedOptions.findIndex(
      (opt) => opt.optionId === selectedOption.optionId
    );

    if (existingIndex !== -1) {
      updatedOptions[existingIndex] = selectedOption;
    } else {
      updatedOptions.push(selectedOption);
    }

    setFieldValue("options", updatedOptions);
  }

  return (
    <>
      <span className={styles.label}>
        {relatedOption.name}
        <span className="text-danger"> *</span>
      </span>
      <select
        className="form-select"
        onChange={handleChange}
      >
        <option 
          defaultValue="none"
        >
          Select an Option
        </option>
        <OptionSelect option={option} />
      </select>
      <ErrorMessage name={name} component={ErrorText}/>
    </>
  );
};

export default OptionGroup;

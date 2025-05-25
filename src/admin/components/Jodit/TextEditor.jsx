// import React, { useState } from "react";
// import { RichTextEditor } from "@mantine/rte";
// import Label from "../FormikFieldComponents/Label";

// const TextEditor = ({ value, onChange, label, placeHolder }) => {
//   const [content, setContent] = useState(value || "");

//   const handleChange = (newContent) => {
//     setContent(newContent);
//     onChange && onChange(newContent);
//   };

//   return (
//     <div className="form-group">
//       { label && <Label label={label}/> }
//       <RichTextEditor
//         value={content}
//         onChange={handleChange}
//         placeholder={placeHolder || "Start typing..."}
//         controls={[
//           ["bold", "italic", "underline", "strike"],
//           ["unorderedList", "orderedList"],
//           ["link", "image"],
//           ["clean"],
//         ]}
//         style={{ minHeight: 300 }}
//       />
//     </div>
//   );
// };

// export default TextEditor;


import { useField } from "formik";
import { RichTextEditor } from "@mantine/rte";
import Label from "../FormikFieldComponents/Label";

const TextEditor = ({ label, placeHolder, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <div className="form-group">
      {label && <Label label={label} />}

      <RichTextEditor
        value={field.value || ""}
        onChange={(value) => helpers.setValue(value)}
        placeholder={placeHolder || "Start typing..."}
        controls={[
          ["bold", "italic", "underline", "strike"],
          ["unorderedList", "orderedList"],
          ["link", "image"],
          ["clean"],
        ]}
        style={{ minHeight: 300 }}
      />

      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default TextEditor;

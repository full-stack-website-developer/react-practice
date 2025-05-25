import Tags from "@yaireo/tagify/react";
import { ErrorMessage } from "formik";
import Label from "./Label";

const TagsInput = ({ label, name, formik }) => {
    const tagifySettings = {
        whitelist: ["Electronics", "Books", "Furniture", "Fashion"],
        maxTags: 10,
        placeholder: "Enter tags...",
        enforceWhitelist: true, 
        dropdown: {
            maxItems: 10,
            classname: "tags-look",
            enabled: 0,
        },
    };

    return (
        <div className="mb-3">
            <Label label={label}/>
            <Tags
                value={formik.values[name]?.join(", ") || ""}
                onChange={(e) => {
                    const tagList = JSON.parse(e.detail.value || "[]").map(tag => tag.value);
                    formik.setFieldValue(name, tagList);
                }}
                {...tagifySettings} 
            />
            <ErrorMessage 
                name={name} 
                component="div" 
                className="text-danger" 
            />
        </div>
    );
};

export default TagsInput;

import Tags from "../../../custom/Tag";
import styles from "./Attribute.module.scss";
import stylesTag from "../../../custom/Tag.module.css";
import { useContext, useEffect, useState } from "react";
import { attributeList } from "../../../../../store/AttributeList";
import Select from "react-select";
import Label from "../../../FormikFieldComponents/Label";
import { ErrorMessage, useFormikContext } from "formik";
import ErrorText from "../../../specification/groups/ErrorText";
import { RiDeleteBin6Line } from "react-icons/ri";

const Attribute = ({ label }) => {
    const { attributes } = useContext(attributeList);
    const [attShow, setAttrShow] = useState([]);
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
        if (values.attributes.length > 0) {
            setAttrShow(values.attributes.map(attr => ({
                attribute: attr.id,
                values: attr.values
            })));
        }
    }, []);

    function addNewAttribute() {
        const availableOptions = getAttributeOptions().filter(option => !option.isDisabled);
        if (availableOptions.length === 0) return;

        const firstAvailable = availableOptions[0].value;
        const firstValue = getFirstValue(firstAvailable);

        const newAttribute = { attribute: firstAvailable, values: [firstValue] };

        setAttrShow(current => [...current, newAttribute]);
        setFieldValue("attributes", [...values.attributes, { id: firstAvailable, values: [firstValue] }]);
    }

    function getFirstValue(attributeId) {
        const attribute = attributes.find(attr => attr.id === attributeId);
        return attribute ? attribute.values[0] : "";
    }

    function handleAttributeSelection(val, index) {
        const updatedAttributes = [...attShow];
        updatedAttributes[index].attribute = val;
        updatedAttributes[index].values = [];
        setAttrShow(updatedAttributes);

        setFieldValue("attributes", updatedAttributes.map(item => ({ id: item.attribute, values: item.values })));
    }

    function handleValueSelection(selectedValues, index) {
        const updatedAttributes = [...attShow];
        updatedAttributes[index].values = selectedValues.map((v) => v.value);
        setAttrShow(updatedAttributes);

        setFieldValue("attributes", updatedAttributes.map(item => ({ id: item.attribute, values: item.values })));
    }

    function getAttributeOptions() {
        const selectedIds = attShow.map((attr) => attr.attribute);
        return attributes.map((attr) => ({
            value: attr.id,
            label: attr.name,
            isDisabled: selectedIds.includes(attr.id),
        }));
    }

    function removeAllAttributes() {
        setAttrShow([]);
        setFieldValue("attributes", []);
    }

    function removeAttribute(index) {
        const filteredAttributes = attShow.filter((attribute, i) => i !== index);
        setAttrShow(filteredAttributes);
        setFieldValue("attributes", filteredAttributes);
    }

    return (
        <div className={styles["attribute-container"]}>
            <div className={styles["attribute-head"]}>
                <h5>{label}</h5>
                {attShow.length < 1 ? (
                    <button 
                        onClick={addNewAttribute} 
                        type="button" 
                        className="btn btn-primary"
                    >
                        Add New Attributes
                    </button>
                ) : (
                    <button 
                        type="button" 
                        className="btn btn-outline-danger" 
                        onClick={removeAllAttributes}
                    >
                        Remove All
                    </button>
                )}
            </div>

            <Tags 
                as="p" 
                className={stylesTag.p}
            >
                Adding new attributes helps the product to have many options, such as size or color.
            </Tags>

            {attShow.map((item, index) => {
                const attributeOptions = getAttributeOptions();
                const selectedAttribute = attributeOptions.find(opt => opt.value === item.attribute);

                const valueOptions = item.attribute
                    ? attributes.find(attr => parseInt(attr.id) === parseInt(item.attribute))?.values.map((value) => ({ label: value, value })) || []
                    : [];

                return (
                    <div 
                        key={index} 
                        className="d-flex gap-2 mb-3"
                    >
                        <div className="col-4">
                            <Label label="Attribute Name" />
                            <Select
                                options={attributeOptions}
                                value={selectedAttribute}
                                onChange={(option) => handleAttributeSelection(option.value, index)}
                                isOptionDisabled={(option) => option.isDisabled}
                                placeholder="Select an attribute..."
                                className="basic-select"
                            />
                        </div>

                        <div className="col-4">
                            <Label label="Attribute Values" />
                            <div className={`${styles["attribite-remove-icon-conatiner"]}`}>
                                <Select
                                    isMulti
                                    options={valueOptions}
                                    value={valueOptions.filter((opt) => item.values.includes(opt.value))}
                                    onChange={(values) => {
                                        if (values.length > 0) {
                                            handleValueSelection(values, index);
                                        }
                                    }}
                                    placeholder="Select attribute values..."
                                    className="basic-multi-select w-100"
                                />
                                <span className={`${styles["icon-remove"]} `}>
                                    <RiDeleteBin6Line
                                        className={`${styles.icon} `}
                                        onClick={() => removeAttribute(index)}
                                    />
                                </span>
                            </div>
                            <ErrorMessage
                                name={`attributes[${index}].values`}
                                component={ErrorText}
                            />
                        </div>
                    </div>
                );
            })}
            {attShow.length < attributes.length && attShow.length > 0 ? 
                <button 
                    onClick={addNewAttribute} 
                    type="button" 
                    className="mt-3 btn btn-primary"
                >
                    Add New Attribute
                </button>
            :
            null
            }
        </div>
    );
};

export default Attribute;
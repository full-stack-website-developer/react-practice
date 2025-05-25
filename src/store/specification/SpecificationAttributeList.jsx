import { createContext, useEffect, useState } from "react";
import { getDelConfirmation, remove } from "../../helper";

export const specificationAttributeList = createContext({
    inp: [],
    selectedFieldType: "",
    setFieldType: function () {},
    createInpField: function () {},
    removeInp: function () {},
    createAttribute: function () {},
    specAttributes: [],
    optVal: [],
    deleteAttribute: function () {},
    updateAttribute: function () {},
    updateOptionsAttribute: function () {},
    setOptVal: function () {},
    fieldTypeOptions: []
});

function SpecificationAttributeProvider({ children }) {
  const getStrorage = localStorage.getItem("specAttributes");

  const storageAttrList = getStrorage ? JSON.parse(getStrorage) : [];

  const [selectedFieldType, setSelectedFieldType] = useState("");
  const [inp, setInp] = useState([{ id: Date.now(), value: "" }]);
  const [specAttributes, setSpecAttributes] = useState(storageAttrList);

  const [optVal, setOptvalues] = useState(["1", "2"]);

  useEffect(() => {
    localStorage.setItem("specAttributes", JSON.stringify(specAttributes));
  }, [specAttributes]);

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


  function setFieldType(selectedFieldType) {
    setSelectedFieldType(selectedFieldType);
  }

  function createInpField() {
    const newInp = { id: Date.now(), value: "" };
    setInp([...inp, newInp]);
  }

  function removeInp(i) {
    const filteredInp = inp.filter((inp) => inp.id !== i);
    setInp(filteredInp);
  }

  function createAttribute(newSpecAttribute) {
    setSpecAttributes((curr) => [...curr, newSpecAttribute]);
    setSelectedFieldType("");
    return { success: true, message: 'Attribute Created Successfully!' }
  }

  function updateAttribute(updatedAttribute) {
    setSpecAttributes((curr) =>
      curr.map((attribute) =>
        parseInt(attribute.id) === parseInt(updatedAttribute.id)
          ? updatedAttribute
          : attribute
      )
    );

    setInp([{ id: Date.now(), value: "" }]);
    return { success: true, message: 'Attribute Updated Successfully!' }
  }

  function deleteAttribute(id) {
    const isConfirm = getDelConfirmation('Attribute');

    if(isConfirm) {
      const filteredAttributes = remove(specAttributes, id)
      setSpecAttributes(filteredAttributes);
      
      return { success: true, message: 'Attribute Deleted Successfully!' }
    }
  }

  function updateOptionsAttribute(newOptions, id) {
    setOptvalues(newOptions);
  }

  function setOptVal(id) {
    const realtedAtts = specAttributes.filter((attr) => {
      return parseInt(attr.id) === parseInt(id);
    });
    const [realtedAtt] = realtedAtts;
    const test = realtedAtt.optionValues;
    setOptvalues(test);
  }

  return (
    <specificationAttributeList.Provider value={{ inp, selectedFieldType, setFieldType, createInpField, removeInp, createAttribute, specAttributes, deleteAttribute, updateAttribute, updateOptionsAttribute, optVal, setOptVal, fieldTypeOptions }}>
      {children}
    </specificationAttributeList.Provider>
  );
}

export default SpecificationAttributeProvider;

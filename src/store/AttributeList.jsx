import { createContext, useEffect, useState } from "react";
import { getDelConfirmation, jParse, jStringify, remove } from "../helper";
import LocalStorage from "../services/LocalStorage";
import AttributeService from "../services/AttributesService";

export const attributeList = createContext({
    createAttribute: function () {},
    attributes: [],
    deleteAttribute: function () {},
    updateAttribute: function () {},
});

function AttributeProvider({ children }) {

  const lstorageAttributes = LocalStorage.getItem("attributes");
  const lstorageAttrVal = lstorageAttributes ? jParse(lstorageAttributes) : [];

  const [attributes, setAttributes] = useState(lstorageAttrVal);

  useEffect(() => {
    LocalStorage.setItem("attributes", attributes);
  }, [attributes]);

  function createAttribute(newAttribute) {
    return AttributeService.createAttribute(newAttribute, setAttributes);
  }

  function deleteAttribute(id) {
    return AttributeService.deleteAttribute(id, attributes, setAttributes);
  }

  function updateAttribute(updatedAttribute) {
    return AttributeService.updateAttribute(updatedAttribute, setAttributes)
  }

  return (
    <attributeList.Provider value={{ createAttribute, attributes, deleteAttribute, updateAttribute }}>
      {children}
    </attributeList.Provider>
  );
}

export default AttributeProvider;

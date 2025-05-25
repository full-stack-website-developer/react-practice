import { createContext, useEffect, useState } from "react";
import { getDelConfirmation, jParse, remove } from "../../helper.js";
import LocalStorage from "../../services/LocalStorage";
import GroupService from "../../services/specification/GroupService";

export const specificationGroupList = createContext({
    specGroupList: [],
    create: function () {},
    deleteGroup: function () {},
    editGroup: function () {},
});

function SpecificationGroupProvider({ children }) {
  const lstorageList = LocalStorage.getItem("specGroupList");
  const lgetList = lstorageList ? jParse(lstorageList) : [];

  const [specGroupList, setSpecGroupList] = useState(lgetList);

  useEffect(() => {
    LocalStorage.setItem("specGroupList", specGroupList);
  }, [specGroupList]);

  function create(name, description) {
    return GroupService.create(name, description, setSpecGroupList);
  }

  function deleteGroup(id) {
    return GroupService.deleteGroup(id, specGroupList, setSpecGroupList)
  }

  function editGroup(updatedGroup) {
    return GroupService.editGroup(updatedGroup, setSpecGroupList);
  }

  return (
    <specificationGroupList.Provider value={{ specGroupList, create, deleteGroup, editGroup }}>
      {children}
    </specificationGroupList.Provider>
  );
}

export default SpecificationGroupProvider;

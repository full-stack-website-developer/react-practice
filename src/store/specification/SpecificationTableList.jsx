import { createContext, useEffect, useState } from "react";
import { getDelConfirmation, jParse } from "../../helper";
import LocalStorage from "../../services/LocalStorage";
import TableService from "../../services/specification/TableService";

export const specificationTableList = createContext({
    create: function () {},
    tableList: function () {},
    deleteTable: function () {},
    edit: function () {},
});

function SpecificationTableProvider({ children }) {
  const lstorage = LocalStorage.getItem("tableList");
  const lstorageTableList = lstorage ? jParse(lstorage) : [];

  const [tableList, setTableList] = useState(lstorageTableList);

  useEffect(() => {
    LocalStorage.setItem("tableList", tableList);
  }, [tableList]);

  function create(name, description, selectedGroups) {
    return TableService.create(name, description, selectedGroups, setTableList)
  }

  function deleteTable(id) {
    const isConfirm = getDelConfirmation('table');

    if(isConfirm) {
      const filteredTables = tableList.filter((table) => table.id !== id);
      setTableList(filteredTables);
      return { success: true, message: 'Table Deleted Successfully!' };
    }

  }

  function edit(updatedTable) {
    setTableList((curr) =>
      curr.map((table) =>
        parseInt(table.id) === parseInt(updatedTable.id) ? updatedTable : table
      )
    );
    return { success: true, message: 'Table Updated Successfully!' };
  }

  return (
    <specificationTableList.Provider value={{ create, tableList, deleteTable, edit }}>
      {children}
    </specificationTableList.Provider>
  );
}

export default SpecificationTableProvider;

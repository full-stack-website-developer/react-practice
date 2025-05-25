class TableService {
      static create(name, description, selectedGroups, setTableList) {
        const newTable = {
          id: Date.now(),
          name,
          description,
          selectedGroups,
        };
    
        setTableList((curr) => [...curr, newTable]);
    
        return { success: true, message: 'Table Created Successfully!' };
      }
    
      static deleteTable(id) {
        const isConfirm = getDelConfirmation('table');
    
        if(isConfirm) {
          const filteredTables = tableList.filter((table) => table.id !== id);
          setTableList(filteredTables);
          return { success: true, message: 'Table Deleted Successfully!' };
        }
    
      }
    
      static edit(updatedTable) {
        setTableList((curr) =>
          curr.map((table) =>
            parseInt(table.id) === parseInt(updatedTable.id) ? updatedTable : table
          )
        );
        return { success: true, message: 'Table Updated Successfully!' };
      }
}

export default TableService
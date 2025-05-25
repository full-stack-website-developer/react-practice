import { getDelConfirmation, remove } from "../../helper.js";

class GroupService {
      static create(name, description, setSpecGroupList) {
        const newGroup = {
          id: Date.now(),
          name,
          description,
        };
        setSpecGroupList((curr) => [...curr, newGroup]);
        return {success: 'true', message: 'Group Created Successfully!'}
      }
    
      static deleteGroup(id, specGroupList, setSpecGroupList) {
        const isConfirm = getDelConfirmation('group');
    
        if(isConfirm) {
          const filteredGroups = remove(specGroupList, id);
          setSpecGroupList(filteredGroups);
          return {success: 'true', message: 'Group Deleted Successfully!'}
        }
      }
    
      static editGroup(updatedGroup, setSpecGroupList) {
        setSpecGroupList((curr) =>
          curr.map((group) => (group.id === updatedGroup.id ? updatedGroup : group))
        );
        return {success: 'true', message: 'Group Updated Successfully!'}
      }
}

export default GroupService
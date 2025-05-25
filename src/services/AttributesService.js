import { getDelConfirmation, remove } from "../helper";

class AttributeService {
      static createAttribute(newAttribute, setAttributes) {
        setAttributes((curr) => [...curr, newAttribute]);
        return {success: true, message: 'Attribute Created Successfully!'}
      }
    
      static deleteAttribute(id, attributes, setAttributes) {
        const isConfirm = getDelConfirmation('Attribute');
        if(isConfirm) {
          const filteredAttributes = remove(attributes, id)
          setAttributes(filteredAttributes);
          return {success: true, message: 'Attribute Removed Successfully!'}
        }
        else {
          return {success: false, message: 'Attribute not removed!'}
        }
      }
    
      static updateAttribute(updatedAttribute, setAttributes) {
        setAttributes((curr) =>
          curr.map((attr) =>
            attr.id === updatedAttribute.id ? updatedAttribute : attr
          )
        );
        return {success: true, message: 'Attribute Updated Successfully!'}
      }
}

export default AttributeService
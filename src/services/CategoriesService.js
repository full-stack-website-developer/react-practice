import { getDelConfirmation, remove } from "../helper.js";

class CategoriesService {
    static addCategory(name, selectedParentCategory, parentCategories, setParentCategories, setcategories) {

        if (selectedParentCategory === "none" || selectedParentCategory === "") {
    
          const newParentCategory = {
            id: Date.now(),
            name: name.toLowerCase(),
          };
    
          setParentCategories((prev) => [...prev, newParentCategory]);
          return { success: true, message: "Parent-category added" };
        } else if (selectedParentCategory !== "none" || selectedParentCategory !== "") {
          const parent = parentCategories.find(parentCategory =>
            parentCategory.id == parseInt(selectedParentCategory)
          );
          const parentId = parent ? parent.id : null;
          
          const newCategory = {
            id: Date.now(),
            name: name.toLowerCase(),
            parentId,
          };
    
          setcategories((prev) => [...prev, newCategory]);
          return { success: true, message: "Child-category added" };
        }
    }

    static deleteParentCategory(parentId, parentCategories, setParentCategories) {
        const isConfirm = getDelConfirmation('category');

        if(isConfirm){
            const filteredCategory = remove(parentCategories, parentId)
            setParentCategories(filteredCategory);
            return { success: true, message: "Parent-category removed" };
        }
    }

    static deleteCategory(categoryId, categories, setcategories) {
        const isConfirm = getDelConfirmation('sub category');
    
        if(isConfirm) {
          const filteredCategories = remove(categories, categoryId)
          setcategories(filteredCategories);
          return { success: true, message: "Sub-category removed" };
        }
      }
    
}

export default CategoriesService
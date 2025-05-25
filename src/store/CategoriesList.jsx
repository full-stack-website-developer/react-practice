import { createContext, useEffect, useState } from "react";
import LocalStorage from "../services/LocalStorage";
import { useNavigate } from "react-router-dom";
import CategoriesService from "../services/CategoriesService";

export const categoriesList = createContext({
  addCategory: function () {},
  categories: [],
  parentCategories: [],
  deleteParentCategory: function () {},
  deleteCategory: function () {},
  updateParentCategory: function () {},
  updateChildCategory: function () {},
  sideBarData: {
    activePage: "",
    setActivePage: function () {},
  },
});

function Category({ children }) {
  ////////////////////////// CATEGORIES RELATED CODE

  const localParentCategories = LocalStorage.getItem("parentCategories");
  const parentCategoriesStorage = LocalStorage.getParsedStorageArray(localParentCategories);

  const localCategories = LocalStorage.getItem("categories");
  const categoriesStorage = LocalStorage.getParsedStorageArray(localCategories);

  const [categories, setcategories] = useState(categoriesStorage);
  const navigate = useNavigate()
  const [parentCategories, setParentCategories] = useState(
    parentCategoriesStorage
  );

  useEffect(() => {
    LocalStorage.setItem("parentCategories", parentCategories);
    LocalStorage.setItem("categories", categories);
  }, [parentCategories, categories]);

  function addCategory(name, selectedParentCategory) {
    return CategoriesService.addCategory(name, selectedParentCategory, parentCategories, setParentCategories, setcategories);
  }

  function updateParentCategory(updatedCategory) {

      setParentCategories((curr) => 
        curr.map((currParentCategory) => parseInt(currParentCategory.id) === parseInt(updatedCategory.id) ? updatedCategory : currParentCategory)
      )

      return { success: true , message: 'testCategory Updated SUccessfully!'}
  }

  function updateChildCategory(name, selectedChildCategory, id) {
 
        if (selectedChildCategory === "none" || selectedChildCategory === "") {
        
          const newChildCategory = {
            id: Date.now(),
            name: name.toLowerCase(),
          };


    
          setParentCategories((prev) => [...prev, newChildCategory]);
          deleteCategory(id)
          return { success: true, message: "Parent-category added" };
        } else if (selectedChildCategory !== "none" || selectedChildCategory !== "") {

          const udatedChildCategory = {
            id,
            name,
            parentId: selectedChildCategory,
          }

          setcategories((curr) => 
            curr.map((currChildCategory) => parseInt(currChildCategory.id) === parseInt(udatedChildCategory.id) ? udatedChildCategory : currChildCategory)
          )
    
          return { success: true, message: "Child Category added" };
        }
  }


  function deleteParentCategory(parentId) {
    return CategoriesService.deleteParentCategory(parentId, parentCategories, setParentCategories)
  }

  function deleteCategory(categoryId) {
    return CategoriesService.deleteCategory(categoryId, categories, setcategories)
  }

  ////////////////////////// SIDEBAR RELATED CODE

  const [activePage, setActivePage] = useState("products");

  const sideBarData = {
    activePage,
    setActivePage,
  };

  return (
    <categoriesList.Provider value={{ addCategory, categories, parentCategories, deleteParentCategory, deleteCategory, sideBarData, updateParentCategory, updateChildCategory }}>
      {children}
    </categoriesList.Provider>
  );
}

export default Category;

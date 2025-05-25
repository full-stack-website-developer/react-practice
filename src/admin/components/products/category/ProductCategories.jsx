import styles from "./ProductCategories.module.css";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { categoriesList } from "../../../../store/CategoriesList";
import { CiFolderOn, CiFileOn } from "react-icons/ci";
import ToastExample from "../../toaster/toaster";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import specific icons
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { TbEdit } from "react-icons/tb";

const ProductCategories = () => {
  const { categories, parentCategories, deleteCategory, deleteParentCategory } = useContext(categoriesList);
  const navigate= useNavigate();
  


  const handleDeleteCategory = (id) => {
    const result = deleteCategory(id);
    if (result.success) {
      ToastExample(result.message, "success");
    }
    navigate("/admin/categories", {
      state: { toastMessage: "Sub-category removed successfully!", toastType: "danger" }
    });
  };
  
  const handleDeleteParentCategory = (id) => {
    const result = deleteParentCategory(id);
    if (result.success) {
      ToastExample(result.message, "success");
    }
    navigate("/admin/categories", {
      state: { toastMessage: "Parent-category removed successfully!", toastType: "danger" }
    });
  };

  function editParentCategory(id) {
    navigate(`parentCategoryEdit/${id}`);
  }

  function editSubCategory(id) {
    navigate(`childCategoryEdit/${id}`)
  }


  return (
    <>
      <h1>All Product Categories</h1>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to={"create"} className="text-white text-decoration-none">
          <button className="btn btn-success align-center me-3">Create</button>
        </Link>
      </div>
      <ul className={`${styles["list-container"]} list-unstyled ps-0`}>
        {parentCategories.map((parentCategory) => {
          const relatedCatgeories = categories.filter(category => parseInt(category.parentId) === parseInt(parentCategory.id))

          return (
            <li className={`mb-1 ${styles.list}`} key={parentCategory.id}>
              <button
                className={`${styles["list-button"]} btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed btn-success`}
                data-bs-toggle="collapse"
                data-bs-target={`#${parentCategory.id}`}
                aria-expanded="true"
              >
                <div>
                  <CiFolderOn className={`${styles["icon"]}`} />
                  {parentCategory.name}
                </div>
                <div className="d-flex gap-2">
                  {
                    relatedCatgeories.length > 0 && <FontAwesomeIcon icon={faArrowDown} className={`${styles['icon-arrow']}`} />
                  }
                  <TbEdit
                    className={`${styles.icon}`}
                    onClick={() => editParentCategory(parentCategory.id)}
                  />
                  <MdDeleteForever
                    onClick={() =>
                      handleDeleteParentCategory(parentCategory.id)
                    }
                  />
                </div>
              </button>
              {
                relatedCatgeories.length > 0 && 
                <div className="collapse" id={parentCategory.id}>
                  <ul
                    className={`${styles["sub-categories"]} btn-toggle-nav list-unstyled fw-normal pb-1 small`}
                  >
                    {relatedCatgeories.map((category) => {
                      return (
                        <li key={category.id}>
                          <a
                            className="btn btn-warning link-body-emphasis d-inline-flex text-decoration-none rounded"
                          >
                            <div>
                              <CiFileOn className={`${styles["icon"]}`} />
                              {category.name}
                            </div>
                            <div className="d-flex gap-2">
                            <TbEdit
                              className={`${styles.icon}`}
                              onClick={() => editSubCategory(category.id)}
                            />
                              <MdDeleteForever
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                              />
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              }
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProductCategories;

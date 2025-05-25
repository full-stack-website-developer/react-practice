import { useNavigate, useParams } from "react-router-dom";
import styles from "./AddCategory.module.scss";
import { useContext } from "react";
import { categoriesList } from "../../../../store/CategoriesList";
import { Formik, Form } from "formik"; 
import * as Yup from 'yup'
import FormikControl from '../../FormikControl'
import { navigateWithToaster } from "../../../../helper";

const EditChild = () => {
  const { categories, parentCategories, updateChildCategory } = useContext(categoriesList);
  const navigate = useNavigate();
  const { id } = useParams()

  const relatedCategories = categories.filter((category) => parseInt(category.id) === parseInt(id));
  const [ relatedCategory ] = relatedCategories;
  const relatedParentCategories = parentCategories.filter((parentCategory) => parseInt(parentCategory.id) === parseInt(relatedCategory.parentId));
  const [ relatedParentCategory ] = relatedParentCategories;

  const initialValues = {
    name: relatedCategory.name,
    parentCategory: relatedParentCategory.id,
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed")
      .test(
        "unique-name",
        "Name Already Exist!",
        function (value) {
          if (!value) return true;
  
          const name = value.toLowerCase().trim();
          const currentName = relatedCategory.name.toLowerCase().trim();

          const parentExists = parentCategories.some(
            (parentCategory) => parentCategory.name.toLowerCase().trim() === name && parentCategory.name.toLowerCase().trim() !== currentName
          );
          const categoryExists = categories.some(
            (category) => category.name.toLowerCase().trim() === name && category.name.toLowerCase().trim() !== currentName
          );
  
          return !(parentExists || categoryExists);
        }
      ),
  });
  
  const onSubmit = (values) => {
    
    const { name, parentCategory } = values;

    const result = updateChildCategory(name, parentCategory, id);

    if(result.success){
        navigateWithToaster(navigate, '/categories', result.message, 'success')
    }

  }

  const parentCategoryOptions = (parentCategories) ? parentCategories : [];

  const defOption = {
    key: 'None', value: 'none',
  }

  return (
    <>
      <h1>Add New Category</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
          formik => {
            return <Form className={`${styles["add-category-conatiner"]}`} >
              <div className="d-flex gap-3">
                <div className="mb-3 col-6">
                  <FormikControl control='input' label='Name' name='name'/>
                </div>
                <div className="mb-3 col-6">
                  <FormikControl name='parentCategory' control='select' label='Parent' defOption={defOption} options={parentCategoryOptions}/>
                  <div id="emailHelp" className="form-text">
                    Leave 'None' selected to make this a Parent Category
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </Form>
          }
        }
      </Formik>
    </>
  );
};

export default EditChild;

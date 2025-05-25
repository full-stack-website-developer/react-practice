import { useNavigate } from "react-router-dom";
import styles from "./AddCategory.module.scss";
import { useContext } from "react";
import { categoriesList } from "../../../../store/CategoriesList";
import { Formik, Form } from "formik"; 
import * as Yup from 'yup'
import FormikControl from '../../FormikControl'

const AddCategory = () => {
  const { categories, parentCategories, addCategory } = useContext(categoriesList);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    parentCategory: '',
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
          const parentExists = parentCategories.some(
            (parentCategory) => parentCategory.name.toLowerCase().trim() === name
          );
          const categoryExists = categories.some(
            (category) => category.name.toLowerCase().trim() === name
          );
  
          return !(parentExists || categoryExists);
        }
      ),
  });
  
  const onSubmit = (values) => {
    const { name, parentCategory } = values;
    const result = addCategory(name, parentCategory);

    if(result.success){
      navigate("/admin/categories", {
        state: { toastMessage: "Category created successfully!", toastType: "success" }
      });
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
                  <FormikControl name='parentCategory' control='select' label='Parent' defOption={defOption} options={parentCategoryOptions} />
                  <div id="emailHelp" className="form-text">
                    Leave 'None' selected to make this a Parent Category
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-success">
                  Create
                </button>
              </div>
            </Form>
          }
        }
      </Formik>
    </>
  );
};

export default AddCategory;

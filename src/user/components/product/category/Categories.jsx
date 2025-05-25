import { useContext } from "react";
import { categoriesList } from "../../../../store/CategoriesList";
import styles from "./css/Categories.module.scss";

const Categories = ({ category }) => {
    const { categories, parentCategories } = useContext(categoriesList);
    
    const { parent, subCategories } = category;
    
    const selectedCategories = [
        ...parentCategories.filter(category => parent.includes(category.id)),
        ...categories.filter(category => subCategories.includes(category.id))
      ];
      
    return (
        <div className={`${styles["categories-container"]}`}>
            <span className={`${styles["label"]}`}>Category : </span>
            {
                selectedCategories.map((category, index) => {
                    return (
                        <span className={`${styles["categories"]}`}>
                            { category.name } 
                            { index < selectedCategories.length - 1 && ", " }
                        </span>
                    )
                })
            }
        </div>
    )
}

export default Categories;
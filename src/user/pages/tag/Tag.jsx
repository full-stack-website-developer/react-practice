import { useParams } from "react-router-dom";
import ProductCard from "../../components/product/relatedProducts/Card";
import { useContext } from "react";
import { productList } from "../../../store/ProductList";
import styles from "./css/Tag.module.scss";

const Tag = () => {
    const { tag } = useParams();
    const { products } = useContext(productList);

    const filteredProducts = products.filter(product => product.tags.includes(tag));
    return (
        <>
            <h2>All "{tag}" tagrelated Products</h2>
            <div className={`${styles["product-container"]}`}>
            {
                filteredProducts &&
                filteredProducts.map( filteredProduct => {
                    return(
                        <>
                            <ProductCard product={filteredProduct}/>
                        </>
                    )
                })
            }
            </div>
        </>
    )
}

export default Tag;
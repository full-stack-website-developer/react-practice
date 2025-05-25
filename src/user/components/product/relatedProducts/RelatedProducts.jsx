import { useContext } from "react";
import { productList } from "../../../../store/ProductList";
import ProductCard from "./Card";
import styles from "./css/RelatedProducts.module.scss";

const RelatedProducts = ({ relatedProducts }) => {
    const { products } = useContext(productList);
    const filteredProducts = products.filter(product =>
        relatedProducts.map(id => parseInt(id)).includes(parseInt(product.id))
      );
      
    return (
        <>
            <h2>Related Products</h2>
            <div className={`${styles["related-products"]}`}>
            {
                filteredProducts &&
                filteredProducts.map(filteredProduct => {
                    return <ProductCard product={filteredProduct}/>
                })
            }
            </div>
        </>
    )
}

export default RelatedProducts;
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { productList } from "../../../store/ProductList";
import ProductCard from "../../components/product/relatedProducts/Card";
import styles from "./css/Store.module.scss"

const Store = () => {
    const { id } = useParams();
    const { products } = useContext(productList)

    const storeRelatedProducts = products.filter(product => product.store.includes(id));

    return (
        <>
            <h1>This is Specific Store Related Product Page</h1>
            <div className={`${styles["product-container"]}`}>
            {
                storeRelatedProducts.map(storeRelatedProduct => {
                    return <ProductCard product={storeRelatedProduct}/>
                })
            }
            </div>
        </>

    )
}

export default Store;
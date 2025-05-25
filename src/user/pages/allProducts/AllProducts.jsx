import { useContext, useEffect } from "react";
import styles from "./css/AllProducts.module.scss";
import { productList } from "../../../store/ProductList";
import ProductCard from "../../components/product/relatedProducts/Card"
import { Helmet } from "react-helmet-async";
import { SideCartContext } from "../../../store/user/sideCart/SideCartContext";

const AllProducts = () => {
  const { products } = useContext(productList);

  const {closeCart} = useContext(SideCartContext);

  useEffect(() => {
    closeCart();
  }, []);

  return (
    <>
    
      <Helmet>
        <title>AllProducts | Talha's Store</title>
        <meta name="description" content="Browse all products on Talha's Store." />
      </Helmet>
      <div className={`d-flex flex-wrap gap-4 mt-5 ${styles.allProducts}`}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </>
  );
};

export default AllProducts;

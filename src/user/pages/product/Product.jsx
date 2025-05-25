import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/common/breadcrumb/Breadcrumb";
import AdditionalImages from "../../components/product/additionalImages/AdditionalImagesWithChakra";
import MainImage from "../../components/product/mainImage/MainImage";
import ProductContent from "../../components/product/productcontent/ProductContent";
import styles from "./css/Product.module.scss"
import { productList } from "../../../store/ProductList";
import { useContext, useEffect, useState } from "react";
import SpecificationTable from "../../components/product/specification/SpecificationTable";
import useItemById from "../../../hooks/useItemById";
import Description from "../../components/product/description/Description";
import RelatedProducts from "../../components/product/relatedProducts/RelatedProducts";
import Review from "../../components/product/review/Review";
import { Helmet } from "react-helmet-async";
import { SideCartContext } from "../../../store/user/sideCart/SideCartContext";

const Product = () => {
    const { id } = useParams();
    const { products } =  useContext(productList);
    const { closeCart } = useContext(SideCartContext)

    
    const product = useItemById(products, id);
    
    const [ mainImage, setMainImage ] = useState(product.featuredImage)

    function handleMainImage(path) {
        setMainImage(path)
    }

    useEffect(() => {
        closeCart();
    }, [])

    return (
        <div>
             <Helmet>
                <title>{product.name}</title>
                <meta name="description" content="Browse all products on Talha's Store." />
            </Helmet>
            <Breadcrumb />
            <div className={`${styles["main-container"]} d-flex d-flex container`}>
                <div className={`${styles["images-container"]}`}>
                    <AdditionalImages
                        additionalImages={product.additionalImages}
                        handleMainImage={handleMainImage}
                        featuredImage={product.featuredImage}
                        mainImage={mainImage}
                    />
                    <MainImage featuredImage={mainImage}/>
                </div>
                <div className={`${styles["product-details"]}`}>
                    <ProductContent product={product}/>
                </div>
            </div>
            <div className={`${styles["paragraph-container"]} container`}>
                { product.description !== "" && <Description description={product.description}/> }
            </div>
            <div className={`${styles["specification-container"]} container`}>
                { product.specificationTable.table && <SpecificationTable specTable={product.specificationTable} /> }
                <hr />
            </div>
            <div className={`${styles["reviews-container"]} container`}>
                <Review poductId={product.id}/>
                <hr />
            </div>
            <div className={`${styles["relatedProducts-container"]}`}>
                { product?.relatedProducts?.length > 0 && <RelatedProducts relatedProducts={product.relatedProducts} /> }
            </div>
        </div>
    )
}

export default Product;
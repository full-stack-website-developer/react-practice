import { Formik, Form } from "formik";
import { dicountedPrice } from "../../../../helper";
import Store from "../brandGroup/Store/Store";
import Message from "../brandGroup/message/Message";
import AvgRating from "../brandGroup/rating/Rating";
import Categories from "../category/Categories";
import Content from "../content/Content";
import Name from "../name/Name";
import Option from "../option/Option";
import Personalization from "../personalization/Personalization";
import Discount from "../priceGroup/discount/Discount";
import Price from "../priceGroup/price/Price";
import QuantityGroup from "../quantityGroup/QuantityGroup";
import Sku from "../sku/Sku";
import Tags from "../tags/Tags";
import BtnWishList from "../wishlist/BtnWishList";
import styles from "./css/ProductContent.module.scss"
import * as Yup from "yup"; 
import { useContext } from "react";
import { cartContext } from "../../../../store/user/product/Cart";
import FormikControl from "../../../../admin/components/FormikControl";
import useItemById from "../../../../hooks/useItemById";

const ProductContent = ({ product }) => {

    const discountedPrice = dicountedPrice(product.price, product.discount)

    const { addCart, cartProducts, updateCart } = useContext(cartContext);

    const relatedProduct = useItemById(cartProducts, product.id);

    const initialValues ={
        id: product.id,
        options: [],
        price: discountedPrice || product.price,
        quantity: product.quantity.min || 1,
    }

    // const validationSchema = (relatedProduct, product) => Yup.object().shape({

        
    //     // options: Yup.array()
    //     //     .of(
    //     //     Yup.object().shape({
    //     //         optionId: Yup.number().required("Option ID is required"),
    //     //         value: Yup.string().required("Value is required"),
    //     //     })
    //     //     )
    //     //     .min(1, "Please select at least one option")
    //     //     .required("Options are required"),
    //     quantity: Yup.number()
    //         .required("Quantity is required")
    //         .min(
    //         relatedProduct.quantity < product.quantity.min
    //             ? relatedProduct.quantity
    //             : product.quantity.min,
    //         `Quantity must be at least ${
    //             relatedProduct.quantity < product.quantity.min
    //             ? relatedProduct.quantity
    //             : product.quantity.min
    //         }`
    //         )
    //         .max(product.quantity.max, `Quantity must not exceed ${product.quantity.max}`),
    // });

    const validationSchema = (relatedProduct, product) => {
        console.log("relatedProduct:", relatedProduct);
        console.log("product:", product);
      
        // Default to product.quantity.min if relatedProduct is not available
        const relatedQty = relatedProduct?.quantity ?? null;
      
        const dynamicMin = (relatedQty !== null)
            ? (relatedQty < product.quantity.min ? product.quantity.min - relatedQty  : 0)
            : product.quantity.min;
      
        console.log("Calculated min quantity:", dynamicMin);
        console.log("Max quantity:", product.quantity.max);
      
        return Yup.object().shape({
          quantity: Yup.number()
            .required("Quantity is required")
            .min(dynamicMin, `Quantity must be at least ${dynamicMin}`)
            .max(product.quantity.max || 100, `Quantity must not exceed ${product.quantity.max || '100'}`),
        });
      };

    const onSubmit = values => {
        console.log('hererhere')
        const isAdd = cartProducts.map(cartProduct => (parseInt(cartProduct.id) === parseInt(values.id)) && "false");

        if(isAdd.includes("false")) {
            updateCart(values)
        }
        else {
            addCart(values)
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={() => validationSchema(relatedProduct, product)} onSubmit={onSubmit}>
            {
                formik => {
                    return <Form>
                        
                        <div className={`${styles["details"]}`}>
                            <FormikControl control="input" name="id" type="hidden"/>
                            <Name name={product.name}/>
                            <div className={`${styles["brand-group"]}`}>
                                {
                                    product.store &&
                                    <Store storeId={product.store}/>
                                } 
                                <AvgRating productId={product.id}/>
                                <Message />
                            </div>
                            <div className={`${styles["price-group"]}`}>
                                <Price name="price" price={discountedPrice || product.price}/>
                                {
                                    product.discount &&
                                    <Discount 
                                    discount={product.discount} 
                                    price={product.price}
                                    />
                                }
                            </div>
                            <div className={`${styles["options-group"]}`}>
                                <Option options={product.attributes} name="options"/>
                            </div>
                            <span className={`${styles["availability-text"]}`}>Available</span>
                            <div className={`${styles["content-container"]}`}>
                                <Content content={product.content}/>
                            </div>
                            <div className={`${styles["personalization-section"]}`}>
                                <Personalization />
                            </div>
                            <div className={`${styles["quanity-section"]}`}>
                            <QuantityGroup product={product} name="quantity"/>
                            </div>
                            <BtnWishList />
                            { product.sku && <Sku sku={product.sku} /> }
                            { (product.category.parent).length > 0 || (product.category.subCategories).length > 0 && (<Categories category={product.category} />) }
                            { product.tags.length > 0 && <Tags tags={product.tags}/> }
                        </div>
                    </Form>
                }
            }
        </Formik>
    )
}

export default ProductContent;
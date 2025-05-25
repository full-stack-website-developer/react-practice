import { useContext, useState } from "react";
import CartSideBar from "../../cartSideBar/CartSideBar";
import styles from "./css/BtnCart.module.scss";
import { cartContext } from "../../../../../store/user/product/Cart";
import { useNavigate } from "react-router-dom";
import { navigateWithToaster } from "../../../../../helper";
import { useFormikContext } from "formik";
import { SideCartContext } from "../../../../../store/user/sideCart/SideCartContext";

const BtnCart = ({ product }) => {
    const { cartProducts } = useContext(cartContext);
    const navigate = useNavigate();
    const { openCart } = useContext(SideCartContext)

    const {values, errors, setFieldError} = useFormikContext();

    const relatedProduct = cartProducts.find(cartProduct => parseInt(cartProduct.id) === parseInt(product.id));

    function handleCartBtn(e) {
        
        const currentQty = parseInt(values.quantity);
        const existingQty = parseInt(relatedProduct?.quantity ?? 0);
        const totalQty = currentQty + existingQty;

        const minQty = product.quantity.min;
        const maxQty = product.quantity.max;
        console.log('here11');

        if (totalQty < minQty || totalQty > maxQty) {
            e.preventDefault();
            setFieldError("quantity", `Total quantity exceeded.`);
            return;
        }

        console.log(errors)

        if (!errors.quantity) {
            console.log('here12');

            openCart();

            // if (cartProducts.length < 1){
            //     setTimeout(() => {
            //         setIsSideCartOpen(false)
            //     }, 1000)
            //     setIsSideCartOpen(true)
            // }
            const relatedId = relatedProduct?.quantity ?? null;
      
            if(relatedId !== null) {
                if (parseInt(relatedProduct.id) === parseInt(product.id)) {
                    navigateWithToaster(navigate, `/product/${product.permalink}/${product.id}`, 'Item Updated to Cart Successfully', "success");
                }
            } else {
                navigateWithToaster(navigate, `/product/${product.permalink}/${product.id}`, 'Item Added to Cart Successfully', "success");
            }
        }
    }
    return (
        <>
            <button type="submit" className={`${styles["cart-btn"]} btn btn-outline-dark`} onClick={handleCartBtn} disabled={values.quantity < 1}>Add to Cart</button>
        </>
    )
}

export default BtnCart;
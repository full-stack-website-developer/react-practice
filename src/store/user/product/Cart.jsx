import { createContext, useContext, useEffect, useState } from "react";
import LocalStorage from "../../../services/LocalStorage";
import { jParse, navigateWithToaster } from "../../../helper";
import cartService from "../../../services/user/product/cart/CartService";
import { ToastContext } from "../../ToastContext";

export const cartContext = createContext({
    addCart: function () {},
    updateCart: function () {},
    cartTotal: function () {},
    updateCartQuantity: function () {},
    cartProducts: [],
    removeItem: function () {},
});

const CartProvider = ({ children }) => {
    const lCartProductsdata = LocalStorage.getItem("cartItems");
    const lCartProducts = lCartProductsdata ? jParse(lCartProductsdata) : [];

    const [ cartProducts, setCartProduct ] = useState(lCartProducts);
    const { showToast } = useContext(ToastContext)
 
    useEffect(() => {
        LocalStorage.setItem("cartItems", cartProducts);
    }, [cartProducts]);

    function addCart(product) {
        cartService.add(setCartProduct, product);
    }

    function updateCartQuantity(updatedProduct) {
        cartService.updateCartQuantity(setCartProduct, updatedProduct);
    }

    function updateCart(updatedProduct) {
        cartService.updateCart(setCartProduct, updatedProduct);
    }

    function cartTotal() {
        return cartService.cartTotal(cartProducts);
    }

    function removeItem(id) {
        cartService.removeItem(setCartProduct, cartProducts, id);
        showToast("Item removed from cart!", "danger")
    }

    return (
        <cartContext.Provider value={{ addCart, cartProducts, updateCartQuantity, updateCart, cartTotal, removeItem}}>
            {children}
        </cartContext.Provider>
    )
    
}

export default CartProvider;
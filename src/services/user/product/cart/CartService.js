class cartService {
    static add(setCartProduct, product) {
        setCartProduct((prev) => [...prev, product])
    }

    static updateCartQuantity(setCartProduct, updatedProduct) {
        setCartProduct(prev => prev.map(product => {
            return parseInt(product.id) === parseInt(updatedProduct.id) ? updatedProduct : product;
        }))
    }

    static updateCart(setCartProduct, updatedProduct) {
        setCartProduct(prev => prev.map(product => {
            return parseInt(product.id) === parseInt(updatedProduct.id) ? { ...updatedProduct, quantity: product.quantity + updatedProduct.quantity } : product;
        }))
    }

    static cartTotal(cartProducts) {
        let total = 0;
        cartProducts.map(cartProduct => {
            total += parseFloat(cartProduct.price) * parseFloat(cartProduct.quantity);
        })
        return Math.round(total);
    }

    static removeItem(setCartProduct, cartProducts, id) {
        const filteredItems = cartProducts.filter(cartProduct => cartProduct.id !== id);
        setCartProduct(filteredItems);
    }
}

export default cartService;
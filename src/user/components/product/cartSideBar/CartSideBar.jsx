import React, { useContext } from "react";
import styles from "./css/CartSideBar.module.scss";
import { cartContext } from "../../../../store/user/product/Cart";
import { productList } from "../../../../store/ProductList";
import { Link } from "react-router-dom";

const CartSideBar = ({ isOpen = false, toggleCart }) => {
  const { cartProducts, updateCartQuantity, cartTotal, removeItem} = useContext(cartContext);
  const { products } = useContext(productList)

  function updateItemQuantity(id, quantity, minQuantity, maxQuantity) {

    if((quantity < (minQuantity || 0)) || (quantity > (maxQuantity || 100))){
      return;
    }
    if(quantity < 1) {
      removeItem(id)
    } else {
      const product = cartProducts.find(cartProducts => parseInt(cartProducts.id) === parseInt(id));
      const updatedQuantity = {...product, quantity};
      updateCartQuantity(updatedQuantity)
    }
  }

  const total = cartTotal();

  return (
    <div className={`${styles["side-cart"]} ${isOpen && styles.open}`}>
      <button 
        className={`${styles["close-btn"]}`} 
        onClick={toggleCart}
      >
        ✖
      </button>
      <h3>Your Cart ({cartProducts.length})</h3>

      {
        cartProducts.length > 0 ? 
        <>
          {cartProducts.map((item) => {
            const product = products.find(product => parseInt(product.id) === parseInt(item.id));
            return (
              <div 
                key={item.id}  
                className={`${styles["cart-item"]}`}
              >
                <img 
                  src={product.featuredImage || item.image} 
                  alt={item.name} 
                  width="50"
                />
                <div>
                  <p 
                    className={styles["truncate"]} 
                    title={product.name}
                  >
                    <h6>{product.name}</h6>
                  </p>
                  <p>${item.price} x {item.quantity}</p>
                  <div>
                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1, product.quantity.min, product.quantity.max)}>+</button>
                    <button onClick={() => updateItemQuantity(item.id, item.quantity - 1, product.quantity.min)}>-</button>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ) 
            
          }
          )}
          <h4>Total: ${total}</h4>
        </>
        : 
        <div className={`${styles["btn-continue"]}`}>
          <Link to={'/AllProducts'}>
            <button className="mt-3">Continue Shopping</button>
          </Link>
        </div>
      }
      
      

    </div>
  );
};

export default CartSideBar;

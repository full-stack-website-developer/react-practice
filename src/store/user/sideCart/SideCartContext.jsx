import { createContext, useState, useContext } from "react";

export const SideCartContext = createContext({
    toggleCart: function () {},
    openCart: function () {},
    closeCart: function () {},
});

export const SideCartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => setIsOpen(prev => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <SideCartContext.Provider value={{ isOpen, toggleCart, openCart, closeCart }}>
      {children}
    </SideCartContext.Provider>
  );
};

export default SideCartProvider;

import { createContext, useState } from "react";

export const ToastContext =  createContext({
  showToast: function () {},
})

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: "", type: "" });
  
    const showToast = (message, type = "success") => {
      setToast({ message, type });
  
      setTimeout(() => {
        setToast({ message: "", type: "" }); // hide after 3 seconds
      }, 3000);
    };
  
    return (
      <ToastContext.Provider value={{ toast, showToast }}>
        {children}
      </ToastContext.Provider>
    );
  };


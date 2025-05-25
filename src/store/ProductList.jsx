import { createContext, useEffect, useState } from "react";
import LocalStorage from "../services/LocalStorage";
import { getDelConfirmation, jParse } from "../helper";

export const productList = createContext({
    logoPreviewHandle: function () {},
    logoPreview: "",
    create: function () {},
    products: [],
    removeProduct: function () {},
    update: function () {},
})

function ProductListProvider({children}) {
    const lProductsData = LocalStorage.getItem("products")
    const lProducts = lProductsData ? jParse(lProductsData) : [];


    const [ logoPreview, setLogoPreview ] = useState(null);
    const [ products, setProducts ] = useState(lProducts)

    useEffect(() => {
        LocalStorage.setItem("products", products)
    }, [ products ])

    function logoPreviewHandle(previewURL) {
        setLogoPreview(previewURL);
    }

    function create(newProduct) {
        setProducts([...products, newProduct])
        return { success: true, message: "Product Created Successfully" }
    }

    function removeProduct(id) {
        const isConfirm = getDelConfirmation('product');

        if(isConfirm){
            const filteredProducts = products.filter(product => parseInt(product.id) !== parseInt(id));
            setProducts(filteredProducts);
        }
    }

    function update(updatedProduct) {
        setProducts(currProducts => currProducts.map(currProduct => parseInt(currProduct.id) === parseInt(updatedProduct.id) ? updatedProduct : currProduct));
        return { success: true, message: "Product Updated Successfully" }
    }

    return <productList.Provider value={{ logoPreviewHandle, logoPreview, create, products, removeProduct, update }}>
        {children}
    </productList.Provider>
}

export default ProductListProvider
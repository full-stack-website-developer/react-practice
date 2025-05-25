import { createContext, useEffect, useState } from "react";
import LocalStorage from "../../services/LocalStorage";
import { jParse } from "../../helper";

export const productLabelList = createContext({
    create: function () {},
    productLabels: [],
    update: function () {},
    removeLabel: function () {},
})

const ProductLabelProvider = ({ children }) => {
    const lstorageLabels = LocalStorage.getItem("productLabels");
    const lstorageLabelsVal = lstorageLabels ? jParse(lstorageLabels) : [];

    const [ productLabels, setProductLabels ] = useState(lstorageLabelsVal)


    useEffect(() => {
        LocalStorage.setItem("productLabels", productLabels);
    }, [ productLabels ])

    function create(name, backgroundColor, textColor) {
        const newLabel = {
            id: Date.now(),
            name,
            backgroundColor,
            textColor,
        }

        setProductLabels([...productLabels, newLabel])
        return { success: true, message: "Label Created Successfully" }
    }

    function update(updatedLabel) {
        setProductLabels(curr => curr.map(currLabel => {
            return (parseInt(currLabel.id) === parseInt(updatedLabel.id)) ? updatedLabel : currLabel;
        }))

        return { success: true, message: "Label Updated Successfully" }
    }

    function removeLabel(id) {
        const filteredLabels = productLabels.filter(productLabel => parseInt(productLabel.id) !== parseInt(id))
        setProductLabels(filteredLabels);
    }

    return <productLabelList.Provider value={{ create, productLabels, update, removeLabel }}>
        {children}
    </productLabelList.Provider>
}

export default ProductLabelProvider
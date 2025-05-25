import { createContext, useEffect, useState } from "react";
import LocalStorage from '../../services/LocalStorage';
import { getDelConfirmation, jParse } from "../../helper";
import Brand from "../../services/BrandService";
export const brandList = createContext({
        logoPreview: "",
        logoPreviewHandle: function () {},
        setLogoPreview: "",
        logoInpVal: "",
        setLogoInpVal: function () {},
        add: function () {},
        brands: [],
        deleteBrand: function () {},
        edit: function () {},
});

function BrandProvider({children}) {

    const lstorageData = LocalStorage.getItem('brandsList');
    const lstorageBrandList = (lstorageData) ? jParse(lstorageData) : [];

    const [ logoPreview, setLogoPreview ] = useState(null);
    const [ brands, setBrand ] = useState(lstorageBrandList);


    useEffect(() => {
        LocalStorage.setItem('brandsList', brands);
    }, [brands]);

    function add(newBrand) {
        return Brand.add(newBrand, brands, setBrand, setLogoPreview)
    }

    function edit(updatedBrand) {
        return Brand.edit(updatedBrand, setBrand, setLogoPreview)
    }

    function logoPreviewHandle(previewURL) {
        setLogoPreview(previewURL);
    }

    function deleteBrand(id) {
        return Brand.deleteBrand(id, brands, setBrand)
    }

    return (
        <brandList.Provider value={ { logoPreview, logoPreviewHandle, setLogoPreview, add, brands, deleteBrand, edit } }>
            {children}
        </brandList.Provider>
    )
}

export default BrandProvider
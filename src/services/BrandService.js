import { getDelConfirmation } from "../helper";

class Brand {
    static add(newBrand, brands, setBrand, setLogoPreview) {
        setBrand([...brands, newBrand]);
        setLogoPreview("");
        return { success: true, message: 'Brand Created Successfully!'};
    }

    static edit(updatedBrand, setBrand, setLogoPreview) {
        setBrand((curr) =>
            curr.map((brand) =>
              parseInt(brand.id) === parseInt(updatedBrand.id) ? updatedBrand : brand
            )
          );

        setLogoPreview("");
        return { success: true, message: 'Brand Updated Successfully!'};
    }


    static deleteBrand(id, brands, setBrand) {
        const isConfirm = getDelConfirmation('Brand');

        if(isConfirm) {
            const filteredBrands = brands.filter((brand) => brand.id !== id);
            setBrand(filteredBrands);
            return { success: true, message: 'Brand Deleted Successfully!'};
        }
    }
}

export default Brand
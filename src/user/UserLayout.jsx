import { Outlet } from "react-router-dom"
import Header from "./components/common/header/Header"
import ProductListProvider from "../store/ProductList"
import BrandProvider from "../store/brand/brandList"
import AttributeProvider from "../store/AttributeList"
import SpecificationTableProvider from "../store/specification/SpecificationTableList"
import SpecificationAttributeProvider from "../store/specification/SpecificationAttributeList"
import SpecificationGroupProvider from "../store/specification/SpecificationGroupsList"
import Category from "../store/CategoriesList";
import StoreProvider from "../store/store/StoreList"
import ReviewProvider from "../store/user/review/Review"
import CartProvider from "../store/user/product/Cart"
import { ToastProvider } from "../store/ToastContext"
import SideCartProvider, { SideCartContext } from "../store/user/sideCart/SideCartContext"

const UserLayout = () => {
    return (
        <SideCartProvider>
            <ToastProvider>
                <CartProvider>
                    <ReviewProvider>
                        <StoreProvider>
                            <SpecificationTableProvider>
                                <SpecificationAttributeProvider>
                                    <SpecificationGroupProvider>
                                        <AttributeProvider>
                                            <BrandProvider>
                                                <ProductListProvider>
                                                <Category>
                                                    <Header />
                                                    <Outlet />
                                                </Category>
                                                </ProductListProvider>
                                            </BrandProvider>
                                        </AttributeProvider>
                                    </SpecificationGroupProvider>
                                </SpecificationAttributeProvider>
                            </SpecificationTableProvider>
                        </StoreProvider>
                    </ReviewProvider>
                </CartProvider>
            </ToastProvider>
        </SideCartProvider>
    )
}

export default UserLayout
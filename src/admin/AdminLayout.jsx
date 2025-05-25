import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Category from "../store/CategoriesList";
import AttributeProvider from "../store/AttributeList";
import SpecificationGroupProvider from "../store/specification/SpecificationGroupsList";
import SpecificationAttributeProvider from "../store/specification/SpecificationAttributeList";
import SpecificationTableProvider from "../store/specification/SpecificationTableList";
import BrandProvider from "../store/brand/brandList";
import { ToastProvider } from "../store/ToastContext";
import StoreProvider from "../store/store/StoreList";
import ProductListProvider from "../store/ProductList";
import ProductLabelProvider from "../store/label/ProductLabelList";
import '../layouts/App.css';
import ReviewProvider from "../store/user/review/Review";

const AdminLayout = () => {
    return (
        <ReviewProvider>
            <ToastProvider>
                <ProductLabelProvider>
                    <ProductListProvider>
                    <StoreProvider>
                        <BrandProvider>
                        <SpecificationTableProvider>
                            <SpecificationAttributeProvider>
                            <SpecificationGroupProvider>
                                <AttributeProvider>
                                <Category>
                                    <Header />
                                    <SideBar />
                                    <Outlet />
                                </Category>
                                </AttributeProvider>
                            </SpecificationGroupProvider>
                            </SpecificationAttributeProvider>
                        </SpecificationTableProvider>
                        </BrandProvider>
                    </StoreProvider>
                    </ProductListProvider>
                </ProductLabelProvider>
            </ToastProvider>
        </ReviewProvider>
    )
}

export default AdminLayout;
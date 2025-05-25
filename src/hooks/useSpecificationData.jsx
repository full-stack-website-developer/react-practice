import { useContext } from "react";
import { specificationAttributeList } from "../store/specification/SpecificationAttributeList";
import { specificationGroupList } from "../store/specification/SpecificationGroupsList";
import { specificationTableList } from "../store/specification/SpecificationTableList";

const useSpecificationData = () => {
    const { tableList } = useContext(specificationTableList);
    const { specAttributes } = useContext(specificationAttributeList);
    const { specGroupList } = useContext(specificationGroupList);

    return {
        tableList,
        specAttributes,
        specGroupList
    };
}

export default useSpecificationData;
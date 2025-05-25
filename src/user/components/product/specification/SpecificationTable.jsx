import Tags from "../../../../admin/components/custom/Tag";
import stylesTag from "../../../../admin/components/custom/Tag.module.scss";
import useItemById from "../../../../hooks/useItemById";
import useSpecificationData from "../../../../hooks/useSpecificationData";

const SpecificationTable = ({ specTable }) => {
    const { tableList, specAttributes, specGroupList } = useSpecificationData();

    let relatedAttributes;

    if ("none" !== specTable.table) {
        const selectedTable = useItemById( tableList, specTable.table );
    
        relatedAttributes = specAttributes.filter(specAttributes => {
            return selectedTable?.selectedGroups?.includes(specAttributes.associatedGroup);
        })
    }

    return (
        relatedAttributes ?
            <>
                <h2 className="text-start ms-0">Product Specification</h2>
                <table className="table w-30">
                    <thead>
                        <tr>
                            <th>GROUP</th>
                            <th>ATTRIBUTE</th>
                            <th>ATTRIBUTE VALUE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            relatedAttributes?.map((relatedAttribute, index) => {
                                const relatedSpecGroup = useItemById( specGroupList, relatedAttribute.associatedGroup );
                                const updatedAttrValue = useItemById( specTable.attributes, relatedAttribute.id );

                                return (
                                    <tr key={relatedAttribute.id || index}>
                                        <td>{relatedSpecGroup?.name || "Unknown Group"}</td>
                                        <td>{relatedAttribute.name}</td>
                                        <td>{updatedAttrValue?.value || relatedAttribute.defaultValue}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </>
        :  <Tags 
                as='p' 
                className={`${stylesTag.p} text-center`}
            >
                "No Specifications Of this Product."
            </Tags> 

    )
}

export default SpecificationTable;
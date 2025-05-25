// import { useContext, useEffect, useState } from "react";
// import styles from "./SpecificationTable.module.scss"
// import { specificationTableList } from "../../../../store/specification/SpecificationTableList";
// import FormikControl from "../../../FormikControl";
// import SpecificationGroupProvider, { specificationGroupList } from "../../../../store/specification/SpecificationGroupsList";
// import { specificationAttributeList } from "../../../../store/specification/SpecificationAttributeList";
// import Tags from "../../../custom/Tag";
// import stylesTag from "../../../custom/Tag.module.css"
// import { useFormikContext } from "formik";
// import { useParams } from "react-router-dom";


// const SpecificationTable = (props) => {
//     const { name, label, emptyText } = props;
//     const { tableList } = useContext(specificationTableList)
//     const { specGroupList } = useContext(specificationGroupList)
//     const { specAttributes } = useContext(specificationAttributeList)
//     const [ attributes, setAttributes ] = useState(null)
//     const { values } = useFormikContext();
//     const { id } = useParams()

//     const defOption = {
//         value: "none",
//         key: "None",
//     }

//     function handleFieldTypeChange(val) {
//         setAttributes(null)
//         if(val !== 'none') {
//             const selectedTables = tableList.filter(table => parseInt(table.id) === parseInt(val))
//             const [ selectedTable ] = selectedTables;
//             let relatedAttributes = specAttributes.filter(specAttributes => {
//                 return selectedTable.selectedGroups.includes(specAttributes.associatedGroup) 
//             })

//             setAttributes(relatedAttributes)
//         }
        
//     }

//     if(id) {
//         useEffect(() => {
//             handleFieldTypeChange(values.specificationTable)
//         }, [])
//     }

//     return (
//         <div className={`${styles["spec-table-conatiner"]}`}>
//             <div className={`${styles["spec-table-head"]}`}>
//                 <h5>{label}</h5>
//                 <div>
//                     <FormikControl control="select" name={name} options={tableList} defOption={defOption} handleFieldTypeChange={handleFieldTypeChange}/>
//                 </div>
//             </div> 
//             <div className={`${styles["spec-table"]}`}>
//                 {
//                     attributes ? 
//                     <table class="table w-100 mb-0">
//                         <thead>
//                             <tr>
//                                 <th>GROUP</th>
//                                 <th>ATTRIBUTE</th>
//                                 <th>ATTRIBUTE VALUE</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 attributes.map(relatedAttribute => {
//                                     const relatedSpecGroups = specGroupList.filter(specGroup => parseInt(specGroup.id) === parseInt(relatedAttribute.associatedGroup));
//                                     const [ relatedSpecGroup ] =  relatedSpecGroups;
//                                     return <tr>
//                                         <td>{relatedSpecGroup.name}</td>
//                                         <td>{relatedAttribute.name}</td>
//                                         <td>
//                                             {
//                                                 ( parseInt(relatedAttribute.fieldType) === 3 ||
//                                                 parseInt(relatedAttribute.fieldType) === 5 ) ?

//                                                 <select name="" id="" className="form-select">
//                                                     {
//                                                         relatedAttribute.optionValues.map(optionValue => {
//                                                             return <option value="optionValue">{optionValue}</option>
//                                                         })
//                                                     }
//                                                 </select> :
//                                                 <input type="text" name="" id="" className="form-control" defaultValue={relatedAttribute.defaultValue} />  
//                                             }
//                                         </td>
//                                     </tr>
//                                 })
//                             }
//                         </tbody>
//                     </table> :
//                     <Tags as='p' className={`${stylesTag.p}`}>
//                         {emptyText}
//                     </Tags>
//                 }
//             </div> 
//         </div>
//     )
// }

// export default SpecificationTable;


import { useContext, useEffect, useState } from "react";
import styles from "./SpecificationTable.module.scss"
import { specificationTableList } from "../../../../../store/specification/SpecificationTableList";
import FormikControl from "../../../FormikControl";
import SpecificationGroupProvider, { specificationGroupList } from "../../../../../store/specification/SpecificationGroupsList";
import { specificationAttributeList } from "../../../../../store/specification/SpecificationAttributeList";
import Tags from "../../../custom/Tag";
import stylesTag from "../../../custom/Tag.module.css"
import { useFormikContext } from "formik";
import { useParams } from "react-router-dom";


const SpecificationTable = (props) => {
    const { name, label, emptyText } = props;
    const { tableList } = useContext(specificationTableList)
    const { specGroupList } = useContext(specificationGroupList)
    const { specAttributes } = useContext(specificationAttributeList)
    const [ attributes, setAttributes ] = useState(null)
    const { values, setFieldValue } = useFormikContext();
    const { id } = useParams()

    let defOption = {
        value: "none",
        key: "None",
    }

    function handleFieldTypeChange(val) {
        setAttributes(null)
        if(val !== 'none') {
            const selectedTables = tableList.filter(table => parseInt(table.id) === parseInt(val))
            const [ selectedTable ] = selectedTables;

            let relatedAttributes = specAttributes.filter(specAttributes => {
                return selectedTable.selectedGroups.includes(specAttributes.associatedGroup) 
            })

            setAttributes(relatedAttributes)
        }
    }

    if(id) {
        useEffect(() => {
            if(values.specificationTable.table) {
                handleFieldTypeChange(values.specificationTable.table)
            }
        }, [])
    }

    function handleAttributeChange(attributeId, value) {
        const updatedAttributes = [...values.specificationTable.attributes];
        
        const existingAttributeIndex = updatedAttributes.findIndex(attr => attr.id === attributeId);
    
        if (existingAttributeIndex !== -1) {
            updatedAttributes[existingAttributeIndex].value = value;
        } else {
            updatedAttributes.push({ id: attributeId, value, specificationTable: values.specificationTable.table});
        }
    
        setFieldValue("specificationTable.attributes", updatedAttributes);
    }
    

    return (
        <div className={`${styles["spec-table-conatiner"]}`}>
            <div className={`${styles["spec-table-head"]}`}>
                <h5>{label}</h5>
                <div>
                    <FormikControl 
                        control="select" 
                        name={name} 
                        options={tableList} 
                        defOption={defOption} 
                        handleFieldTypeChange={handleFieldTypeChange}
                    />
                </div>
            </div> 
            <div className={`${styles["spec-table"]}`}>
                {
                    attributes ? 
                    <table className="table w-100 mb-0">
                    <thead>
                        <tr>
                            <th>GROUP</th>
                            <th>ATTRIBUTE</th>
                            <th>ATTRIBUTE VALUE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attributes?.map((relatedAttribute, index) => {
                                const relatedSpecGroup = specGroupList.find(
                                    group => parseInt(group.id) === parseInt(relatedAttribute.associatedGroup)
                                );

                                const updatedAttrValues = values.specificationTable.attributes.filter(attr =>
                                    parseInt(attr.id) === parseInt(relatedAttribute.id)
                                  );

                                const [ updatedAttrValue ] = updatedAttrValues

                                return (
                                    <tr key={relatedAttribute.id || index}>
                                        <td>{relatedSpecGroup?.name || "Unknown Group"}</td>
                                        <td>{relatedAttribute.name}</td>
                                        <td>
                                            {
                                                (parseInt(relatedAttribute.fieldType) === 3 ||
                                                parseInt(relatedAttribute.fieldType) === 5) ? (
                                                    <select 
                                                        name="" 
                                                        id="" 
                                                        className="form-select"
                                                        onChange={(e) => handleAttributeChange(relatedAttribute.id, e.target.value)}
                                                        defaultValue={updatedAttrValue?.value || relatedAttribute.optionValues?.[0]}
                                                    >
                                                        {
                                                            relatedAttribute.optionValues?.map((optionValue, idx) => (
                                                                <option key={idx} value={optionValue}>
                                                                    {optionValue}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                ) : (
                                                    <input 
                                                        type="text" 
                                                        name="" 
                                                        id="" 
                                                        className="form-control" 
                                                        defaultValue={updatedAttrValue?.value } 
                                                        onChange={(e) => handleAttributeChange(relatedAttribute.id, e.target.value)}
                                                    />  
                                                )
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    </table> :
                    <Tags 
                        as='p' 
                        className={`${stylesTag.p}`}
                    >
                        {emptyText}
                    </Tags>
                }
            </div> 
        </div>
    )
}

export default SpecificationTable;


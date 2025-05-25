import { useContext } from "react";
import { attributeList } from "../../../../store/AttributeList";
import styles from "./css/Option.module.scss";
import useItemById from "../../../../hooks/useItemById";
import OptionGroup from "./OptionGroup";

const Option = ({ options, name }) => {
    const { attributes } = useContext(attributeList);

    return (
        <>
        {
            options.map(option => {
                const relatedOption = useItemById( attributes, option.id );

                return (
                    <OptionGroup key={option.id} relatedOption={relatedOption} option={option} name={name} />
                )

            })
        }
        </>
    )
}

export default Option;
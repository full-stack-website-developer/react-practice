const OptionSelect = ({ option }) => {
    return (
        option.values.map(value => {
            return (
                <option 
                    defaultValue={value}
                    key={value}
                >
                    {value}
                </option>
            )
        })
    )
}

export default OptionSelect;
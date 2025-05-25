const InputTags = ({ as: Tag = "div", className = "", children }) => {
    return (
        <Tag className={className}>
            {children}
        </Tag>
    )
}

export default InputTags;
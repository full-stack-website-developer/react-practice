const useItemById = ( items, id ) => {

    return items.find(item => parseInt(item.id) === parseInt(id));
}

export default useItemById;
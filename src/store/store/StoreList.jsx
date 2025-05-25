import { createContext, useEffect, useState } from "react";
import LocalStorage from "../../services/LocalStorage";
import { jParse, remove } from "../../helper";

export const storeList =  createContext({
    create: function () {},
    stores: [],
    removeStore: function () {},
    update: function () {},
})


const StoreProvider = ({children}) => {
    const lStoreData = LocalStorage.getItem('store');
    const lStoreList = lStoreData ? jParse(lStoreData) : [];


    const [ stores, setStore ] = useState(lStoreList)
    console.log('storesdd')
    console.log(stores)
    useEffect(() => {
        LocalStorage.setItem('store', stores)
    }, [stores])

    function create(name) {
        const newStore = {
            id: Date.now(),
            name,
        }

        setStore([...stores, newStore])
        return { success: true, message: "Store Created Successfully" }
    }

    function removeStore(id) {
        const filteredStores = remove(stores, id);
        setStore(filteredStores);
    }

    function update(name, id) {
        console.log(name)
        console.log(id)

        const updatedStore = {
            id,
            name,
        }

        setStore((curr) => 
            curr.map((store) => 
                parseInt(store.id) === parseInt(id) ? updatedStore : store
            )
        );
        return { success: true, message: "Store Updated Successfully" }
    }

    return(
        <storeList.Provider value={ { create, stores, removeStore, update } }>
            {children}
        </storeList.Provider>
    )
}

export default StoreProvider

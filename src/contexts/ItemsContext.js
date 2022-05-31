import { createContext, useState, useEffect } from "react";
import axios from "axios";



const ItemsContext = createContext();

export const ItemsProvider = ({children}) =>{
    const [items, setItems] = useState([]);
    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {
        const defaultData = axios.get("https://run.mocky.io/v3/64eeeac2-b987-40d9-8d7b-98e166d5159f");
        const storeData = axios.get("https://run.mocky.io/v3/64eeeac2-b987-40d9-8d7b-98e166d5159f");
        axios.all([defaultData, storeData]).then(axios.spread((...responses) => {
            const DBList = responses[0].data;
            const webList = responses[1].data;
            setItems(DBList);
            setStoreItems(webList);
        })).catch(errors => {
                console.log(errors);
            })
    }, []);

    const value ={items, setItems, storeItems, setStoreItems}

    return(
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    )
}

export default ItemsContext;
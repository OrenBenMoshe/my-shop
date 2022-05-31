import { createContext, useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";


const CartContext = createContext();

export const CartProvider = ({children}) =>{

  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("cartList")) === null ?
    [] : JSON.parse(localStorage.getItem("cartList"))
);
  

  const {user} = useContext(UserContext);
  

  useEffect(()=>{
    const dataList = JSON.parse(localStorage.getItem("cartList"));
    if(dataList){
      const res = dataList.filter(x => x.user === user) 
      setCart(res);
    }
  },[user])

  useEffect(()=>{
    localStorage.setItem("cartList", JSON.stringify(cartList));
  },[cartList])


    useEffect(()=>{
      if( cart.length === 0) return;
      var currentCartData = JSON.parse(localStorage.getItem("cartList"));
      if(currentCartData){
        cart.forEach(cartItem => {
          const exist = currentCartData.find(x => x.user === cartItem.user && x.item.id === cartItem.item.id)
          if(exist){
            exist.item.quantity = cartItem.item.quantity;
            localStorage.setItem("cartList", JSON.stringify(currentCartData));
          }else{
            currentCartData.push(cartItem);
            localStorage.setItem("cartList", JSON.stringify(currentCartData));
          }
        })
      }
    },[cart])

    useEffect(() => {
      console.log("render useEffect on Cart.jsx");
      if (cartValue === 0) {
        setCurrentPrice(0);
        setTaxPrice(0);
        setTotalPrice(0);
      }
      var currQuantity = 0;
      var currPrice = 0;
      var priceResult = 0;
      var tex = 17;
      var taxResult = 0;
      var currTotalPrice = 0;
      cart.forEach((cartItem) => {
        currQuantity = cartItem.item.quantity;
        currPrice = cartItem.item.price;
        priceResult = priceResult + currQuantity * currPrice;
      });
      setCurrentPrice(priceResult);
      taxResult = (tex * priceResult) / 100;
      setTaxPrice(taxResult);
      currTotalPrice = priceResult + taxResult;
      setTotalPrice(currTotalPrice);
    }, [cart, cartValue]);

    const addToCart =(item)=> {
     const exist =  itemExist(item);
     if(exist){
       console.log("this item exist");
      const currCartItem = findCartItem(item)
     currCartItem.item.quantity = currCartItem.item.quantity + 1;
       setCart(prevItems => [...prevItems])
     }
     else{
      const newItem = {user: user, item: item}
      setCart(prevItem => [...prevItem, newItem])
     }
    }

    const itemExist = (item) =>{
      if(cart.find(cartItem => cartItem.item.id === item.id && cartItem.user === user))
        return true;
      return false;
    }

    const findCartItem = (item) =>{
     const currentItem =  cart.find(cartItem => cartItem.item.id === item.id && cartItem.user === user)
     if (currentItem) return currentItem;
     return false;
    }

  const updateQuantity = (item, action) => {
    console.log(action);
    console.log(item);
    if(action === "increase"){
      item.quantity = item.quantity + 1;
      setCart(prevItems => [...prevItems])
    }
    if(action === "subtract"){
      if(item.quantity === 1){
        const cartIndex = cart.findIndex(x => x.item.id === item.id);
        cart.splice(cartIndex,1);
        setCart(prevItems => [...prevItems])
        const dataIndex = cartList.findIndex(x => x.item.id === item.id && x.user === user)
        cartList.splice(dataIndex, 1);
        setCartList(prevItems => [...prevItems]);
        return;
      }
      item.quantity = item.quantity - 1;
      setCart(prevItems => [...prevItems])
    }
  }

  const valueOfCart = ()=> {
    var temp = 0;
    if(cart.length === 0){
      setCartValue(temp)
      return;
    }
    cart.forEach((cartItem) => {
      temp = temp + cartItem.item.quantity;
    });
    setCartValue(temp);
  }

  const value ={cart, setCart, cartValue, setCartValue,  addToCart,
                  valueOfCart,  updateQuantity, currentPrice, taxPrice,
                   totalPrice, cartList, setCartList};

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;
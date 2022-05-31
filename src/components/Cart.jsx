import { useState, useEffect, useContext } from "react";
import CartItem from "./CartItem";
import "../styles/Cart.css";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  console.log("render Cart.jsx");
  const { authorized, user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const {
    cart,
    setCart,
    cartValue,
    currentPrice,
    taxPrice,
    totalPrice,
    cartList,
    setCartList,
  } = useContext(CartContext);

  const [deleteAll, setDeleteAll] = useState(false);

  const createCartItem = (cartItem) => {
    return <CartItem key={cartItem.item.id} item={cartItem.item} />;
  };

  const handleDeleteClick = () => {
    deleteUserItems();
  };

  const handleBuyClick = () => {
    deleteUserItems();
    alert("Thank you for buying those products");
  };

  const deleteUserItems = () => {
    cart.forEach(() => {
      const newCartItems = cartList.filter((x) => x.user !== user);
      setCartList(newCartItems);
    });
    setDeleteAll(true);
    setCart([]);
  };

  return (
    <div className="cart-container">
      {cartValue === 0 ? (
        <h1 className="page-title">
          your cart is empty go to the store and add some items
        </h1>
      ) : (
        <h1 className="page-title">your cart items</h1>
      )}
      <div
        className="cart-items-container"
        style={{ display: deleteAll ? "none" : "show" }}
      >
        {cart.map(createCartItem)}
      </div>
      <div className="cart-info">
        <h2>cart details</h2>
        <div className="cart-details">
          <p>Items {cartValue}</p>
          <p>Current price {currentPrice}$</p>
          <p>Tax payment {taxPrice}$</p>
          <h4>
            Summery:
            {cart.map((cartItem, index) => {
              return (
                <div key={index}>
                  <span>{cartItem.item.name}</span> <span>x</span>{" "}
                  <span>{cartItem.item.quantity}</span>
                  <span> </span>
                  <span>=</span>
                  <span> </span>
                  <span>{cartItem.item.price * cartItem.item.quantity}$</span>
                </div>
              );
            })}
          </h4>
          <h3>Total price: {totalPrice}$</h3>
          {cartValue > 0 && (
            <div className="btn-details">
              <button className="buy" onClick={handleBuyClick}>
                Buy Now
              </button>
              <button className="delete-all" onClick={handleDeleteClick}>
                Delete All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

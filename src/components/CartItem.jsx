import { useContext, useEffect } from "react";
import "../styles/CartItem.css";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const CartItem = (props) => {
  console.log("render CartItem.jsx");
  const { authorized } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const { item } = props;
  const { name, info, price, img, quantity } = props.item;
  const { updateQuantity } = useContext(CartContext);

  const handleAddClick = (item) => {
    updateQuantity(item, "increase");
  };

  const handleSubtractClick = (item) => {
    updateQuantity(item, "subtract");
  };

  return (
    <div
      className="cart-item"
      style={{ display: item.quantity ? "show" : "none" }}
    >
      <img src={img} alt="" className="cart-item-image" />
      <ul className="cart-item-data">
        <li>name: {name}</li>
        <li>info: {info}</li>
        <li>price: {price}$</li>
      </ul>
      <div className="add-and-remove">
        <div className="button-group">
          <button
            className="add"
            id="add"
            onClick={() => {
              handleAddClick(item);
            }}
          >
            +
          </button>
          <span>{quantity}</span>
          <button
            className="subtract"
            onClick={() => {
              handleSubtractClick(item);
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

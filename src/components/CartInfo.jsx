import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "../styles/CartInfo.module.css";
import { useContext, useState, useEffect } from "react";
import { shopContext } from "./App";

function CartInfo({ title, image, price, quantity }) {
  const { cartItems, setCartItems, updateQuantity, removeFromCart } =
    useContext(shopContext);

  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleInputChange = (e) => {
    let newQuantity = Number(e.target.value);
    setItemQuantity(newQuantity);
  };

  const amount = `GH¢ ${parseFloat(price * itemQuantity).toFixed(2)}`;

  const increaseQty = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    updateQuantity(title, newQuantity);
  };

  const decreaseQty = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      updateQuantity(title, newQuantity);
    } else {
      return;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.imageDiv}>
        <img src={image} alt="" />
      </div>
      <div className={style.descriptionDiv}>
        <p>Description</p>
        <div>{title}</div>
      </div>
      <div className={style.priceDiv}>
        <p>Unit Price</p>
        <div>GH¢ {price}</div>
      </div>
      <div className={style.quantityDiv}>
        <p>Quantity:</p>
        <div className={style.quantity}>
          <button onClick={decreaseQty}>-</button>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={itemQuantity}
            onChange={handleInputChange}
          />
          <button onClick={increaseQty}>+</button>
        </div>
      </div>
      <div className={style.priceDiv}>
        <p>Amount</p>
        <div>{amount}</div>
      </div>
      <Button
        onClick={() => removeFromCart(title)}
        className={style.btnDel}
        size="small"
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Remove
      </Button>
    </div>
  );
}

export { CartInfo };

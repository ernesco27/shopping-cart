import React, { useContext, useState, useEffect } from "react";
import { CartInfo } from "../components/CartInfo";
import style from "../styles/Cart.module.css";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { shopContext } from "./App";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, setCartItems, getTotalAmount } = useContext(shopContext);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => (total += item.amount));
    setTotalAmount(getTotalAmount(total));
  }, [cartItems]);

  return (
    <div className={style.container}>
      <div className={style.cartDiv}>
        <h1>Your Shopping Cart</h1>
        {
          // If the cart is empty, show this message instead of the list of items:
          cartItems.length === 0 ? (
            <p> Your shopping cart is currently empty.</p>
          ) : (
            cartItems.map((item) => (
              <CartInfo
                title={item.title}
                price={item.price}
                image={item.image}
                key={item.id}
                quantity={item.quantity}
              />
            ))
          )
        }
      </div>

      <div className={style.btn}>
        {cartItems.length === 0 ? (
          <Button
            size="small"
            variant="contained"
            disabled
            startIcon={<AddShoppingCartIcon />}
          >
            Proceed to checkout
          </Button>
        ) : (
          <Link to={"/checkout"}>
            <Button
              size="small"
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
            >
              Proceed to checkout
            </Button>
          </Link>
        )}

        <div>{`GH¢ ${totalAmount.toFixed(2)}`} </div>
      </div>
    </div>
  );
}

export { Cart };

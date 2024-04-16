import { PrimarySearchAppBar } from "../components/NavBar";
import { Outlet } from "react-router-dom";
import style from "../styles/App.module.css";
import { useState, createContext } from "react";
import { useProductData } from "./ProductData";

const shopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: (item) => {},

  removeFromCart: (title) => {},
  getTotalAmount: () => {},
  updateQuantity: (title, newQuantity) => {},
});

function App() {
  const [cartItems, setCartItems] = useState([]);

  const products = useProductData("https://fakestoreapi.com/products?limit=10");

  const removeFromCart = (title) => {
    setCartItems(cartItems.filter((item) => item.title !== title));
  };

  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const updateQuantity = (title, newQuantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.title === title ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <shopContext.Provider
      value={{
        cartItems,
        products,
        setCartItems,
        removeFromCart,
        updateQuantity,
        getTotalAmount,
      }}
    >
      <div className={style.app}>
        <div>
          <PrimarySearchAppBar />
        </div>
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </shopContext.Provider>
  );
}

export { App, shopContext };

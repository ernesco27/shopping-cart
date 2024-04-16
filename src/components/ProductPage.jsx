import React, { useState, useContext, useRef, useEffect } from "react";
import style from "../styles/ProductPage.module.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { green, blue } from "@mui/material/colors";
import { shopContext } from "./App";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AlertNote } from "./Alert";

function ProductPage() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);

  const { cartItems, setCartItems } = useContext(shopContext);

  const location = useLocation();
  const { title, image, price, rating, description } = location.state || {};

  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleAddtoCart = () => {
    const newItem = {
      title,
      description,
      image,
      price,
      quantity: 1,
      amount: price,
      id: uuidv4(),
    };

    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 900);
    }
    // Check if the item already exists in the cart
    if (cartItems.some((item) => item.title === newItem.title)) {
      //alert(`${title} is already in your cart`);
      setAlert({
        severity: "error",
        message: `${title} is already in your Cart!`,
      });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    setCartItems((prevCart) => [...prevCart, newItem]);
    setAlert({ severity: "success", message: `${title} added to Cart!` });
    setTimeout(() => setAlert(null), 3000);
  };
  return (
    <div className={style.container}>
      <div className={style.imageDiv}>
        <img src={image} alt="product" />
      </div>
      <div className={style.infoDiv}>
        <div className={style.item}>
          <h1>{title}</h1>
          <h2>GH¢{price}</h2>
        </div>

        <p> {description}</p>
        <Card sx={{ maxWidth: 200 }}>
          <CardContent>
            <Typography component="legend">Rating</Typography>
            <Rating name="read-only" value={rating} readOnly />
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              sx={buttonSx}
              disabled={loading}
              onClick={handleAddtoCart}
            >
              Add To Cart
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
        {alert && (
          <AlertNote severity={alert.severity} message={alert.message} />
        )}
      </div>
    </div>
  );
}

export { ProductPage };

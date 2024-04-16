import * as React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Rating } from "@mui/material";
import { Button } from "@mui/material";

import style from "../styles/card.module.css";
import { shopContext } from "./App";
import { v4 as uuidv4 } from "uuid";
import { AlertNote } from "./Alert";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ProductCard({ title, image, price, rating, description }, props) {
  const { cartItems, setCartItems } = useContext(shopContext);
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the ProductPage and pass data via state
    navigate("/Product", {
      state: { title, image, price, rating, description },
    });
  };

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={style.card} sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        // alt="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body1"
          color="text.secondary"
          onClick={handleClick}
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="h5" gutterBottom>
          GH¢
          {price}
        </Typography>

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography component="legend">Rating</Typography>
          <Rating name="read-only" value={rating} readOnly />
        </CardContent>
      </Collapse>
      {alert && <AlertNote severity={alert.severity} message={alert.message} />}
    </Card>
  );
}

export { ProductCard };

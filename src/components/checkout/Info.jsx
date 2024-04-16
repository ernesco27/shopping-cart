import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { shopContext } from "../App";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function Info({ totalPrice }) {
  const { cartItems, setCartItems } = useContext(shopContext);

  const calculateProductAmount = (product) => {
    return (product.quantity * product.price).toFixed(2);
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.title}
              // secondary={product.desc}
            />
            <Typography variant="body1" fontWeight="medium">
              GH¢ {calculateProductAmount(product)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;

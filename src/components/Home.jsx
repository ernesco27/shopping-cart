import React from "react";
import style from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[900],
  "&:hover": {
    backgroundColor: blue[500],
  },
}));

function Home() {
  return (
    <div>
      <section className={style.hero}>
        <div className={style.imageDiv}>
          <img src="images/shopper.jpg" alt="shopper" />
        </div>
        <div className={style.infoDiv}>
          <h1>
            Step into a world where <br /> <i>style</i> knows no bounds
          </h1>
          <div>
            <Link to={"/Shop"}>
              <ColorButton
                size="small"
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
              >
                SHOP NOW!
              </ColorButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export { Home };

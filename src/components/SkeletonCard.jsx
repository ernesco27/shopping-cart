import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Skeleton from "@mui/material/Skeleton";
import style from "../styles/card.module.css";

function SkeletonCard() {
  return (
    <Card className={style.card} sx={{ width: 300 }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

      <CardContent>
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </>
      </CardContent>
    </Card>
  );
}

export { SkeletonCard };

import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

export default function StorySkeleton() {
  return (
    <>
      <Box>
        <Skeleton variant="rectangular" height="180px" animation="wave" />
      </Box>
      <Typography>
        <Skeleton width="40%" height="25px" animation="wave" />
      </Typography>
      <Typography>
        <Skeleton width="80%" height="45px" animation="wave" />
      </Typography>
      <Typography>
        <Skeleton width="50%" height="25px" animation="wave" />
      </Typography>
    </>
  );
}

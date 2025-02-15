import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularProgressBar(props: { showLoader: boolean }) {
  return props.showLoader ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  ) : (
    <></>
  );
}

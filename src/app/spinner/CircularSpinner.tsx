import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export default function CircularProgressBar(showLoader: boolean) {
  return (
    showLoader && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999, // Ensure it's above other elements
        }}
      >
        <CircularProgress />;
      </div>
    )
  );
}

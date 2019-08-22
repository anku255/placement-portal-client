import React from "react";

export default function Loader() {
  return (
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  );
}

export function CenteredLoader() {
  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader />
    </div>
  );
}

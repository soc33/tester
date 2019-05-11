import React from "react";
import "./style.css";

function Wrapper({ children, marginTop, marginLeft, heightOffset, padding }) {
  return (
    <div
      className="content-wrapper"
      style={{
        marginTop: marginTop ? marginTop : 0,
        marginLeft: marginLeft ? marginLeft : 0,
        height: heightOffset ? "calc(100vh - " + heightOffset : "calc(100vh - 0",
        padding: padding ? padding : 0
      }}
    >
      {" "}
      {children}
    </div>
  );
}

export default Wrapper;

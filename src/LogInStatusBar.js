import React, { Component } from "react";

const LogInStatusBar = (props) => {
  if (!props.accessOk) {
    return (
    <div style={{width: "100%", backgroundColor: "#ff0000"}}>
    <p style={{color: "#ffffff"}}>Access Token: Invalid</p>
    </div>
  )
  } else {
    return (
      <div></div>
    )
  }
}


export default LogInStatusBar;
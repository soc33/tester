import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

function Confirm(props) {
  return (
    <div className={"modal confirm-modal " + (props.isActive ? "is-active" : "")}>
      <div onClick={props.handleCancelClick} className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head" style={{backgroundColor: props.headerColor}}>
          <p className="modal-card-title" style={{color: props.darkText ? "black" : "white"}}>{props.title}</p>
      <button onClick={props.handleCancelClick} className="delete" aria-label="close"></button>
    </header>
    <section className="modal-card-body">
      {props.question}
    </section>
    <footer className="modal-card-foot">
          <button onClick={props.handleConfirmClick} style={{color: props.darkText ? "black" : "white"}} className={"button " + (props.buttonClassColor ? props.buttonClassColor : "is-link")}>{props.buttonText}</button>
          <button onClick={props.handleCancelClick} className="button">Cancel</button>
    </footer>
  </div>
</div>
  );
}

export default Confirm;

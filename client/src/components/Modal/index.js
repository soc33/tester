import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

function Modal(props) {
  return (
    <div className="modal form-modal is-active">
      <div onClick={props.closeForm} className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          {props.icon ? (
            <span className="icon has-text-info is-medium">
              <i style={{ color: "white" }} className={props.icon} />
            </span>
          ) : (
            ""
          )}
          <p className="modal-card-title">{props.title}</p>
          <button
            onClick={props.closeForm}
            className="delete"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">{props.children}</section>
      </div>
    </div>
  );
}

export default Modal;

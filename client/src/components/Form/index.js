import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  const {
    label,
    controls,
    classes,
    fields,
    type,
    lefticon,
    righticon,
    help,
    helptext,
    ...other
  } = props;
  return (
    <div className={"field " + (fields ? fields : "")}>
      {label ? <label className="label">{label}</label> : ""}
      <div className={"control " + (controls ? controls : "")}>
        <input
          className={"input " + (classes ? classes : "")}
          type={type ? type : "text"}
          {...other}
        />
        {lefticon ? (
          <span className="icon is-small is-left">
            <i className={lefticon} />
          </span>
        ) : (
          ""
        )}
        {righticon ? (
          <span className="icon is-small is-right">
            <i className={righticon} />
          </span>
        ) : (
          ""
        )}
      </div>
      {help ? <p className={"help " + help}>{helptext}</p> : ""}
    </div>
  );
}

export function TextArea(props) {
  const { label, ...other } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea className="textarea" {...other} />
      </div>
    </div>
  );
}

export function FormBtn(props) {
  const { button, buttontext, ...other } = props;
  return (
    <div className="control">
      <button {...other} className={"button " + (button ? button : "")}>
        {buttontext}
      </button>
    </div>
  );
}

export function DropDown(props) {
  const { label, options, ...other } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <div className="select">
          <select {...other}>
            {options.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function CheckBox(props) {
  const { label, ...other } = props;
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" {...other} />
          {label}
        </label>
      </div>
    </div>
  );
}

import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

export default function Table(props) {
  return (
    <table
      className="table is-hoverable is-striped"
      style={{ borderRadius: "6px" }}
    >
      <thead>
        <tr>
          {props.headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map(item => (
          <tr key={item._id}>
            <td>{item.position}</td>
            <td>{item.level}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>
              {item.source ? (
                <a
                  href={item.source}
                  title={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Description Source
                </a>
              ) : (
                ""
              )}
            </td>
            {props.iconClass ? <td>
              <i
                className={props.iconClass ? props.iconClass : ""}
                style={props.iconStyle ? props.iconStyle : {}}
                onClick={}
              />
            </td> : ""}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

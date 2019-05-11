import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Tabs(props) {
  return (
    <div className="tabs is-centered">
      <ul>
        <li className={props.active === "menu" ? "is-active" : ""}>
          <Link to="/admin/menu">Menu</Link>
        </li>
        <li className={props.active === "resources" ? "is-active" : ""}>
          <Link to="/admin/resources">Resources</Link>
        </li>
        <li className={props.active === "messages" ? "is-active" : ""}>
          <Link to="/admin/messages">Messages</Link>
        </li>
      </ul>
    </div>
  );
}

export default Tabs;

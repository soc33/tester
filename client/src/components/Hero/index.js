import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

function Hero(props) {
  return (
    <section className={"hero " + props.theme}>
      <div className="hero-body">
        <div
          className="container"
          style={{ textAlign: props.align, margin: props.margin }}
        >
          <h1
            style={{ fontSize: props.titlesize ? props.titlesize : "" }}
            className="title"
          >
            {props.title}
          </h1>
          <h2 className="subtitle">{props.description}</h2>
          {props.source ? (
            <a href={props.source} target="_blank" rel="noopener noreferrer">
              {props.source}
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;

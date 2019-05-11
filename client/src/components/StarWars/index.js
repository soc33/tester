import React, { Component } from "react";
import "./style.css";

class StarWars extends Component {
  componentDidMount() {
    this.props.setEffectSource("https://codepen.io/geoffgraham/pen/BpwqOE");
  }

  render() {
    return (
      <React.Fragment>
        <div className="fade" />

        <section className="star-wars">
          <div className="crawl">
            <div className="title">
              <p>Episode IV</p>
              <h1>A New Hope</h1>
            </div>

            <p>
              It is a period of civil war. Rebel spaceships, striking from a
              hidden base, have won their first victory against the evil
              Galactic Empire.
            </p>

            <p>
              During the battle, Rebel spies managed to steal secret plans to
              the Empire’s ultimate weapon, the DEATH STAR, an armored space
              station with enough power to destroy an entire planet.
            </p>

            <p>
              Pursued by the Empire’s sinister agents, Princess Leia races home
              aboard her starship, custodian of the stolen plans that can save
              her people and restore freedom to the galaxy….
            </p>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default StarWars;

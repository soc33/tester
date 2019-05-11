import React, { Component } from "react";
import Matrix from "../components/Matrix";
import Snow from "../components/Snow";
import StarWars from "../components/StarWars";

class NotFound extends Component {
  state = {
    messages: [
      {
        type: "normal",
        message: "These are not the droids you're looking for..."
      },
      {
        type: "normal",
        message: "You've reached Atlanta, GA. Thank you for calling."
      },
      { type: "special", message: "Shame" },
      {
        type: "special",
        message: "Daenerys"
      },
      {
        type: "normal",
        message: "awkward."
      },
      { type: "special", message: "Pill" },
      { type: "special", message: "Snow" },
      { type: "special", message: "StarWars" }
    ],
    selected: "",
    effectSource: ""
  };

  componentDidMount() {
    const selected = Math.floor(Math.random() * this.state.messages.length);
    this.setState({ selected: this.state.messages[selected] });
  }

  bluePill = () => {
    this.setState({ selected: { type: "special", message: "Matrix" } });
  };

  redPill = () => {
    window.location.href = window.location.origin;
  };

  setEffectSource = path => {
    this.setState({ source: path });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.source ? (
              <a
                href={this.state.source}
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50px",
                  zIndex: "100"
                }}
              >
                effect source
              </a>
            ) : (
              ""
          )}
        
        {!this.props.wait404 ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: -1
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                fontSize: "30px",
                color: "white",
                padding: "20px",
                textAlign: "center"
              }}
            >
              {this.state.selected.type === "normal" ? (
                <p>{this.state.selected.message}</p>
              ) : (
                ""
              )}

              {this.state.selected.type === "special" &&
              this.state.selected.message === "Pill" ? (
                <React.Fragment>
                  <p>
                    Will it be the{" "}
                    <label
                      onClick={this.bluePill}
                      style={{
                        display: "inline",
                        borderRadius: "16px",
                        color: "white",
                        backgroundColor: "blue",
                        cursor: "pointer",
                        padding: "4px",
                        fontSize: "24px"
                      }}
                    >
                      blue pill
                    </label>{" "}
                    or the{" "}
                    <label
                      onClick={this.redPill}
                      style={{
                        display: "inline",
                        borderRadius: "16px",
                        color: "white",
                        backgroundColor: "red",
                        cursor: "pointer",
                        padding: "4px",
                        fontSize: "24px"
                      }}
                    >
                      red pill
                    </label>{" "}
                    ?
                  </p>
                </React.Fragment>
              ) : (
                ""
              )}

              {this.state.selected.type === "special" &&
              this.state.selected.message === "Matrix" ? (
                <React.Fragment>
                  <Matrix setEffectSource={this.setEffectSource} />
                  <p style={{ zIndex: 100 }}>THE MATRIX HAS YOU</p>
                </React.Fragment>
              ) : (
                ""
              )}

              {this.state.selected.type === "special" &&
              this.state.selected.message === "Snow" ? (
                <React.Fragment>
                  <p>
                    const theNorth = "remembers"
                    <br />
                    {"//and nothing you do will make it forget"}
                  </p>
                  <Snow setEffectSource={this.setEffectSource} />
                </React.Fragment>
              ) : (
                ""
              )}

              {this.state.selected.type === "special" &&
              this.state.selected.message === "Shame" ? (
                <p>
                  <i className="fas fa-bell" style={{ color: "gold" }} />
                  <br />
                  Shame
                  <br />
                  <i className="fas fa-bell" style={{ color: "gold" }} />
                  <br />
                  Shame
                  <br />
                  <i className="fas fa-bell" style={{ color: "gold" }} />
                  <br />
                  Shame
                  <br />
                  <i className="fas fa-bell" style={{ color: "gold" }} />
                </p>
              ) : (
                ""
              )}

              {this.state.selected.type === "special" &&
              this.state.selected.message === "Daenerys" ? (
                <p style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
                  You sit before Web Dev Depot, cyber-born, first of it's name,
                  breaker of code and maker of web developers!
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {this.state.selected.type === "special" &&
        this.state.selected.message === "StarWars" ? (
          <StarWars setEffectSource={this.setEffectSource} />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default NotFound;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navbar extends Component {
  state = {
    menuActive: false
  };

  toggleMenu = (event, active) => {
    active
      ? this.setState({ menuActive: true })
      : this.setState({ menuActive: false });
  };

  handleAdminClick = event => {
    //If already on an admin page don't reload the blank admin menu.
    window.location.href.includes("/admin")
      ? event.preventDefault()
      : this.props.setTab("");
    this.setState({ menuActive: false });
  };

  handleBurgerClick = event => {
    event.preventDefault();
    this.state.menuActive
      ? this.setState({ menuActive: false })
      : this.setState({ menuActive: true });
  };

  handleContactClick = event => {
    event.preventDefault();
    this.setState({ menuActive: false });
    this.props.showContact();
  };

  handleLoginClick = event => {
    event.preventDefault();
    this.props.isAuth ? this.props.logout() : this.props.showLogin();
    this.setState({ menuActive: false });
  };

  render() {
    return (
      <nav
        className="navbar is-transparent is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src="/images/brand_logo.png" alt="logo" />
          </Link>
          <Link
            onClick={this.handleBurgerClick}
            className={
              "navbar-burger " + +(this.state.menuActive ? "is-active" : "")
            }
            to=""
            role="button"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </Link>
        </div>

        <div
          className={
            "navbar-menu " + (this.state.menuActive ? "is-active" : "")
          }
        >
          <div className="navbar-start">
            {this.props.isAdmin ? (
              <Link
                onClick={this.handleAdminClick}
                className="navbar-item"
                to="/admin"
              >
                Admin
              </Link>
            ) : (
              ""
            )}
          </div>

          <div className="navbar-end">
            {this.props.isAuth ? (
              <React.Fragment>
                <Link
                  onClick={this.handleContactClick}
                  className="navbar-item"
                  to=""
                >
                  <span className="icon">
                    <i className="fas fa-envelope" style={{ color: "white" }} />
                  </span>
                </Link>
                <Link
                  onClick={() => this.setState({ menuActive: false })}
                  className="navbar-item"
                  to="/favorites"
                >
                  <span className="icon">
                    <i className="fas fa-star" style={{ color: "yellow" }} />
                  </span>
                </Link>
              </React.Fragment>
            ) : (
              ""
            )}

            <div className="navbar-item">
              <div className="buttons">
                <Link
                  onClick={this.handleLoginClick}
                  className="button is-info"
                  to=""
                >
                  {this.props.isAuth
                    ? "Logout (" + this.props.username.toUpperCase() + ")"
                    : "Log in"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

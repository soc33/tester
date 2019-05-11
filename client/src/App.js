import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import Main from "./pages/Main";
import Favorites from "./pages/Favorites";
import Contact from "./components/Contact";
import AdminMenu from "./pages/AdminMenu";
import AdminResources from "./pages/AdminResources";
import AdminMessages from "./pages/AdminMessages";
import NotFound from "./pages/404";
import Registration from "./components/Registration";
import Login from "./components/Login";
import API from "./utils/API";

import "./App.css";

class App extends Component {
  state = {
    isAuth: false,
    isAdmin: false,
    activeTab: "",
    showReg: false,
    showLogin: false,
    showContact: false,
    username: "",
    likes: [],
    favorites: [],
    clicks: [],
    authSites: ["/admin", "/favorites", "/contact"],
    wait404: true
  };

  componentDidMount() {
    this.isAuthorized();
  }

  resetState = () => {
    this.setState({
      isAuth: false,
      isAdmin: false,
      username: "",
      likes: [],
      favorites: [],
      clicks: []
    });
  };

  isAuthorized = () => {
    API.isAuthorized()
      .then(res => {
        this.setState({ wait404: false });
        if (res.data.message) {
          this.resetState();
        } else {
          this.setState({
            isAuth: true,
            isAdmin: res.data.level === 2,
            username: res.data.username,
            likes: res.data.likes,
            favorites: res.data.favorites,
            clicks: res.data.clicks,
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ wait404: false });
        this.resetState();
      });
  };

  setTab = tab => {
    this.setState({ activeTab: tab });
  };

  showLogin = () => {
    this.setState({ showLogin: true });
  };

  showContact = () => {
    this.setState({ showContact: true });
  };

  logout = () => {
    API.logout()
      .then(res => {
        this.isAuthorized();
      })
      .catch(err => {
        this.isAuthorized();
      });
  };

  closeContact = () => {
    this.setState({
      showContact: false
    });
  };

  closeRegistration = form => {
    this.setState({
      showReg: false,
      showLogin: form ? true : false
    });
  };

  closeLogin = form => {
    this.setState({
      showReg: form ? true : false,
      showLogin: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar
            isAuth={this.state.isAuth}
            isAdmin={this.state.isAdmin}
            username={this.state.username}
            setTab={this.setTab}
            showLogin={this.showLogin}
            showContact={this.showContact}
            logout={this.logout}
          />
          {this.state.isAdmin ? (
            <Route
              path="/admin"
              render={props => <Tabs active={this.state.activeTab} />}
            />
          ) : (
            ""
          )}

          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Main
                  likes={this.state.likes}
                  favorites={this.state.favorites}
                  clicks={this.state.clicks}
                  username={this.state.username}
                  isAuthorized={this.isAuthorized}
                  showLogin={this.showLogin}
                />
              )}
            />

            <Route
              exact
              path="/favorites"
              render={props =>
                !this.state.isAuth ? (
                  <NotFound wait404={this.state.wait404} />
                ) : (
                  <Favorites
                    likes={this.state.likes}
                    favorites={this.state.favorites}
                    clicks={this.state.clicks}
                    isAuthorized={this.isAuthorized}
                  />
                )
              }
            />

            <Route
              exact
              path="/admin/menu"
              render={props =>
                !this.state.isAdmin ? (
                  <NotFound wait404={this.state.wait404} />
                ) : (
                  <AdminMenu setTab={this.setTab} />
                )
              }
            />
            <Route
              exact
              path="/admin/resources"
              render={props =>
                !this.state.isAdmin ? (
                  <NotFound wait404={this.state.wait404} />
                ) : (
                  <AdminResources setTab={this.setTab} />
                )
              }
            />

            <Route
              exact
              path="/admin/messages"
              render={props =>
                !this.state.isAdmin ? (
                  <NotFound wait404={this.state.wait404} />
                ) : (
                  <AdminMessages setTab={this.setTab} />
                )
              }
            />
            {window.location.pathname === "/admin" && this.state.isAdmin ? (
              ""
            ) : (
              <Route
                render={props => <NotFound wait404={this.state.wait404} />}
              />
            )}
          </Switch>
        </Router>

        {this.state.showContact && this.state.isAuth ? (
          <Contact closeContact={this.closeContact} />
        ) : (
          ""
        )}

        {this.state.showReg ? (
          <Registration
            isAuthorized={this.isAuthorized}
            closeRegistration={this.closeRegistration}
          />
        ) : (
          ""
        )}
        {this.state.showLogin ? (
          <Login
            isAuthorized={this.isAuthorized}
            closeLogin={this.closeLogin}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default App;

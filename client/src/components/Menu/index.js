import React, { Component } from "react";
import FocusInput from "../FocusInput";
import "./style.css";

export default class Menu extends Component {
  state = {
    selectedMenuItem: "",
    openSections: [],
    search: ""
  };

  toggleMenu(event, id, menuInfo) {
    event.preventDefault();
    const menuList = document.getElementById("menu-list-" + id);

    if (menuList) menuList.classList.toggle("is-hidden");

    this.clickMenu(event, id, menuInfo);
  }

  handleMenuClick = (event, section, id, menuInfo) => {
    event.preventDefault();
    if (section) {
      let openSections;
      if (this.state.openSections.indexOf(id) === -1) {
        openSections = this.state.openSections.map(el => el);
        openSections.push(id);
      } else {
        openSections = this.state.openSections.filter(el => el !== id);
      }
      this.setState({ openSections: openSections });
    }

    this.setState({ selectedMenuItem: id });
    this.props.getResources(id);
    this.props.populateHero(menuInfo);
  };

  handleKeyDown = event => {
    if (event.key === "Enter" && this.state.search.trim() !== "") {
      this.props.searchResources(this.state.search.toLowerCase());
      this.setState({ selectedMenuItem: "" });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    if (event.key === "Enter") this.searchResources();
  };

  render() {
    return (
      <div className="sidebar">
        <FocusInput
          name="search"
          value={this.state.search}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          fields="search-box"
          controls="has-icons-right"
          placeholder="Search Tags"
          righticon="fas fa-search"
        />

        <div className="menu-container">
          <aside className="menu">
            {this.props.menuItems.map(menuItem => (
              <div key={menuItem._id}>
                <p className="menu-label">
                  <a
                    className={
                      this.state.selectedMenuItem === menuItem._id
                        ? "is-active"
                        : ""
                    }
                    onClick={event =>
                      this.handleMenuClick(event, true, menuItem._id, {
                        title: menuItem.title,
                        description: menuItem.description,
                        source: menuItem.source
                      })
                    }
                    href="/"
                  >
                    {menuItem.title}
                  </a>
                </p>
                {menuItem.items ? (
                  <UL
                    level={1}
                    sectionId={menuItem._id}
                    openSections={this.state.openSections}
                    selectedMenuItem={this.state.selectedMenuItem}
                    handleMenuClick={this.handleMenuClick}
                    menuItems={menuItem.items}
                    path={menuItem.title}
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </aside>
        </div>
      </div>
    );
  }
}

function UL(props) {
  return (
    <ul
      className={
        "menu-list " +
        (props.level === 1 && props.openSections.indexOf(props.sectionId) === -1
          ? "is-hidden"
          : "")
      }
    >
      {props.menuItems.map(menuItem => (
        <LI
          key={menuItem._id}
          level={props.level}
          menuItem={menuItem}
          handleMenuClick={props.handleMenuClick}
          selectedMenuItem={props.selectedMenuItem}
          path={props.path}
        />
      ))}
    </ul>
  );
}

function LI(props) {
  return (
    <li
      className={
        props.level === 1 || (props.level === 2 && props.menuItem.items)
          ? "menu-parent"
          : "menu-child"
      }
    >
      <a
        className={
          props.selectedMenuItem === props.menuItem._id ? "is-active" : ""
        }
        onClick={event =>
          props.handleMenuClick(event, false, props.menuItem._id, {
            title: props.path + " > " + props.menuItem.title,
            description: props.menuItem.description,
            source: props.menuItem.source
          })
        }
        href="/"
      >
        {props.menuItem.title}
      </a>
      {props.menuItem.items ? (
        <UL
          level={2}
          handleMenuClick={props.handleMenuClick}
          selectedMenuItem={props.selectedMenuItem}
          menuItems={props.menuItem.items}
          path={props.path + " > " + props.menuItem.title}
        />
      ) : (
        ""
      )}
    </li>
  );
}

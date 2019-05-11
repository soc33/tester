import React, { Component } from "react";
import Container from "../components/Container";
import Wrapper from "../components/Wrapper";
import { Input, DropDown, TextArea, FormBtn } from "../components/Form";
import Confirm from "../components/Confirm";
import API from "../utils/API";

class AdminMenu extends Component {
  state = {
    level: 0,
    position: "",
    title: "",
    description: "",
    source: "",
    options: [
      { id: 0, title: 0 },
      { id: 1, title: 1 },
      { id: 2, title: 2 },
      { id: 3, title: 3 }
    ],
    buttonText: "Add",
    headers: ["Pos", "Level", "Title", "Description", "Source"],
    menuItems: [],
    updateId: "",
    updatePos: "",
    deleteId: "",
    deletePos: "",
    confirm: false,
    confirmHeaderColor: "",
    confirmTitle: "",
    confirmQuestion: "",
    confirmButtonClassColor: "",
    confirmButtonText: ""
  };

  componentDidMount() {
    //setting the tab here instead of the tab component allows the tab to stay active if screen is refreshed
    this.props.setTab("menu");
    this.getMenuItems();
    document.addEventListener("keydown", this.handleKeyDown);
  }

  resetForm = () => {
    this.setState({
      level: 0,
      position: "",
      title: "",
      description: "",
      source: "",
      buttonText: "Add"
    });
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === "Escape") this.handleCancelClick(event);
  };

  getMenuItems = () => {
    API.getMenuItems().then(res => {
      this.setState({ menuItems: res.data });
    });
  };

  addMenuItem = event => {
    event.preventDefault();
    API.addMenuItem({
      position:
        isNaN(this.state.position) || parseInt(this.state.position) === 0
          ? 1
          : this.state.position,
      level: this.state.level,
      title: this.state.title,
      description: this.state.description,
      source: this.state.source
    }).then(res => {
      this.getMenuItems();
    });
    this.resetForm();
  };

  updateMenuItem = event => {
    event.preventDefault();
    const menuItem = {
      id: this.state.updateId,
      oldPosition: this.state.updatePos,
      data: {
        position:
          isNaN(this.state.position) || parseInt(this.state.position) === 0
            ? 1
            : this.state.position,
        level: this.state.level,
        title: this.state.title,
        description: this.state.description,
        source: this.state.source
      }
    };

    API.updateMenuItem(menuItem).then(res => {
      this.getMenuItems();
    });
    this.resetForm();
  };

  deleteMenuItem = () => {
    API.deleteMenuItem({
      id: this.state.deleteId,
      position: this.state.deletePos
    }).then(res => {
      this.getMenuItems();
    });
  };

  confirmDelete = (id, position) => {
    //display confirm modal
    this.setState({
      deleteId: id,
      deletePos: position,
      confirm: true,
      confirmHeaderColor: "#ff3760",
      confirmTitle: "Delete?",
      confirmQuestion: "Are you certain you wish to delete this menu item?",
      confirmButtonClassColor: "is-danger",
      confirmButtonText: "Delete"
    });
  };

  handleConfirmClick = event => {
    event.preventDefault();
    this.setState({ confirm: false });
    this.deleteMenuItem();
  };

  handleCancelClick = event => {
    event.preventDefault();
    this.setState({ confirm: false });
  };

  handleDoubleClick = rowInfo => {
    this.setState(rowInfo);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Wrapper marginLeft="5px" marginTop="1px" padding="10px" heightOffset="89px">
        <Confirm
          isActive={this.state.confirm}
          headerColor={this.state.confirmHeaderColor}
          title={this.state.confirmTitle}
          question={this.state.confirmQuestion}
          buttonClassColor={this.state.confirmButtonClassColor}
          buttonText={this.state.confirmButtonText}
          handleConfirmClick={this.handleConfirmClick}
          handleCancelClick={this.handleCancelClick}
        />
        <Container className="container">
          <div className="columns">
            <div className="column is-3">
              <form
                className="menu-form"
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "6px"
                }}
              >
                <div className="columns">
                  <div className="column">
                    <Input
                      label="Position"
                      value={this.state.position}
                      onChange={this.handleInputChange}
                      name="position"
                      placeholder="Pos Num"
                    />
                  </div>

                  <div className="column">
                    <DropDown
                      label="Level"
                      value={this.state.level}
                      onChange={this.handleInputChange}
                      name="level"
                      options={this.state.options}
                    />
                  </div>
                </div>

                <Input
                  label="Title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Menu Title"
                />

                <TextArea
                  label="Description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  name="description"
                  placeholder="Menu Description"
                />

                <Input
                  label="Source"
                  value={this.state.source}
                  onChange={this.handleInputChange}
                  name="source"
                  placeholder="Description Source"
                />

                <div className="field">
                  <FormBtn
                    button="is-link"
                    buttontext={this.state.buttonText}
                    disabled={!(this.state.position && this.state.title)}
                    onClick={
                      this.state.buttonText === "Add"
                        ? this.addMenuItem
                        : this.updateMenuItem
                    }
                  />
                </div>
              </form>
            </div>
            <div className="column is-9">
              <table
                className="table is-hoverable is-striped"
                style={{ borderRadius: "6px", width: "100%" }}
              >
                <thead>
                  <tr>
                    {this.state.headers.map(header => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.menuItems.map(item => (
                    <tr
                      key={item._id}
                      style={{ cursor: "pointer" }}
                      className={
                        this.state.updateId === item._id ? "is-selected" : ""
                      }
                      onDoubleClick={() =>
                        this.handleDoubleClick({
                          updateId: item._id,
                          updatePos: item.position,
                          position: item.position,
                          level: item.level,
                          title: item.title,
                          description: item.description,
                          source: item.source,
                          buttonText: "Update"
                        })
                      }
                    >
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
                      <td>
                        <span
                          onClick={() =>
                            this.confirmDelete(item._id, item.position)
                          }
                        >
                          <i
                            className="fas fa-backspace"
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Wrapper>
    );
  }
}

export default AdminMenu;

import React, { Component } from "react";
import Container from "../components/Container";
import Wrapper from "../components/Wrapper";
import { Input, DropDown, FormBtn } from "../components/Form";
import Confirm from "../components/Confirm";
import API from "../utils/API";

class AdminResources extends Component {
  state = {
    menuItem: "",
    title: "",
    url: "",
    tags: "",
    buttonText: "Add",
    options: [],
    headers: ["Menu Item", "Title", "URL", "Tags", "Likes"],
    resources: [],
    updateId: "",
    deleteId: "",
    confirm: false,
    confirmHeaderColor: "",
    confirmTitle: "",
    confirmQuestion: "",
    confirmButtonClassColor: "",
    confirmButtonText: ""
  };

  componentDidMount() {
    //setting the tab here instead of the tab component allows the tab to stay active if screen is refreshed
    this.props.setTab("resources");
    this.getMenuItems();
    this.getResources();
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === "Escape") this.handleCancelClick(event);
  };

  resetForm = () => {
    this.setState({
      menuItem: "",
      title: "",
      url: "",
      tags: "",
      buttonText: "Add",
      updateId: ""
    });
  };

  getMenuItems = () => {
    API.getMenuItems().then(res => {
      const options = [];
      res.data.forEach(item => {
        options.push({ id: item._id, title: item.title });
      });
      options.unshift({ id: "", title: "Unassigned" });
      this.setState({ options: options });
    });
  };

  getResources = () => {
    API.getResources().then(res => {
      this.setState({ resources: res.data });
    });
  };

  addResource = event => {
    event.preventDefault();
    const resource = {
      title: this.state.title,
      url: this.state.url,
      tags: this.state.tags.toLowerCase().split(",").map(tag => tag.trim())
    };
    if (this.state.menuItem) resource.menu_item_id = this.state.menuItem;
    API.addResource(resource).then(res => {
      this.getResources();
    });
    this.resetForm();
  };

  updateResource = event => {
    event.preventDefault();
    const resource = {
      id: this.state.updateId,
      data: {
        title: this.state.title,
        url: this.state.url,
        tags: this.state.tags.toLowerCase().split(",").map(tag => tag.trim())
      }
    };
    this.state.menuItem
      ? (resource.data.menu_item_id = this.state.menuItem)
      : (resource.data.$unset = { menu_item_id: "" });

    API.updateResource(resource).then(res => {
      this.getResources();
    });
    this.resetForm();
  };

  deleteResource = id => {
    API.deleteResource({ id: this.state.deleteId }).then(res => {
      this.getResources();
    });
  };

  confirmDelete = (id) => {
    //display confirm modal
    this.setState({
      deleteId: id,
      confirm: true,
      confirmHeaderColor: "#ff3760",
      confirmTitle: "Delete?",
      confirmQuestion: "Are you certain you wish to delete this resource?",
      confirmButtonClassColor: "is-danger",
      confirmButtonText: "Delete"
    });
  };

  handleConfirmClick = event => {
    event.preventDefault();
    this.setState({ confirm: false });
    this.deleteResource();
  };

  handleCancelClick = event => {
    event.preventDefault();
    this.setState({ confirm: false });
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
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "6px"
                }}
              >
                <DropDown
                  label="Menu Item"
                  value={this.state.menuItem}
                  onChange={this.handleInputChange}
                  name="menuItem"
                  options={this.state.options}
                />

                <Input
                  label="Title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Resource Title"
                />

                <Input
                  label="URL"
                  value={this.state.url}
                  onChange={this.handleInputChange}
                  name="url"
                  placeholder="Website Address"
                />

                <Input
                  label="Tags (comma seperated)"
                  value={this.state.tags}
                  onChange={this.handleInputChange}
                  name="tags"
                  placeholder="Tags"
                />

                <div className="field">
                  <FormBtn
                    button="is-link"
                    buttontext={this.state.buttonText}
                    disabled={!(this.state.title && this.state.url)}
                    onClick={
                      this.state.buttonText === "Add"
                        ? this.addResource
                        : this.updateResource
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
                  {this.state.resources.map(resource => (
                    <tr
                      key={resource._id}
                      style={{cursor: "pointer"}}
                      className={this.state.updateId === resource._id ? "is-selected" : ""}
                      onDoubleClick={() =>
                        this.setState({
                          updateId: resource._id,
                          menuItem: resource.menu_item_id
                            ? resource.menu_item_id._id
                            : "",
                          title: resource.title,
                          url: resource.url,
                          tags: resource.tags.toString(),
                          buttonText: "Update"
                        })
                      }
                    >
                      <td>
                        {resource.menu_item_id
                          ? resource.menu_item_id.title
                          : "Unassigned"}
                      </td>
                      <td>{resource.title}</td>
                      <td>
                        <a
                          href={resource.url}
                          title={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Web Address
                        </a>
                      </td>
                      <td>{resource.tags.toString()}</td>
                      <td>{resource.likes}</td>
                      <td>
                        <span onClick={() => this.confirmDelete(resource._id)}>
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

export default AdminResources;

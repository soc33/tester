import React, { Component } from "react";
import Container from "../components/Container";
import Wrapper from "../components/Wrapper";
import Confirm from "../components/Confirm";
import dateFormat from "dateformat";
import API from "../utils/API";

class AdminMessages extends Component {
  state = {
    headers: ["User", "Date", "Subject", "Path/URL", "Message", "Contact" ],
    messages: [],
    selectedMessage: "",
    deleteId: "",
    archiveId: "",
    confirm: false,
    confirmHeaderColor: "",
    confirmTitle: "",
    confirmQuestion: "",
    confirmButtonClassColor: "",
    confirmButtonText: "",
    confirmDarkText: false
  };

  componentDidMount() {
    //setting the tab here instead of the tab component allows the tab to stay active if screen is refreshed
    this.props.setTab("messages");
    this.getMessages();
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === "Escape") this.handleCancelClick(event);
  };

  getMessages = () => {
    API.getMessages().then(res => {
      this.setState({ messages: res.data});
    }).catch(err => console.log(err));
  };

  archiveMessage = () => {
    API.archiveMessage(this.state.archiveId).then(res => {
      this.getMessages();
    }).catch(err => console.log(err));
  };

  deleteMessage = () => {
    API.deleteMessage(this.state.deleteId).then(res => {
      this.getMessages();
    }).catch(err => console.log(err));
  };

  confirmAction = (id, type) => {
    //display confirm modal
    this.setState({
      deleteId: type === "delete" ? id : "",
      archiveId: type === "archive" ? id : "",
      confirm: true,
      confirmHeaderColor: type === "delete" ? "#ff3760" : "#01d1b2",
      confirmTitle: type === "delete" ? "Delete?" : "Archive?",
      confirmQuestion: type === "delete" ? "Are you certain you wish to delete this message?" : "Are you certain you wish to archive this message?",
      confirmButtonClassColor: type === "delete" ? "is-danger" : "is-primary",
      confirmButtonText: type === "delete" ? "Delete" : "Archive",
      confirmDarkText: type === "delete" ? false : true
    });
  };

  handleConfirmClick = event => {
    event.preventDefault();
    this.setState({ confirm: false });
    this.state.deleteId ? this.deleteMessage() : this.archiveMessage();
  };

  handleCancelClick = event => {
    event.preventDefault();
    this.setState({ confirm: false });
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
          darkText={this.state.confirmDarkText}
          handleConfirmClick={this.handleConfirmClick}
          handleCancelClick={this.handleCancelClick}
        />
        <Container>
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
                  {this.state.messages.map(message => (
                    <tr
                      key={message._id}
                      style={{cursor: "pointer"}}
                      className={this.state.selectedMessage === message._id ? "is-selected" : ""}
                      onClick={() =>
                        this.setState({
                          selectedMessage: message._id
                        })
                      }
                    >
                      <td>
                        {message.user.username
                          ? message.user.username
                          : "Unknown"}
                      </td>
                      <td>{dateFormat(Date(message.created), "mmmm dS, yyyy")}</td>
                      <td>{message.subject}</td>
                      <td>
                        {message.subject === "Suggest Site" ? <a
                          href={message.path}
                          title={message.path}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Web Address
                        </a> : message.path}
                      </td>
                      <td>{message.content}</td>
                      <td style={{paddingLeft: "38px"}}>{message.contact ?
                        <a href={"mailto:" + message.user.email}>
                          <span>
                            <i
                              title="reply"
                            className="far fa-envelope"
                            style={{cursor: "pointer" }}
                          />
                          </span>
                        </a> : ""}
                      </td>
                      <td>
                        <span onClick={() => this.confirmAction(message._id, "archive")}>
                          <i
                            title="archive"
                            className="fas fa-archive"
                            style={{ color: "green", cursor: "pointer" }}
                          />
                        </span>
                      </td>
                      <td>
                        <span onClick={() => this.confirmAction(message._id, "delete")}>
                          <i
                            title={"delete"}
                            className="fas fa-backspace"
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </Container>
      </Wrapper>
    );
  }
}

export default AdminMessages;

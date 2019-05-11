import React, { Component } from "react";
import { Input, FormBtn, DropDown, TextArea, CheckBox } from "../Form";
import Modal from "../Modal";
import "./style.css";
import API from "../../utils/API";

class Contact extends Component {
  state = {
    options: [
      { id: "Message", title: "Message" },
      { id: "Report Bug", title: "Report Bug" },
      { id: "Suggest Site", title: "Suggest Site" }
    ],
    option: "Message",
    path: "",
    message: "",
    contact: true
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === "Escape") this.cancel(event);
  };

  sendMessage = event => {
    event.preventDefault();
    API.sendMessage({ subject: this.state.option, path: this.state.path, content: this.state.message, contact: this.state.contact })
      .then(res => {
        this.props.closeContact();
      }).catch(err => console.log(err));
  };

  cancel = (event, form) => {
    event.preventDefault();
    this.props.closeContact();
  };

  handleCheckBoxClick = () => {
    this.setState({ contact: !this.state.contact });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (name === "option" && value === "Message") this.setState({ path: "" });
  };

  render() {
    return (
      <Modal title="Contact" icon="fas fa-envelope" closeForm={this.cancel}>
        <DropDown
          label="Options"
          value={this.state.option}
          onChange={this.handleInputChange}
          name="option"
          options={this.state.options}
        />

        {this.state.option !== "Message" ? (
          <Input
            name="path"
            value={this.state.path}
            onChange={this.handleInputChange}
            label={
              this.state.option === "Report Bug"
                ? "Menu Path (if applicable)"
                : "URL"
            }
            placeholder={
              this.state.option === "Report Bug"
                ? "menu > menu > ..."
                : "https://someurl.com"
            }
          />
        ) : (
          ""
        )}

        <TextArea
          label="Message"
          value={this.state.message}
          onChange={this.handleInputChange}
          name="message"
          placeholder="Message"
        />

        <CheckBox
          checked={this.state.contact}
          label=" You have my permission to contact me at my registered email address."
          onChange={this.handleCheckBoxClick}
           />

        <form>
          <div className="field is-grouped">
            <FormBtn
              button="is-link"
              disabled={!((this.state.option === "Message" && this.state.message.trim() !== "") ||
                (this.state.option === "Report Bug" && (this.state.path.trim() !== "" || this.state.message.trim() !== "")) ||
              (this.state.option === "Suggest Site" && this.state.path.trim() !== ""))}
              buttontext="Send"
              onClick={this.sendMessage}
            />
            <FormBtn
              button="is-text"
              buttontext="Cancel"
              defaultChecked={this.cancel}
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export default Contact;

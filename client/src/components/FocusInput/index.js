import React, {Component} from "react";
import "./style.css";

class FocusInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  };

  componentDidMount() {
    this.textInput.current.focus();
  };

  render() {
    return (
      <div className={"field " + (this.props.fields ? this.props.fields : "")}>
        {this.props.label ? <label className="label">{this.props.label}</label> : ""}
      <div className={"control " + (this.props.controls ? this.props.controls : "")}>
          <input
            ref={this.textInput}
            className={"input " + (this.props.classes ? this.props.classes : "")}
            type={this.props.type ? this.props.type : "text"}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            onKeyDown={this.props.onKeyDown}
            placeholder={this.props.placeholder}
        />
        {this.props.lefticon ? (
          <span className="icon is-small is-left">
            <i className={this.props.lefticon} />
          </span>
        ) : (
          ""
        )}
        {this.props.righticon ? (
          <span className="icon is-small is-right">
            <i className={this.props.righticon} />
          </span>
        ) : (
          ""
        )}
      </div>
      {this.props.help ? <p className={"help " + this.props.help}>{this.props.helptext}</p> : ""}
    </div>

    );
  }
}

export default FocusInput

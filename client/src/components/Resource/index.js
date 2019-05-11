import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";

class Resource extends Component {

  clickedCheckIcon = event => {
    event.preventDefault();
  };

  clickedResource = event => {
    if (!this.props.clicked) {
      API.clickedResource({ id: this.props.id }).then(res => {
        this.props.update();
      }).catch(err => {
        console.log(err);
      })
    }
  };

  clickedFavorite = event => {
    event.preventDefault();
    API.clickedFavorite({ id: this.props.id, selected: this.props.favorited }).then(res => {
      res.data.message ? this.props.showLogin() : this.props.update();
    }).catch(err => {
      console.log(err);
    })
  }

  clickedLike = event => {
    event.preventDefault();
    API.clickedLike({ id: this.props.id, selected: this.props.liked }).then(res => {
      res.data.message ? this.props.showLogin() : this.props.update();
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="card resource-card">
        <div className="card-content">
          <p>
            <a className="resource-link" onClick={this.clickedResource} href={this.props.url} target="_blank" rel="noopener noreferrer">
              {this.props.title}
            </a>
          </p>
        </div>
        <footer className="card-footer">
          <a onClick={this.clickedCheckIcon} href="/" className="card-footer-item">
            <span className="icon">
              <i
                title="seen"
                className={
                  this.props.clicked ? "fas fa-check clicked" : "fas fa-check"
                }
              />
            </span>
          </a>
          <a onClick={this.clickedFavorite} href="/" className="card-footer-item">
            <span className="icon">
              <i
                title="favorite"
                className={
                  this.props.favorited ? "fas fa-star favorited" : "far fa-star"
                }
              />
            </span>
          </a>
          <a onClick={this.clickedLike} href="/" className="card-footer-item">
            <span className="icon">
              <i
                title={this.props.likes}
                className={
                  this.props.liked
                    ? "fas fa-thumbs-up liked"
                    : "far fa-thumbs-up"
                }
              />
            </span>
          </a>
        </footer>
        </div>
    );
  }
}

export default Resource;

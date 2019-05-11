import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import Resource from "../components/Resource";
import API from "../utils/API";

class Favorites extends Component {
  state = {
    title: "Favorites",
    resources:[]
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = id => {
    API.getFavorites().then(res => {
      this.setState({ resources: res.data[0].favorites });
      this.props.isAuthorized();
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
        <Wrapper marginLeft="5px" marginTop="55px" heightOffset="60px">
        <Hero
            align="center"
            theme="is-dark"
            title={this.state.title}
            titlesize="2rem"
          />
          {this.state.resources.map(resource => (
            <Resource
              key={resource._id}
              id={resource._id}
              title={resource.title}
              url={resource.url}
              likes={resource.likes}
              liked={this.props.likes.indexOf(resource._id) > -1}
              favorited={this.props.favorites.indexOf(resource._id) > -1}
              clicked={this.props.clicks.indexOf(resource._id) > -1}
              update={this.getFavorites}
              showLogin={this.props.showLogin}
            />
          ))}
        </Wrapper>
    );
  }
}

export default Favorites;

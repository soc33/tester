import React, { Component } from "react";
import Welcome from "../components/Welcome";
import Menu from "../components/Menu";
import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import Resource from "../components/Resource";
import API from "../utils/API";

class Main extends Component {
  state = {
    title: "Welcome",
    description: "",
    source: "",
    menuItems: [],
    resources: []
  };

  componentDidMount() {
    this.getMenuItems();
  }

  getMenuItems = () => {
    API.getMenuItems().then(res => {
      const menuItems = [];
      let ml;
      res.data.forEach(item => {
        ml = menuItems.length;
        if (ml === 0) {
          //no matter what the actual item level add the first menu item
          menuItems.push(item);
        } else if (item.level === 0) {
          //all level 0 items get pushed to menuItems base array
          menuItems.push(item);
        } else if (!menuItems[ml - 1].items) {
          //level is greater than 0 - if last item doesn't have items add first level 1 item
          menuItems[ml - 1].items = [item];
        } else {
          //level 0 has items
          let ll1 = menuItems[ml - 1].items.length; //get the length of level 1 items
          if (menuItems[ml - 1].items[ll1 - 1].level === item.level) {
            //level 1 item - add to level 1 array
            menuItems[ml - 1].items.push(item); //add item level 1 to level 0's items
          } else if (!menuItems[ml - 1].items[ll1 - 1].items) {
            //add first level 2 item to level 1's items
            menuItems[ml - 1].items[ll1 - 1].items = [item];
          } else {
            //level 2 items exist
            let ll2 = menuItems[ml - 1].items[ll1 - 1].items.length;
            if (
              menuItems[ml - 1].items[ll1 - 1].items[ll2 - 1].level ===
              item.level
            ) {
              //level 2 item - add to level 2 array
              menuItems[ml - 1].items[ll1 - 1].items.push(item);
            } else if (!menuItems[ml - 1].items[ll1 - 1].items[ll2 - 1].items) {
              //add first level 3 item to level 2's items
              menuItems[ml - 1].items[ll1 - 1].items[ll2 - 1].items = [item];
            } else {
              //level 2 has items so add this level 3 item to level 2's items
              menuItems[ml - 1].items[ll1 - 1].items[ll2 - 1].items.push(item);
            }
          }
        }
      });
      this.setState({ menuItems: menuItems });
    });
  };

  getResources = id => {
    API.getResources(id).then(res => {
      this.setState({ resources: res.data });
    }).catch(err => console.log(err));
  };

  searchResources = query => {
    API.searchResources(query).then(res => {
      let filteredString = query.replace(/\W/g, " ").split(" ").filter(el => el !== "")
      filteredString = filteredString.filter((el, index) => filteredString.indexOf(el) >= index).join(" ").toLowerCase();
      this.setState({ resources: res.data, title: "Search Results > " + filteredString, description: "resources found: " + res.data.length, source: "" });
    }).catch(err => console.log(err));
  }

  populateHero = menuInfo => {
    this.setState({
      title: menuInfo.title,
      description: menuInfo.description,
      source: menuInfo.source
    });
  };

  render() {
    return (
      <div>
        <Menu
          getResources={this.getResources}
          searchResources={this.searchResources}
          menuItems={this.state.menuItems}
          populateHero={this.populateHero}
        />
        <Wrapper marginTop="55px" marginLeft="216px" heightOffset="60px">
          
          {this.state.title === "Welcome" ? <Welcome /> :
            <Hero
              align="left"
              margin="0"
              theme="is-dark"
              title={this.state.title}
              titlesize="1.5rem"
              description={this.state.description}
              source={this.state.source}
            />}
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
              update={this.props.isAuthorized}
              showLogin={this.props.showLogin}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default Main;

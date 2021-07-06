import React, {Component} from "react";
import classes from './Layout.module.css';
import MenuToggler from "../../components/Navigation/MenuToggler/MenuToggler";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";

class Layout extends Component {

  state={
    isOpened: false
  }


  toggleMenu = () => {
    this.setState({isOpened: !this.state.isOpened})
  }

  menuCloseHandler = () => {
    this.setState({isOpened: false})
}

  render() {
    return (
      <div className={classes.Layout}>
        <main>
            <Drawer
              isOpened={this.state.isOpened}
              menuCloseHandler={this.menuCloseHandler}
              isAuthenticated={this.props.isAuthenticated}
            />
            <MenuToggler isOpened={this.state.isOpened} toggleMenu={this.toggleMenu}/>
          {this.props.children}
        </main>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)
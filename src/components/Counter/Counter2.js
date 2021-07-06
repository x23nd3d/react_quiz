import React, {Component} from "react";
import classes from "./Counter.module.css";
import {connect} from 'react-redux';
import {add2} from "./redux/actions/actions";

class Counter2 extends Component {

  render() {

    return (
      <div style={{marginTop:'30px'}} className={classes.Counter}>
        <h3>Counter {this.props.counter}</h3>
        <div>
          <button onClick={() => this.props.onAdd2(1)}>Add</button>
          <button onClick={() => this.props.onAdd2(-1)}>Sub</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter2.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd2: number => dispatch(add2(number)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter2);

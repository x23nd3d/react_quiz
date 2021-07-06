import React, {Component} from 'react';
import classes from './Counter.module.css';
import {connect} from 'react-redux';
import Counter2 from "./Counter2";
import {add, add_num, asyncAdd, sub} from "./redux/actions/actions";

class Counter extends Component {

  state = {
    counter: 0
  }

  render() {
    console.log('props', this.props)
    return (

      <div className={classes.Counter}>
        <h3>Counter {this.props.counter}</h3>
        <div>
          <button onClick={this.props.onAdd}>+</button>
          <button onClick={this.props.onSub}>-</button>
        </div>

        <div>
          <button onClick={() => this.props.onAddNumber(5)}>Add 5</button>
          <button onClick={() => this.props.onAddNumber(-17)}>Subtract 17</button>
        </div>

        <div>
          <button onClick={() => this.props.onAsyncAdd(100)}>Add 100</button>
        </div>

        <Counter2/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state, 'STATE')
  return {
    counter: state.counter1.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch(add()),
    onSub: () => dispatch(sub()),
    onAddNumber: number => dispatch(add_num(number)),
    onAsyncAdd: number => dispatch(asyncAdd(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

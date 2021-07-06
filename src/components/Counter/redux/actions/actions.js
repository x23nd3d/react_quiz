import {ADD, SUB, ADD_NUM, ADD2} from "./actionTypes";

function add() {
  return {
    type: ADD
  }
}

function sub() {
  return {
    type: SUB
  }
}

function add_num(number) {
  return {
    type: ADD_NUM,
    payload: number
  }
}

function add2(number) {
  return {
    type: ADD2,
    payload: number
  }
}

function asyncAdd(number) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add_num(number))
    }, 1000);
  }
}

export {
  add, sub, add_num, add2, asyncAdd
}
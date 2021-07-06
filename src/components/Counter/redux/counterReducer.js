import {combineReducers} from 'redux';
import counter1 from "./reducers/counter";
import counter2 from "./reducers/counter2";

export default combineReducers({
  counter1, counter2
})
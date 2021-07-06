import axios from "../../axios/axios-quiz";
import {CREATE_QUIZ_ERROR, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";

function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

function finishCreateQuiz() {
  return async (dispatch, getState) => {
    const state = getState().create.quiz;
    try {
      await axios.post('/quizes.json', state);
      dispatch(resetQuizCreation())
    } catch (e) {
      dispatch(createQuizError(e));
    }

  }
}

function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

function createQuizError(e) {
  return {
    type: CREATE_QUIZ_ERROR,
    e
  }
}

export {
  createQuizQuestion,
  finishCreateQuiz,
  resetQuizCreation
}
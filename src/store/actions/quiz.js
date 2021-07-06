import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZ_BY_ID_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, QUIZ_FINISH, QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE, RETRY_QUIZ
} from "./actionTypes";

function fetchQuizes() {
  return async dispatch => {
    try {
      dispatch(fetchQuizesStart())
      const response = await axios.get('/quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test #${index + 1}`
        });
      });
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;
      dispatch(fetchQuizByIdSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

function fetchQuizByIdSuccess(quiz) {
  return {
    type: FETCH_QUIZ_BY_ID_SUCCESS,
    quiz
  }
}

function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

function setQuizState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState, results
  }
}

function finishQuiz() {
  return {
    type: QUIZ_FINISH,
  }
}

function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {

      if (state.answerState) {
        const key = Object.keys(state.answerState)[0];
        if (state.answerState[key] === "success") {
          return;
        }
      }

      if (!results[question.id]) {
        results[question.id] = "success"
      }

      dispatch(setQuizState({[answerId]: "success"}, results));

      const timeout = window.setTimeout(() => {

        if (isQuizFinished(state)) {
          console.log('The quiz is finished.');
          dispatch(finishQuiz())
          return;
        }

        dispatch(quizNextQuestion(state.activeQuestion + 1))

        window.clearTimeout(timeout);
      },1000)


      console.log('The answer is correct, next question.')
    } else {

      if (state.answerState) {
        const key = Object.keys(state.answerState)[0];
        if (state.answerState[key] === "success") {
          return;
        }
      }

      results[question.id] = "error";

      dispatch(setQuizState({[answerId]: "error"}, results));
      console.log('The answer is incorrect. Please try again.')
    }

  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}

export {
  fetchQuizes,
  fetchQuizById,
  fetchQuizesStart,
  fetchQuizesSuccess,
  fetchQuizByIdSuccess,
  fetchQuizesError,
  quizAnswerClick,
  setQuizState,
  finishQuiz,
  quizNextQuestion,
  isQuizFinished,
  retryQuiz
}
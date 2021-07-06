import {
  FETCH_QUIZ_BY_ID_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, QUIZ_FINISH, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, RETRY_QUIZ
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: false,
  error: false,
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  results: {},
  quiz: null,
}

export default function quizReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, quizes: action.quizes, loading: false
      }
    case FETCH_QUIZ_BY_ID_SUCCESS:
      return {
        ...state, quiz: action.quiz, loading: false
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state, loading: false, error: action.error,
      }
    case QUIZ_SET_STATE:
      return {
        ...state, answerState: action.answerState, results: action.results,
      }
    case QUIZ_FINISH:
      return {
        ...state, isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state, activeQuestion: action.number, answerState: null
      }
    case RETRY_QUIZ:
      return {
        ...state, isFinished: false, answerState: null, results: {}, activeQuestion: 0
      }
    default:
      return state
  }
}
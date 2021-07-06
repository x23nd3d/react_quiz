import React, {Component} from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

export const RetryContext = React.createContext(false);

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>

          {
            this.props.loading || !this.props.quiz
            ? <Loader/>
            :
              !this.props.isFinished
                ?
                <>
                  <h1>Answer all questions</h1>
                  <ActiveQuiz
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    quiz={this.props.quiz[this.props.activeQuestion]}
                    state={this.props.answerState}
                    question={this.props.quiz[this.props.activeQuestion].question}
                    quizLength={this.props.quiz.length}
                    toggleAnswer={this.props.quizAnswerClick}
                  />
                </>
                :
                <>
                  <h1>Result</h1>
                  <RetryContext.Provider value={this.props.retryQuiz}>
                    <FinishedQuiz
                      quiz={this.props.quiz}
                      results={this.props.results}
                    />
                  </RetryContext.Provider>
                </>
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    results: state.quiz.results,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
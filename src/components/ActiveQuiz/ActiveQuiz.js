import React from 'react';
import classes from './ActiveQuiz.module.css'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => {
return (

    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>{props.quiz.id}.&nbsp;{props.question}</span>
        <small>
          {props.quiz.id} of {props.quizLength}
        </small>

      </p>
        <AnswersList
          answers={props.answers}
          toggleAnswer={props.toggleAnswer}
          state={props.state}
        />
    </div>
    )
}

export default ActiveQuiz
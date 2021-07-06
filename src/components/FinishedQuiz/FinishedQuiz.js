import React from 'react';
import classes from './FinishedQuiz.module.css';
import {RetryContext} from "../../containers/Quiz/Quiz";
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom';



const FinishedQuiz = props => {
  console.log(RetryContext)
  const successTotal = Object.keys(props.results).reduce((total, key) => {
      if (props.results[key] === "success") {
        total += 1;
      }
      return total;
  }, 0);

  console.log('props results', props.results)

return (

  <div className={classes.FinishedQuiz}>
      <ul>
          {
              props.quiz.map((quizItem, index) => {

                const cls = [
                  'fa',
                  props.results[quizItem.id] === "success" ? "fa-check" : "fa-times",
                  classes[props.results[quizItem.id]]
                ]

                  return (
                    <li key={index}>
                      <strong>{quizItem.id}. </strong>
                      {quizItem.question}
                      <i className={cls.join(' ')} />
                    </li>
                  )
              })
          }
      </ul>

      <p>Successfully answered {successTotal} of {props.quiz.length}</p>

      <div>
        <RetryContext.Consumer>
          {
            retryHandler => retryHandler ?  <Button
              onClick={retryHandler}
              type="primary">Try again</Button> : null
          }
        </RetryContext.Consumer>
        <Link to={'/'}><Button
          type="success">Go to the next quiz</Button></Link>
      </div>
  </div>
    )
}

export default FinishedQuiz
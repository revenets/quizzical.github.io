import React from "react";
import Answer from "./Answer";

const Question = (props) => {
    const { title, answers, holdAnswer, isChecked, isActive, id } = props;

    const shuffledAnswers = answers.map((answer) => (
        <Answer
            key={answer.id}
            text={answer.text
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, "&")}
            onClick={() => holdAnswer(id, answer.id)}
            isActive={isActive}
            isHeld={answer.isHeld}
            isChecked={isChecked}
            isCorrect={answer.isCorrect}
            correct={answer.correct}
        />
    ));

    return (
        <div className="question">
            <div className="question__body">
                <h2 className="question__title">
                    {title
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, "'")
                        .replace(/&amp;/g, "&")}
                </h2>
                <div className="question__answers answers">
                    {shuffledAnswers}
                </div>
            </div>
        </div>
    );
};

export default Question;

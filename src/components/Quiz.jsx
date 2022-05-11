import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

const Quiz = (props) => {
    const [questions, setQuestions] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    useEffect(() => {
        if (questions.length === 0) {
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                .then((response) => response.json())
                .then((result) => {
                    const allQuestions = result.results.map((item) => {
                        const {
                            question,
                            correct_answer: correct,
                            incorrect_answers: incorrectArray,
                        } = item;

                        const answers = [];
                        answers.push({
                            id: nanoid(),
                            text: correct,
                            correct: true,
                            isHeld: false,
                            isCorrect: "",

                        });

                        incorrectArray.map((answer) =>
                            answers.push({
                                id: nanoid(),
                                text: answer,
                                isHeld: false,
                                isCorrect: "",

                            })
                        );

                        shuffleArray(answers);

                        return { id: nanoid(), question, answers, isActive: true };
                    });

                    setQuestions(allQuestions);
                });
        }
    }, [questions]);

    const holdAnswer = (questionId, variantId) => {
        setQuestions((prevState) => {
            const newState = prevState.map((item) => {
                const answers = item.answers;
                const newAnswers = answers.map((answ) => {
                    return answ.id === variantId
                        ? { ...answ, isHeld: !answ.isHeld }
                        : answ;
                });
                return item.id === questionId 
                    ?{ ...item, answers: newAnswers, isActive: !item.isActive }
                    : item;
            });
            return newState;
        });
    };

    const quizQuestions = questions.map((element) => {
        return (
            <Question
                key={element.id}
                id={element.id}
                isChecked={isChecked}
                title={element.question}
                answers={element.answers}
                holdAnswer={holdAnswer}
                isActive={element.isActive}
            />
        );
    });

    const checkAnswers = () => {
        setIsChecked(!isChecked);
    };

    const getResults = () => {
        let counter = 0;
        for (let item of questions) {
            const itemAnswers = item.answers;
            const correctAnswer = itemAnswers.find(
                (element) => element.correct
            );
            if (correctAnswer.isHeld) {
                counter++;
            }
        }
        return counter;
    };

    const getNewQuiz = () => {
        setIsChecked(false);
        setQuestions([]);
    };

    return (
        <div className="quiz">
            <div className="quiz__container">
                <div className="quiz__body">
                    <div className="quiz__questions">{quizQuestions}</div>
                    <div className="quiz__check">
                        {isChecked && (
                            <p className="quiz__result">
                                You scored {getResults()}/{questions.length} correct answers
                            </p>
                        )}
                        {isChecked ? (
                            <button className="button" onClick={getNewQuiz}>
                                Play again
                            </button>
                        ) : (
                            <button className="button" onClick={checkAnswers}>
                                Check answers
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;

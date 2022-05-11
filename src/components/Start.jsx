import React from "react";

function Start(props) {
    return (
        <div className="start-page">
            <div className="start-page__container">
                <div className="start-page__body">
                    <h1 className="start-page__title">Quizzical</h1>
                    <p className="start-page__text">
                        Challenge your brain with 5 questions
                    </p>
                    <button className="start-page__button button" onClick={props.start}>Start quiz</button>
                </div>
            </div>
        </div>
    );
}

export default Start;

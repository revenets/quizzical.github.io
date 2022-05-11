import React, {useState} from 'react';
import Quiz from './components/Quiz';
import Start from './components/Start';


function App() {
  const [isStarted, setIsStarted] = useState(false)

  const startQuiz = () => {
    setIsStarted(!isStarted)
  }

  return (
    <div className="wrapper">
        {!isStarted && <Start start={startQuiz}/>}
        {isStarted && <Quiz />}
    </div>
  );
}

export default App;

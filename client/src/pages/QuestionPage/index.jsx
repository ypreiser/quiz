import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore, useGameStore } from '../../store';
import style from './style.module.css';
import Story from '../../components/Story';
import Answer from '../../components/Answer';

export default function QuestionPage() {
  const handleGameUpdate = useGameStore(state => state.handleGameUpdate);
  const { userQuestions, setUserQuestions } = useUserStore((state) => ({
    userQuestions: state.user.userQuestions,
    setUserQuestions: state.user.setUserQuestions,
  }));

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerPositions, setAnswerPositions] = useState([]);
  const user = useUserStore(state => state.user);
  const players = useGameStore(state => state.game.players);
  const setGame = useGameStore(state => state.setGame);
  const game = useGameStore(state => state.game);
  const setWin = useGameStore(state => state.setWin);
  const questions = useUserStore(state => state.questions)
  const nav = useNavigate();
  const addWinner = useGameStore(state => state.game.addWinner)
  const winners = useGameStore(state => state.game.winners || []);

  // console.log({ winners })

  useEffect(() => {
    if (userQuestions.length > 0) {
      const currentQuestion = userQuestions[randomIndex(userQuestions)];
      setQuestion(currentQuestion);
      const shuffledAnswers = shuffleArray(userQuestions.map(q => q.answer));
      setAnswers(shuffledAnswers);
      setAnswerPositions(generateRandomPositions(shuffledAnswers.length));
    }
    if (userQuestions.length == 0) {
      setWin(true)
      const newWinners = [...winners, user]
      addWinner(newWinners)
    }
  }, [userQuestions]);

  function randomIndex(questions) {
    return Math.floor(Math.random() * questions.length);
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function generateRandomPositions(count) {
    const positions = [];
    const containerWidth = window.innerWidth - 40; // Subtract some padding
    const containerHeight = window.innerHeight - 40; // Subtract some padding
    const answerSize = Math.min(containerWidth, containerHeight) / (count + 1); // Dynamically size answers based on count and viewport

    for (let i = 0; i < count; i++) {
      const top = Math.random() * (containerHeight - answerSize);
      const left = Math.random() * (containerWidth - answerSize);
      positions.push({ top, left, size: answerSize });
    }

    return positions;
  }

  function checkAnswer(e) {

    if (question && question.answer && e.target.innerText === question.answer) {
      const newUserQuestions = userQuestions.filter(q => q.id !== question.id);
      setUserQuestions(newUserQuestions);
      // nav('/game')






      const updatedPlayers = (players || []).map(p => {
        if (user && (p.socketId === user.socketId || p.id === user.socketId)) {
          return { ...p, userQuestions: newUserQuestions };
        }
        return p;
      });
      if (game) {
        setGame({ game: { ...game, players: updatedPlayers } });
      }
      handleGameUpdate(updatedPlayers);
    } else if (userQuestions.length > 0) {
      setQuestion(userQuestions[randomIndex(userQuestions)]);
    }
  };


  function handleStartAgain() {
    setUserQuestions(questions)
    setWin(false)

  }

  return (
    <div className={style.container}>
      <div className="b"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <button onClick={() => nav('/game')}>go see everybody</button>
      {userQuestions.length > 0 ? (
        <div className={style.questionContainer}>
          <div className={style.storyContainer}>
            {question && <Story story={question.story} />}
          </div>
          <p dir='auto' className={style.who}>למי מבין השמות הבאים זה קרה?</p>

          <div className={style.answersContainer}>
            {answers.map((answer, index) => (
              <div
                key={index}
                className={style.answer}
                // style={{
                //   top: `${answerPositions[index].top}px`,
                //   left: `${answerPositions[index].left}px`,
                //   width: `${answerPositions[index].size}px`,
                //   height: `${answerPositions[index].size}px`,
                // }}
                onClick={checkAnswer}
              >
                <Answer answer={answer} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={handleStartAgain}>לענות כל הכל מחדש?</button >
      )}
    </div>
  );
}
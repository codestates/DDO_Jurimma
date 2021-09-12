// 오늘의 퀴즈 부분
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setQuizModal, setQuizState } from '../actions/index';
import { useState } from 'react';
import you_quiz from '../images/you_quiz.svg';

const QuizBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  z-index: 10;
`;

const QuizModal = styled.div`
  width: max(340px, 50vw);
  max-width: 500px;
  height: max(420px, 50vh);
  margin: auto;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b4aee8;
  position: relative;
  > .closeBtn {
    font-size: 3rem;
    color: #fff;
    position: absolute;
    right: -25px;
    top: -50px;
    cursor: pointer;
  }
`;

const QuizScore = styled.div`
  align-items: center;
  text-align: center;
  word-break: break-all;
  width: 100%;
  > img {
    display: block;
    width: 150px;
    height: 150px;
    margin: 0 auto 20px;
  }
  > div {
    height: 200px;
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p:nth-child(1) {
      font-size: 1.6rem;
      margin-bottom: 30px;
    }
    > p:nth-child(2) {
      font-size: 1rem;
    }
  }
`;

const QuizQuestion = styled.div`
  margin-bottom: 20px;
  width: 100%;
  color: #fff;
  > img {
    display: block;
    width: 300px;
    height: 300px;
    margin: auto;
  }
`;

const QuizChoices = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const QuizCount = styled.div`
  margin-bottom: 20px;
  > span {
    font-size: 28px;
  }
`;

const QuizText = styled.div`
  width: 100%;
  font-size: 2rem;
`;

const QuizChoiceButton = styled.button`
  width: 100%;
  height: 70px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 80px;
  display: flex;
  padding: 5px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }
`;

function Quiz() {
  const nowDate = new Date().toLocaleDateString(); // 접속한 날짜를 "2021. 9. 12."와 같은 형식으로 저장

  const questions = [
    {
      questionText: '',
      answerOptions: [{ answerText: '시작하기', isCorrect: true }],
    },
    {
      questionText: '"ㄱㅇㅇ"의 뜻으로 올바른 것은?',
      answerOptions: [
        { answerText: '귀없어?', isCorrect: false },
        { answerText: '귀여워', isCorrect: true },
        { answerText: '거울은?', isCorrect: false },
      ],
    },
    {
      questionText:
        '"군싹"의 뜻과 유행한 캐릭터 이미지가 올바르게 짝지어진 것은?',
      answerOptions: [
        { answerText: '군침이 싹 도네 - 루피', isCorrect: true },
        {
          answerText: '군고구마 해먹을 고구마에 싹이 돋아나네 - 춘식이',
          isCorrect: false,
        },
        { answerText: '군침이 싹 도네 - 바보새', isCorrect: false },
      ],
    },
    {
      questionText: '"당모치"의 뜻으로 올바른 것은?',
      answerOptions: [
        { answerText: '당신은 모찌 치즈볼이 먹고싶다', isCorrect: false },
        { answerText: '당연히 모든 치킨은 옳다', isCorrect: true },
        {
          answerText: '당근을 모르는데 치킨은 안다고?',
          isCorrect: false,
        },
      ],
    },
  ]; // 문제
  const dispatch = useDispatch();
  const [quizCurrentQuestion, setQuizCurrentQuestion] = useState(0); // 현재 문제 index
  const [showQuizScore, setShowQuizScore] = useState(false); // 점수 화면 보임 여부
  const [quizScore, setQuizScore] = useState(-1); // 점수 카운트
  const [quizScoreComment, setQuizScoreComment] = useState(''); // 점수에 따라 다르게 나타날 문구

  const updateLastQuiz = () => {
    dispatch(setQuizState(nowDate));
  }; // 접속한 날짜 업데이트하는 함수
  const closeQuizModal = (isOpen) => {
    dispatch(setQuizModal(isOpen));
    // if (!showQuizScore) {
    //   dispatch(setQuizModal(isOpen));
    // }
  }; // 퀴즈 모달 닫는 함수
  const quizCommentChange = () => {
    if (quizScore === 0) {
      setQuizScoreComment('5포인트가 적립되었습니다!');
    } else if (quizScore === 1) {
      setQuizScoreComment('10포인트가 적립되었습니다!');
    } else if (quizScore === 2) {
      setQuizScoreComment('15포인트가 적립되었습니다!');
    }
  }; // 문구 업데이트 해줄 함수
  const expGenerate = () => {}; // 점수에 따른 경험치 계산하고 서버에 전송하는 함수. server/controllers/user/quizExp.js 참고해서 작성할것

  const handleQuizAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setQuizScore(quizScore + 1); // 맞다면 점수에 ++1
    }

    const nextQuizQuestion = quizCurrentQuestion + 1; // currentQuestion에 다음문제가 있나?
    if (nextQuizQuestion < questions.length) {
      // 다음문제가 있다면
      setQuizCurrentQuestion(nextQuizQuestion); // currentQuestion 정식으로 업데이트
    } else {
      // 다음문제가 없다면
      quizCommentChange(); // 점수에 따라 나타날 문구 설정하기
      updateLastQuiz(nowDate); // 최근에 퀴즈 푼 날짜로 상태 업데이트
      // 서버에 점수 전달하고 경험치 업데이트(expGenerate)
      setShowQuizScore(true); // 점수 보여주기
    }
  }; // 점수 계산, 점수 통보 및 점수창 보여주기 함수

  return (
    <QuizBackdrop>
      <QuizModal>
        <div className='closeBtn' onClick={() => closeQuizModal(false)}>
          &times;
        </div>

        {showQuizScore ? (
          <QuizScore>
            <img src={you_quiz} alt='You Quiz?' />
            <div>
              <p>총 {quizScore}개를 맞추셨습니다!</p>
              <p>{quizScoreComment}</p>
            </div>
            {/*점수 보여줌 */}
          </QuizScore>
        ) : (
          <>
            <QuizQuestion>
              {quizScore === -1 ? (
                <img src={you_quiz} alt='You Quiz?' />
              ) : (
                <QuizCount>
                  <span>Question {quizCurrentQuestion}</span>/
                  {questions.length - 1}
                </QuizCount>
              )}
              <QuizText>{questions[quizCurrentQuestion].questionText}</QuizText>
            </QuizQuestion>

            {/* 선택지 */}
            <QuizChoices>
              {questions[quizCurrentQuestion].answerOptions.map(
                (answerOption, idx) => (
                  <QuizChoiceButton
                    key={idx}
                    onClick={() =>
                      handleQuizAnswerClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </QuizChoiceButton>
                )
              )}
            </QuizChoices>
          </>
        )}
      </QuizModal>
    </QuizBackdrop>
  );
}

export default Quiz;

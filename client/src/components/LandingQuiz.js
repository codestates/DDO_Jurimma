// 랜딩페이지에서 맛보기로 제공될 퀴즈
import styled from 'styled-components';
import { useState } from 'react';
import you_quiz from '../images/you_quiz.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch } from 'react-redux';
import { setLoginOrSignupModal } from '../actions/index';
AOS.init();

const SectionWrap = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    height: 500px;
  }
`;

const LandingQuizBox = styled.article`
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
`;

const LandingQuizScore = styled.div`
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
      line-height: 1.6rem;
      padding: 15px 0px;
    }
    > p:nth-child(2) {
      font-size: 1rem;
      line-height: 1rem;
      padding: 10px 0px;
    }
    > button {
      cursor: pointer;
      margin-top: 10px;
      background-color: #440a67;
      color: #fff;
      border-radius: 50px;
      width: 40%;
      height: 50px;
    }
  }
`;

const LandingQuizQuestion = styled.div`
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

const LandingQuizChoices = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LandingQuizCount = styled.div`
  margin-bottom: 20px;
  > span {
    font-size: 28px;
  }
`;

const LandingQuizText = styled.div`
  width: 100%;
  font-size: 2rem;
`;

const LandingQuizChoiceButton = styled.button`
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
  transition: all 0.5s;
  :hover {
    background-color: #440a67;
    color: #fff;
  }
`;

function LandingQuiz() {
  const questions = [
    {
      questionText: '',
      answerOptions: [{ answerText: '시작하기', isCorrect: true }],
    },
    {
      questionText: '자만추의 뜻으로 올바른 것은?',
      answerOptions: [
        { answerText: '자신만만 추성훈', isCorrect: false },
        { answerText: '자연스럽게 만두 추가하고 포장', isCorrect: false },
        { answerText: '자연스러운 만남 추구', isCorrect: true },
      ],
    },
    {
      questionText: '오저치고의 뜻으로 올바른 것은?',
      answerOptions: [
        { answerText: '오 저녀석 치고는 많이 고쳐서 냈다', isCorrect: false },
        { answerText: '오늘 저녁 치킨 고?', isCorrect: true },
        { answerText: '오금이 저리고 치통으로 고통받는다', isCorrect: false },
      ],
    },
    {
      questionText: '갑통알의 뜻으로 올바른 것은?',
      answerOptions: [
        { answerText: '갑자기 통장을 보니 알바를 해야겠다', isCorrect: true },
        { answerText: '갑자기 통증을 알아버렸다', isCorrect: false },
        {
          answerText: '갑자기 통통튀는 알림 소리가 울렸다',
          isCorrect: false,
        },
      ],
    },
  ]; // 문제
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0); // 현재 문제 index
  const [showScore, setShowScore] = useState(false); // 점수 화면 보임 여부
  const [score, setScore] = useState(-1); // 점수 카운트
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1); // 맞다면 점수에 ++1
    }

    const nextQuestion = currentQuestion + 1; // currentQuestion에 다음문제가 있나?
    if (nextQuestion < questions.length) {
      // 다음문제가 있다면
      setCurrentQuestion(nextQuestion); // currentQuestion 정식으로 업데이트
    } else {
      // 다음문제가 없다면
      setShowScore(true); // 점수 보여주기
    }
  };

  const openLoginOrSignupModal = (isOpen) => {
    dispatch(setLoginOrSignupModal(isOpen));
  };

  return (
    <SectionWrap>
      <LandingQuizBox
        data-aos='zoom-in'
        data-aos-duration='2000'
        data-aos-offset='300'
      >
        {showScore ? ( // 점수 화면 보임 여부가 true라면
          <LandingQuizScore>
            <img src={you_quiz} alt='You Quiz?' />
            <div>
              <p>총 {score}개를 맞추셨습니다!</p>
              <p>오늘의 퀴즈는 로그인 후 이용 가능합니다.</p>
              <button onClick={() => openLoginOrSignupModal(true)}>
                로그인 하러가기
              </button>
            </div>
            {/*점수 보여줌 */}
          </LandingQuizScore>
        ) : (
          // 점수 화면 보임 여부가 false 라면(=아직 풀 문제가 남음)
          <>
            <LandingQuizQuestion>
              {score === -1 ? (
                <img src={you_quiz} alt='You Quiz?' />
              ) : (
                <LandingQuizCount>
                  <span>Question {currentQuestion}</span>/{questions.length - 1}
                </LandingQuizCount>
              )}
              <LandingQuizText>
                {questions[currentQuestion].questionText}
              </LandingQuizText>
            </LandingQuizQuestion>

            {/* 선택지 */}
            <LandingQuizChoices>
              {questions[currentQuestion].answerOptions.map(
                (answerOption, idx) => (
                  <LandingQuizChoiceButton
                    key={idx}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </LandingQuizChoiceButton>
                )
              )}
            </LandingQuizChoices>
          </>
        )}
      </LandingQuizBox>
    </SectionWrap>
  );
}

export default LandingQuiz;

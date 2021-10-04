// 오늘의 퀴즈 부분
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuizModal,
  setAccessToken,
  setLogout,
  setUserInfo,
} from '../actions/index';
import { useState } from 'react';
import axios from 'axios';
import you_quiz from '../images/you_quiz.svg';
import swal from 'sweetalert';
axios.defaults.withCredentials = true;

const QuizBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;
  z-index: 40;
`;

const QuizModal = styled.div`
  width: 500px;
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
  @media screen and (max-width: 600px) {
    width: 94%;
  }
  > .closeBtn {
    font-size: 3rem;
    color: #fff;
    position: absolute;
    right: -25px;
    top: -50px;
    cursor: pointer;
    transition: 0.5s;
    @media screen and (max-width: 700px) {
      right: 10px;
      top: 5px;
      color: #000;
      font-size: 30px;
    }
  }
  > .closeBtn:hover {
    transform: rotate(-90deg);
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
    @media screen and (max-width: 375px) {
      width: 200px;
      height: 200px;
    }
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
    font-size: 1.6rem;
  }
`;

const QuizText = styled.div`
  width: 100%;
  font-size: 1.4rem;
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
    background-color: #440a67;
    color: #fff;
  }
`;

function Quiz() {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const nowDate = new Date().toLocaleDateString(); // 접속한 날짜를 "2021. 9. 12."와 같은 형식으로 저장
  const questionNum = new Date().getDay(); // 요일 정보를 0(일요일)~6(토요일)으로 나타냄
  const questions = [
    [
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
    ], // 0번째

    [
      {
        questionText: '',
        answerOptions: [{ answerText: '시작하기', isCorrect: true }],
      },
      {
        questionText: '"연서복"의 뜻으로 올바른 것은?',
        answerOptions: [
          {
            answerText: '연하때문에 서러워서 늦게 복학한 10학번',
            isCorrect: false,
          },
          { answerText: '연장에 서툰 복집 주방장', isCorrect: false },
          { answerText: '연애에 서툰 복학생', isCorrect: true },
        ],
      },
      {
        questionText: '"신토불이"의 뜻으로 올바른 것은?',
        answerOptions: [
          { answerText: '신나는 토요일 불타는 이밤', isCorrect: true },
          {
            answerText: '신나게 토요일에 술먹고 속이 불타는 일요일 이밤',
            isCorrect: false,
          },
          {
            answerText:
              '신났던 토요일, 일요일되니 속이 불타 이세상 사람이 아니게 됨',
            isCorrect: false,
          },
        ],
      },
    ], // 1번째

    [
      {
        questionText: '',
        answerOptions: [{ answerText: '시작하기', isCorrect: true }],
      },
      {
        questionText: '"갑분싸"의 뜻으로 올바른 것은?',
        answerOptions: [
          { answerText: '갑자기 분뇨를 싸지른다', isCorrect: false },
          { answerText: '갑자기 분위기 싸해진다', isCorrect: true },
          { answerText: '갑자기 분노를 싸그리 토해낸다', isCorrect: false },
        ],
      },
      {
        questionText: '"욕세권"의 뜻으로 올바른 것은?',
        answerOptions: [
          {
            answerText: '욕을 먹을수록 값이 오르는 아파트 단지',
            isCorrect: true,
          },
          {
            answerText: '욕을 먹을정도로 상태가 안좋은 아파트 단지',
            isCorrect: false,
          },
          { answerText: '욕을 먹어서 재건축한 아파트 단지', isCorrect: false },
        ],
      },
    ], //2번째

    [
      {
        questionText: '',
        answerOptions: [{ answerText: '시작하기', isCorrect: true }],
      },
      {
        questionText: '"일취월장"의 뜻으로 올바른 것은?',
        answerOptions: [
          { answerText: '일요일에 취하면 월요일에 장난아냐', isCorrect: true },
          {
            answerText: '일요일 아침에 만든걸 월요일에 먹으라니 장난하냐',
            isCorrect: false,
          },
          {
            answerText:
              '일요일에 취해서 라면을 다먹어서 월요일엔 장보러 가야함',
            isCorrect: false,
          },
        ],
      },
      {
        questionText: '"방방봐"의 뜻으로 올바른 것은?',
        answerOptions: [
          {
            answerText: '방송국에서 하는 방송보다 유튜브를 더 많이 봐',
            isCorrect: false,
          },
          { answerText: '방송은 방송으로만 봐', isCorrect: true },
          {
            answerText: '방방 뛰다가 넘어진것좀 봐',
            isCorrect: false,
          },
        ],
      },
    ], //3번째

    [
      {
        questionText: '',
        answerOptions: [{ answerText: '시작하기', isCorrect: true }],
      },
      {
        questionText: '"쫌쫌따리"의 뜻으로 올바른 것은?',
        answerOptions: [
          { answerText: '쫑쫑 따라가는 모양', isCorrect: false },
          { answerText: '아주 조금씩 틈틈히', isCorrect: true },
          { answerText: '"좀 있다가"를 빠르게 발음한 모양', isCorrect: false },
        ],
      },
      {
        questionText: '"남아공"의 뜻으로 올바른 것은?',
        answerOptions: [
          { answerText: '남아서 공부나 해', isCorrect: true },
          {
            answerText: '남아서 공부할바엔 알바하지',
            isCorrect: false,
          },
          { answerText: '남아서 공부하다가 짝이랑 눈맞을듯', isCorrect: false },
        ],
      },
    ], //4번째

    [
      {
        questionText: '',
        answerOptions: [{ answerText: '시작하기', isCorrect: true }],
      },
      {
        questionText: '"최최차차"의 뜻으로 올바른 것은?',
        answerOptions: [
          { answerText: '최애는 최애고, 차두리는 차두리다.', isCorrect: false },
          { answerText: '최애는 최애고, 차은우는 차은우다.', isCorrect: true },
          { answerText: '최애는 최씨고, 차애는 차타현이다.', isCorrect: false },
        ],
      },
      {
        questionText: '"무야호"를 사용할때 뒤에 붙는 말로 적절한 것은?',
        answerOptions: [
          { answerText: '그만큼 신나시다는 거지', isCorrect: true },
          {
            answerText: '그만큼 놀라셨다는 거지',
            isCorrect: false,
          },
          { answerText: '그만큼 빨리 집에 가고싶다는 거지', isCorrect: false },
        ],
      },
    ], // 5번째

    [
      {
        questionText: '',
        answerOptions: [{ answerText: '시작하기', isCorrect: true }],
      },
      {
        questionText: '"퇴튜던트"의 뜻으로 올바른 것은?',
        answerOptions: [
          { answerText: '퇴직하고 선생님이 되려는 사람', isCorrect: false },
          { answerText: '퇴근 후 공부하는 직장인', isCorrect: true },
          {
            answerText: '퇴근 후 공부하려다가 잠드는 직장인',
            isCorrect: false,
          },
        ],
      },
      {
        questionText: '"자강두천"의 뜻으로 올바른 것은?',
        answerOptions: [
          { answerText: '자리 두고 강하게 싸우는 두 천재', isCorrect: false },
          { answerText: '자존심 강한 두 천재', isCorrect: true },
          {
            answerText: '자존심 강하다고 떠드는 두 천재',
            isCorrect: false,
          },
        ],
      },
    ], // 6번째
  ]; // 문제 모음

  const dispatch = useDispatch();
  const state = useSelector((state) => state.userInfoReducer);
  const [quizCurrentQuestion, setQuizCurrentQuestion] = useState(0); // 현재 문제 index
  const [showQuizScore, setShowQuizScore] = useState(false); // 점수 화면 보임 여부
  const [quizScore, setQuizScore] = useState(-1); // 점수 카운트

  const updateLastQuizAndExp = async () => {
    try {
      const patchResult = await axios.patch(
        `${url}/user/quiz-exp`,
        {
          quizDate: nowDate,
          experience: quizScore * 5 + state.userInfo.experience,
        },
        {
          headers: { authorization: `Bearer ${state.accessToken}` },
        }
      ); // axios로 서버에 업데이트 된 값 전달해야 함
      // 다시 유저 정보 조회
      if (patchResult.data.accessToken) {
        // localstorage에 담긴 accessToken 업데이트
        // reducer에서 accessToken값 업데이트
        dispatch(setAccessToken(patchResult.data.accessToken));
      }
      const getResult = await axios.get(`${url}/user`, {
        headers: { authorization: `Bearer ${state.accessToken}` },
      }); //새로 유저 정보 요청하는 axios 요청
      dispatch(setUserInfo(getResult.data.data)); // axios 리턴으로 유저 정보 업데이트
    } catch (error) {
      // login상태 false로 변경
      // localStorage에 담긴 내용 다 지우기
      // reducer에서 관리하는 userInfo
      if (error.response.data.message === 'Send new Login Request') {
        swal({
          title: '로그인이 필요합니다.',
          text: '로그인이 만료되었습니다.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      } else {
        swal({
          title: 'Internal Server Error',
          text: '죄송합니다. 다시 로그인 후 해주세요.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      }
    }
  }; // 접속한 날짜, 경험치 업데이트하는 함수
  const closeQuizModal = (isOpen) => {
    dispatch(setQuizModal(isOpen)); // 퀴즈 모달 닫기
  }; // 퀴즈 모달 닫는 함수

  const handleQuizAnswerClick = (isCorrect) => {
    if (isCorrect === true) {
      setQuizScore(quizScore + 1); // 맞다면 점수에 ++1
    }
    const nextQuizQuestion = quizCurrentQuestion + 1; // currentQuestion에 다음문제가 있나?
    if (nextQuizQuestion <= questions[questionNum].length - 1) {
      // 다음문제가 있다면
      setQuizCurrentQuestion(nextQuizQuestion); // currentQuestion 정식으로 업데이트
    } else {
      // 다음문제가 없다면
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
          <QuizScore onLoad={updateLastQuizAndExp}>
            <img src={you_quiz} alt='You Quiz?' />
            <div>
              <p>총 {quizScore}개를 맞추셨습니다!</p>
              <p>{quizScore * 5} 포인트가 적립되었습니다!</p>
            </div>
            {/*점수 보여줌 */}
          </QuizScore>
        ) : (
          <>
            <QuizQuestion>
              {quizCurrentQuestion === 0 ? (
                <img src={you_quiz} alt='You Quiz?' />
              ) : (
                <QuizCount>
                  <span>Question {quizCurrentQuestion}</span>/
                  {questions[questionNum].length - 1}
                </QuizCount>
              )}
              <QuizText>
                {questions[questionNum][quizCurrentQuestion].questionText}
              </QuizText>
            </QuizQuestion>

            {/* 선택지 */}
            <QuizChoices>
              {questions[questionNum][quizCurrentQuestion].answerOptions.map(
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

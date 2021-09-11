// 오늘의 퀴즈 부분
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setQuizModal } from '../actions/index';

const QuizBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  display: grid;
  place-items: center;
`;
const QuizModal = styled.div`
  width: 50vw;
  height: 80vh;
  background-color: #fff;
`;

function Quiz() {
  const dispatch = useDispatch();
  const closeQuizModal = (isOpen) => {
    dispatch(setQuizModal(isOpen));
  }; // 퀴즈 모달 닫는 함수

  return (
    <QuizBackdrop>
      <QuizModal>
        <div onClick={() => closeQuizModal(false)}>&times;</div>
        this is quizModal
      </QuizModal>
    </QuizBackdrop>
  );
}

export default Quiz;

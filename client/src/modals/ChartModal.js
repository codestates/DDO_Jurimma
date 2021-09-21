// 실시간 순위 그래프 나타날 모달
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setChartModal } from '../actions/index';
import { Doughnut } from 'react-chartjs-2';

const ChartGraphdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 20;
`;
const ChartGraphModal = styled.div`
  width: max(40vw, 350px);
  height: 600px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  > .closeBtn {
    z-index: 10;
    font-size: 50px;
    position: absolute;
    right: -40px;
    top: -40px;
    color: #fff;
    cursor: pointer;
    transition: 0.5s;
    @media screen and (max-width: 479px) {
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

function ChartModal({ realTime }) {
  const dispatch = useDispatch();
  const closeChartGraphModal = (isOpen) => {
    dispatch(setChartModal(isOpen));
  }; // 로그인 모달 닫는 함수

  console.log('realreal', realTime);

  return (
    <ChartGraphdrop>
      <ChartGraphModal>
        <div className='closeBtn' onClick={() => closeChartGraphModal(false)}>
          &times;
        </div>
        this is ChartModal
      </ChartGraphModal>
    </ChartGraphdrop>
  );
}

export default ChartModal;

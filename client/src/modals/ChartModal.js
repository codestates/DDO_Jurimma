// 실시간 순위 그래프 나타날 모달
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setChartModal } from '../actions/index';

const ChartGraphdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  display: grid;
  place-items: center;
`;
const ChartGraphModal = styled.div`
  width: 50vw;
  height: 80vh;
  background-color: #fff;
`;

function ChartModal() {
  const dispatch = useDispatch();
  const closeChartGraphModal = (isOpen) => {
    dispatch(setChartModal(isOpen));
  }; // 로그인 모달 닫는 함수

  return (
    <ChartGraphdrop>
      <ChartGraphModal>
        <div onClick={() => closeChartGraphModal(false)}>&times;</div>
        this is ChartModal
      </ChartGraphModal>
    </ChartGraphdrop>
  );
}

export default ChartModal;

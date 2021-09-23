// 실시간 순위 그래프 나타날 모달
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setChartModal } from '../actions/index';
import { Bar } from 'react-chartjs-2';

const ChartGraphdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  z-index: 20;
  > #ChartWrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    > #barChart {
      width: 80%;
      border-radius: 20px;
    }
  }
  > #closeBtnWrap {
    width: 100%;
    > .closeBtn {
      cursor: pointer;
      width: 50px;
      height: 50px;
      color: #000;
      font-size: 50px;
      left: 90%;
      top: 20px;
      position: relative;
      color: #fff;
      transition: 0.5s;
      z-index: 30;
      @media only screen and (max-width: 500px) {
        left: 85%;
      }
    }
    > .closeBtn:hover {
      transform: rotate(-90deg);
    }
  }
`;

function ChartModal() {
  const dispatch = useDispatch();
  const bestSearchState = useSelector((state) => state.bestSearchReducer);
  const closeChartGraphModal = (isOpen) => {
    dispatch(setChartModal(isOpen));
  }; // 로그인 모달 닫는 함수

  const bestWordName = bestSearchState.searchData.map((el) => el.wordName);
  const bestCount = bestSearchState.searchData.map((el) => el.count);
  const bestCountPercent = bestCount.map((el) => (el * 100) / 1000);
  const chartData = {
    labels: bestWordName,
    datasets: [
      {
        label: '실시간 TOP 10 (%)',
        data: bestCountPercent,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(201, 203, 207, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartGraphdrop>
      <div id='closeBtnWrap'>
        <div className='closeBtn' onClick={() => closeChartGraphModal(false)}>
          &times;
        </div>
      </div>
      <div id='ChartWrap'>
        <div id='barChart'>
          <Bar data={chartData} />
        </div>
      </div>
    </ChartGraphdrop>
  );
}

export default ChartModal;

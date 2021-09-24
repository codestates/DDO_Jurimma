// 실시간 순위 보여질 부분
import styled, { keyframes } from 'styled-components';
import BestSearch from './BestSearch';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Doughnut } from 'react-chartjs-2';

const ChartWrap = styled.div`
  width: 400px; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1399px) {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
  }
  > .bestSearchTitle {
    color: #fff;
    height: 7vh;
    line-height: 7vh;
    font-family: 'NEXON Lv2 Gothic Bold';
    font-size: 20px;
  }
`;

const ChartBar = styled.div`
  height: 45vh;
`;

function Chart({ setWord }) {
  const bestSearchState = useSelector((state) => state.bestSearchReducer);
  const url = process.env.REACT_APP_API_URL || `http://localhost:3000`;

  const bestWordName = bestSearchState.searchData.map((el) => el.wordName);
  const bestCountPercent = bestSearchState.searchData.map(
    (el) => (el.count * 100) / 1000
  );

  const chartData1 = {
    labels: bestWordName,
    datasets: [
      {
        axis: 'y',
        label: '실시간 검색어 순위 10 차트 (%)',
        data: bestCountPercent,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
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
    <ChartWrap>
      <ChartBar>
        <Bar
          data={chartData1}
          options={{
            // indexAxis: 'y',
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                    stepSize: 10,
                  },
                },
              ],
            },
          }}
        />
        {/* <Doughnut
          id='doughnutChart'
          data={chartData1}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        /> */}
      </ChartBar>
      <div className='bestSearchTitle'>실시간 검색어 Top 10</div>
      <BestSearch setWord={setWord} />
    </ChartWrap>
  );
}

export default Chart;

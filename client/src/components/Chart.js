import styled from 'styled-components';
import BestSearch from './BestSearch';
import '../App.css';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

const ChartWrap = styled.div`
  width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1399px) {
    width: 100%;
    margin: 0 auto;
  }
  > .bestSearchTitle {
    color: #fff;
    height: 5vh;
    line-height: 5vh;
    font-family: 'NEXON Lv2 Gothic Bold';
    font-size: 20px;
  }
`;

const ChartBar = styled.div`
  height: 35vh;
`;

function Chart({ setWord }) {
  const bestSearchState = useSelector((state) => state.bestSearchReducer);
  const bestWordName = bestSearchState.searchData.map((el) => el.wordName);
  const bestWordAllCount = bestSearchState.searchData
    .map((el) => el.count)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  const bestCountPercent = bestSearchState.searchData.map((el) =>
    ((el.count * 100) / bestWordAllCount).toFixed(2)
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
      </ChartBar>
      <div className='bestSearchTitle'>실시간 검색어 Top 10</div>
      <BestSearch setWord={setWord} />
    </ChartWrap>
  );
}

export default Chart;

import styled from 'styled-components';

const SearchAutoCompWrap = styled.div``;

const AutoComp = styled.div`
  width: 100%;
  z-index: 3;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: #fff;
  margin-top: 5px;
  > li {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    cursor: pointer;
    :hover {
      border-radius: 30px;
      background-color: #440a67;
      color: #fff;
      opacity: 0.3;
    }
    &.selected {
      border-radius: 30px;
      background-color: #440a67;
      color: #fff;
    }
  }
`;

function SearchAutoComp({ autoCompResult, setWord, selected }) {
  return (
    <SearchAutoCompWrap>
      <AutoComp>
        {autoCompResult.map((data, index) => {
          return (
            <li
              key={index}
              className={selected === index ? 'selected' : ''}
              value={data}
              onMouseDown={() => setWord(data)}
            >
              {data}
            </li>
          );
        })}
      </AutoComp>
    </SearchAutoCompWrap>
  );
}

export default SearchAutoComp;

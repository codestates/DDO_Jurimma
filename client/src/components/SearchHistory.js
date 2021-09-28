import styled from 'styled-components';

const SearchHistoryWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
`;
export const SearchHistoryBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    > li {
      margin-top: 10px;
      width: max(8vw, 80px);
      height: 40px;
      border-radius: 50px;
      background-color: transparent;
      border: 2px solid #fff;
      text-align: center;
      line-height: 40px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      font-size: max(0.8vw, 12px);
      text-overflow: ellipsis;
      cursor: pointer;
      transition: 0.5s;
      > .tagTitle {
        flex: 2 1 auto;
        height: 40px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > .tagTitle:hover {
        color: #440a67;
      }
      > .closeTag {
        background-color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        border-radius: 50px;
        color: #440a67;
        cursor: pointer;
      }
    }
    > li:hover {
      background-color: #fff;
      > .tagTitle {
        color: #440a67;
      }
      > .closeTag {
        background-color: #440a67;
        color: white;
      }
    }
  }
`;

function SearchHistory({ removeTags, tags, setWord }) {
  return (
    <SearchHistoryWrap>
      <SearchHistoryBox>
        <ul>
          {tags.map((tag, index) => {
            return (
              <li key={index} className='tag'>
                <span className='tagTitle' onClick={() => setWord(tag)}>
                  {tag}
                </span>
                <span className='closeTag' onClick={() => removeTags(index)}>
                  &times;
                </span>
              </li>
            );
          })}
        </ul>
      </SearchHistoryBox>
    </SearchHistoryWrap>
  );
}

export default SearchHistory;

// 과거 검색결과 보관
import styled from 'styled-components';
import { useState } from 'react';

const SearchHistoryWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  box-sizing: border-box;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
`;
export const SearchHistoryBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  > ul {
    width: 100%;
    height: 60%;
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

function SearchHistory({ removeTags, tags }) {
  return (
    <SearchHistoryWrap>
      <SearchHistoryBox>
        <ul>
          {tags.map((tag, index) => {
            return (
              <li key={index} className='tag'>
                <span className='tagTitle'>{tag}</span>
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

// Search에서 검색창 부분
import styled, { keyframes } from 'styled-components';
import SearchAutoComp from './SearchAutoComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Throttle } from 'react-throttle';
import { useState, useEffect } from 'react';

const HeaderKeyFrame = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const SearchInputBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
  position: relative;
`;

const InputBox = styled.div`
  width: 100%;
  height: 70px;
  flex: 1 1 auto;
  background: linear-gradient(-45deg, red, #b4aee8);
  animation: ${HeaderKeyFrame} 5s ease infinite;
  background-size: 200% 100%;
  border-radius: 50px;
  display: flex;
  align-items: center;
  > #searchBox {
    width: 890px;
    height: 60px;
    border-radius: 50px;
    border: none;
    display: flex;
    align-items: center;
    margin: 0 auto;
    outline: none;
    padding-left: 2vw;
    background-color: #fff;
    line-height: 60px;
    @media only screen and (max-width: 1399px) {
      width: 98.5%;
      height: 87%;
    }
    > input {
      flex: 4 1 auto;
      height: 30px;
      padding-left: 10px;
      outline: none;
      @media only screen and (max-width: 1399px) {
        width: 70%;
      }
    }
    > #buttonWrap {
      display: flex;
      flex: 1 1 auto;
      @media only screen and (max-width: 1399px) {
        width: 30%;
      }
      > button {
        flex: 1 1 auto;
        font-size: 20px;
        color: #440a67;
        background-color: transparent;
        cursor: pointer;
        @media only screen and (max-width: 1399px) {
          font-size: 18px;
        }
      }
    }
  }
`;

function SearchInputWrap({
  addEnterTags,
  addClickTags,
  changeWord,
  autoCompResult,
  setWord,
  word,
}) {
  const [isShowAutoComp, setIsShowAutoComp] = useState(false); // 자동 검색 여부 display 여부

  useEffect(() => {
    if (word === '') {
      // 만약 입력값이 아무것도 입력되지 않은 상태라면
      setIsShowAutoComp(false); // 자동 검색 안보이게
    } else {
      setIsShowAutoComp(true); // 자동 검색 보이게
    }
  }, [word]); // 입력값이 변할때마다

}) {
  return (
    <SearchInputBox>
      <InputBox>
        <div id='searchBox'>
          <input
            id='reqInput'
            onChange={changeWord}
            onKeyUp={(event) => addEnterTags(event)}
            value={word}
          ></input>
          <div id='buttonWrap' onClick={() => setWord('')}>
            <button>&times;</button>
            <button>
              <FontAwesomeIcon icon={faMicrophone} />
            </button>
            <button onClick={addClickTags}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </InputBox>
      {isShowAutoComp ? (
        <SearchAutoComp autoCompResult={autoCompResult} setWord={setWord} />
      ) : null}
    </SearchInputBox>
  );
}

export default SearchInputWrap;

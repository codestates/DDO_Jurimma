import styled, { keyframes } from 'styled-components';
import SearchAutoComp from './SearchAutoComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import silverBadge from '../images/junior_badge.svg';
import goldBadge from '../images/senior_badge.svg';
import diaBadge from '../images/master_badge.svg';

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
  position: relative;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
  #levelBadge {
    position: relative;
    margin: 0 auto;
    @media only screen and (max-width: 800px) {
      top: 30px;
    }
  }
`;

const SearchBox = styled.div`
  width: 890px;
  height: 55px;
  border-radius: 50px;
  border: none;
  display: flex;
  align-items: center;
  margin: 0 auto;
  outline: none;
  padding-left: 2vw;
  background-color: #fff;
  line-height: 60px;
  margin-top: -60.5px;
  @media only screen and (max-width: 1399px) {
    width: 98.5%;
  }
  @media only screen and (max-width: 800px) {
    height: 42px;
    margin-top: -46.5px;
  }
  > input {
    width: 88%;
    height: 30px;
    padding-left: 10px;
    outline: none;
  }
  > #buttonWrap {
    display: flex;
    width: 12%;
    margin-right: 20px;
    > button {
      width: 50%;
      font-size: 20px;
      color: #440a67;
      background-color: transparent;
      cursor: pointer;
      margin-left: 7px;
      @media only screen and (max-width: 1399px) {
        font-size: 18px;
      }
      @media only screen and (max-width: 400px) {
        font-size: 15px;
      }
    }
  }
`;

const InputBox = styled.div`
  width: 100%;
  height: 65px;
  flex: 1 1 auto;
  animation: ${HeaderKeyFrame} 4s ease infinite;
  background-size: 200% 100%;
  border-radius: 50px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 800px) {
    height: 50px;
  }
`;

function SearchInputWrap({ autoCompResult, setWord, word, searchWord }) {
  const [isShowAutoComp, setIsShowAutoComp] = useState(false);
  const [selected, setSelected] = useState(-1);
  const state = useSelector((state) => state.userInfoReducer);

  useEffect(() => {
    if (word === '') {
      setIsShowAutoComp(false);
    } else {
      setIsShowAutoComp(true);
    }
  }, [word]);

  const handleKeyUp = (event) => {
    if (
      event.getModifierState('Fn') ||
      event.getModifierState('Hyper') ||
      event.getModifierState('OS') ||
      event.getModifierState('Super') ||
      event.getModifierState('Win')
    )
      return;
    if (
      event.getModifierState('Control') +
        event.getModifierState('Alt') +
        event.getModifierState('Meta') >
      1
    )
      return;
    if (word !== '') {
      if (event.code === 'ArrowDown') {
        if (autoCompResult.length - 1 > selected) {
          setSelected(selected + 1);
        } else if (selected === autoCompResult.length - 1) {
          setSelected(0);
        }
      }
      if (event.code === 'ArrowUp' && selected >= 0) {
        setSelected(selected - 1);
      }
      if (event.code === 'Enter' && selected >= -1) {
        if (selected === -1) {
          searchWord(event, autoCompResult[selected] || event.target.value);
          setSelected(-1);
        } else {
          setWord(autoCompResult[selected]);
          setSelected(-1);
        }
      }
    }
  };

  let loginColorBox;
  let levelBadge;
  let levelWidth;
  let levelHeight;
  let levelTop;
  if (!state.isLogin) {
    loginColorBox = `linear-gradient(-45deg, #a239ea, #b4aee8)`;
    levelWidth = '70px';
    levelHeight = '70px';
  } else {
    if (0 <= state.userInfo.experience && state.userInfo.experience < 100) {
      loginColorBox = `linear-gradient(-45deg, #185ADB, #A2DBFA)`;
      levelBadge = `${silverBadge}`;
      levelWidth = '70px';
      levelHeight = '70px';
      levelTop = '37px';
    } else if (
      100 <= state.userInfo.experience &&
      state.userInfo.experience < 200
    ) {
      loginColorBox = `linear-gradient(-45deg, #ffc851, #FF1515)`;
      levelBadge = `${goldBadge}`;
      levelWidth = '50px';
      levelHeight = '50px';
      levelTop = '30px';
    } else {
      loginColorBox = `linear-gradient(-45deg, #3FC1FF, #D42AFF)`;
      levelBadge = `${diaBadge}`;
      levelWidth = '65px';
      levelHeight = '65px';
      levelTop = '35px';
    }
  }

  return (
    <SearchInputBox>
      <div
        id='levelBadge'
        style={{
          backgroundImage: `url(${levelBadge})`,
          width: `${levelWidth}`,
          height: `${levelHeight}`,
          top: `${levelTop}`,
        }}
      ></div>
      <InputBox style={{ backgroundImage: loginColorBox }}></InputBox>
      <SearchBox>
        <input
          id='reqInput'
          onChange={(event) => setWord(event.target.value)}
          onKeyUp={(event) => handleKeyUp(event)}
          value={word}
          autoComplete='off'
          onBlur={() => setIsShowAutoComp(false)}
          onFocus={() => setIsShowAutoComp(true)}
        ></input>
        <div id='buttonWrap'>
          <button onClick={() => setWord('')}>&times;</button>
          <button onClick={(event) => searchWord(event, word)}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </SearchBox>
      {isShowAutoComp ? (
        <SearchAutoComp
          autoCompResult={autoCompResult}
          selected={selected}
          setWord={setWord}
        />
      ) : null}
    </SearchInputBox>
  );
}

export default SearchInputWrap;

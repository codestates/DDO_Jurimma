// 메인페이지에서 입력창, 입력창 자동완성, 과거 검색기록, 검색결과 보여질 부분
import styled from 'styled-components';
import SearchHistory from './SearchHistory';
import SearchInputWrap from './SearchInputWrap';
import SearchResult from './SearchResult';
import { useState } from 'react';
import checkModule from '../checkModule';

import axios from 'axios';
axios.defaults.withCredentials = true;

const SearchWrap = styled.div`
  width: 900px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
`;

function Search() {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const initialTags = JSON.parse(localStorage.getItem('searchHistory')) || []; // ['자만추', '만반잘부', '슬세권']; // test/test
  const [tags, setTags] = useState(initialTags); // 단어 검색 기록
  const [word, setWord] = useState(''); // 입력창
  const [wordResult, setWordResult] = useState([]); // 검색 결과
  const [autoCompResult, setAutoCompResult] = useState([]);
  if (tags && tags.length === 7) {
    tags.splice(0, 1);
  } // 검색내역은 6개까지

  const searchWord = async (wordTarget) => {
    let getResult = await axios.get(
      `${url}/meaning?word=${wordTarget}&offset=0&limit=3`
    );
    // console.log(getResult.data.data);
    setWordResult(getResult.data.data);
  }; // axios로 단어 검색 및 redux 업데이트

  const removeTags = (indexToRemove) => {
    let newTags = tags
      .slice(0, indexToRemove)
      .concat(tags.slice(indexToRemove + 1));
    setTags(newTags); // tags 상태 업데이트
    localStorage.setItem('searchHistory', JSON.stringify([...newTags])); // localStorage 값 없데이트
  }; // 검색내역 삭제하기

  const addEnterTags = (event) => {
    if (event.key === 'Enter') {
      if (!tags.includes(event.target.value) && event.target.value !== '') {
        setTags([...tags, event.target.value]); // tags 상태 업데이트
        localStorage.setItem(
          'searchHistory',
          JSON.stringify([...tags, event.target.value])
        ); // ! throttling 때문에 추가가 될때도 있고 안될때도 있고 되도 다시 ""로 리셋됨
        searchWord(event.target.value);
        setWord('');
      }
    }
  }; // input창 엔터키 눌렀을 때 태그 추가 함수

  const changeWord = async (event) => {
    setWord(event.target.value);
    console.log(!checkModule.IsValidateWordName(event.target.value));
    if (
      event.target.value !== '' && // 무언가가 입력되어 있고
      !checkModule.IsValidateWordName(event.target.value) && // 입력된 값이 자음 or 모음만 있는지 여부
      checkModule.LimitWordName(event.target.value) // 입력된 값이 5글자 이상인지 판별 (미만일때만 요청)
    ) {
      let getResult = await axios.get(
        `${url}/word?query=${event.target.value}`
      );
      setAutoCompResult(getResult.data.data);
      // console.log(getResult.data);
    }
  }; // input창 입력사항 반영 함수

  const addClickTags = () => {
    if (word.length !== 0 && tags.includes(word) === false) {
      setTags([...tags, word]);
      localStorage.setItem('searchHistory', JSON.stringify([...tags, word]));
      searchWord(word);
      setWord('');
    }
  }; // input창 돋보기 버튼 클릭했을때 태그 추가 함수

  // Input에 입력하고 엔터키 / 버튼 클릭하게 되면 axios 요청이 가게 되고 검색결과값 state가 업데이트 됨 + localStorage에서 보관하는 searchHistory에도 추가사키기
  // 만약에 SearchResult에 결과가 아무것도 없다면 SearchResult에 글쓰기 모달 뜨는 버튼 만들기
  // -> /main에서 글쓰기를 마치면(=state.isShowNewContentModal이 바뀐다면) 다시 검색 요청이 가게....?

  return (
    <SearchWrap>
      <SearchHistory
        initialTags={initialTags}
        removeTags={removeTags}
        tags={tags}
      />
      <SearchInputWrap
        addEnterTags={addEnterTags}
        addClickTags={addClickTags}
        changeWord={changeWord}
        word={word}
        autoCompResult={autoCompResult}
      />
      <SearchResult wordResult={wordResult} />
    </SearchWrap>
  );
}

export default Search;

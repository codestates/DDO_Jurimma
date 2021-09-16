// 메인페이지에서 입력창, 입력창 자동완성, 과거 검색기록, 검색결과 보여질 부분
import styled from 'styled-components';
import SearchHistory from './SearchHistory';
import SearchInputWrap from './SearchInputWrap';
import SearchResult from './SearchResult';
import { useState, useEffect } from 'react';
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
  const initialTags = JSON.parse(localStorage.getItem('searchHistory')) || []; // ['자만추', '만반잘부', '슬세권'];
  const [tags, setTags] = useState(initialTags); // 단어 검색 기록
  const [word, setWord] = useState(''); // 입력창
  const [wordResult, setWordResult] = useState([]); // 검색 결과
  const [autoCompResult, setAutoCompResult] = useState([]); // 자동 검색 결과
  const [notSearched, setNotSearched] = useState(true); // 검색기능 사용해 보았는지 여부

  useEffect(() => {
    getAutoComp(word);
  }, [word]);

  if (tags && tags.length === 7) {
    tags.splice(0, 1);
  } // 검색내역은 6개까지

  const searchWord = async (wordTarget) => {
    let getResult = await axios.get(
      `${url}/meaning?word=${wordTarget}&offset=0&limit=3`
    );
    // console.log(getResult.data.data);
    setWordResult(getResult.data.data);
    setWord(''); // 입력창 정리
    if (notSearched === true) {
      setNotSearched(false);
    }
  }; // axios로 단어 검색 및 redux 업데이트

  const removeTags = (indexToRemove) => {
    let newTags = tags
      .slice(0, indexToRemove)
      .concat(tags.slice(indexToRemove + 1));
    setTags(newTags); // tags 상태 업데이트
    localStorage.setItem('searchHistory', JSON.stringify([...newTags])); // localStorage 값 없데이트
  }; // 검색내역 삭제하기

  const addEnterTags = (event) => {
    // 엔터키일때만 작동
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        // 무언가를 입력한 상태일 때
        if (!tags.includes(word)) {
          //검색기록에 없는 단어 입력했을 때
          setTags([...tags, event.target.value]); // tags 상태 업데이트
          localStorage.setItem(
            'searchHistory',
            JSON.stringify([...tags, event.target.value])
          );
        }
        // 검색기록에 있는 단어라면 윗 단계 패스하고 바로 검색
        searchWord(event.target.value); // 입력한 단어로 검색
        setAutoCompResult([]); // 자동검색 정리
      }
    }
  }; // input창 엔터키 눌렀을 때 태그 추가 함수

  const getAutoComp = async (word) => {
    if (
      word !== '' && // 무언가가 입력되어 있고
      !checkModule.IsValidateWordName(word) && // 입력된 값이 자음 or 모음만 있는지 여부
      checkModule.LimitWordName(word) // 입력된 값이 5글자 이상인지 판별 (미만일때만 요청)
    ) {
      let getResult = await axios.get(`${url}/word?query=${word}`);
      setAutoCompResult(getResult.data.data);
      // console.log(getResult.data);
    }
  }; // 자동완성 목록 요청하는 함수

  const changeWord = async (event) => {
    await setWord(event.target.value); // 입력한 내용으로 입력창 변경
  }; // input창 입력사항 반영 함수

  const addClickTags = () => {
    // 무언가 입력을 했다면
    if (word.length !== 0) {
      console.log('검색목록에 들어가있는지 여부: ', tags.includes(word));
      // 검색 기록에 입력한 word가 없다면
      if (tags.includes(word) === false) {
        setTags([...tags, word]); // 검색 기록에 추가
        localStorage.setItem('searchHistory', JSON.stringify([...tags, word])); // 로컬 스토리지에도 추가
      }
      // 검색 기록에 이미 word가 존재한다면
      searchWord(word); // 검색하기
      setWord(''); // 검색창 정리
      setAutoCompResult([]); // 자동검색 정리
    }
  }; // input창 돋보기 버튼 클릭했을때 검색 + 태그 추가 함수

  // Input에 입력하고 엔터키 / 버튼 클릭하게 되면 axios 요청이 가게 되고 검색결과값 state가 업데이트 됨 + localStorage에서 보관하는 searchHistory에도 추가사키기
  // 만약에 SearchResult에 결과가 아무것도 없다면 SearchResult에 글쓰기 모달 뜨는 버튼 만들기
  // -> /main에서 글쓰기를 마치면(=state.isShowNewContentModal이 바뀐다면) 다시 검색 요청이 가게....?

  return (
    <SearchWrap>
      <SearchHistory
        initialTags={initialTags}
        removeTags={removeTags}
        tags={tags}
        setWord={setWord}
      />
      <SearchInputWrap
        addEnterTags={addEnterTags}
        addClickTags={addClickTags}
        changeWord={changeWord}
        word={word}
        setWord={setWord}
        autoCompResult={autoCompResult}
      />
      <SearchResult wordResult={wordResult} notSearched={notSearched} />
    </SearchWrap>
  );
}

export default Search;

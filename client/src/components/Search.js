// 메인페이지에서 입력창, 입력창 자동완성, 과거 검색기록, 검색결과 보여질 부분
import styled from 'styled-components';
import SearchHistory from './SearchHistory';
import SearchInputWrap from './SearchInputWrap';
import SearchResult from './SearchResult';
import { useState } from 'react';

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
  const initialTags = ['자만추', '만반잘부', '슬세권']; // test/test
  const [tags, setTags] = useState(initialTags);
  const [word, setWord] = useState('');

  if (tags.length === 7) {
    tags.splice(0, 1);
  } // 검색내역은 6개까지

  const removeTags = (indexToRemove) => {
    let newTags = tags
      .slice(0, indexToRemove)
      .concat(tags.slice(indexToRemove + 1));
    setTags(newTags);
  }; // 검색내역 삭제하기

  const addEnterTags = (event) => {
    if (event.key === 'Enter') {
      if (!tags.includes(event.target.value) && event.target.value.length !== 0)
        setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  }; // 검색 결과창에서 엔터를 쳤을 때

  const changeWord = (event) => {
    setWord(event.target.value);
  };

  const addClickTags = () => {
    if (word.length !== 0 && tags.includes(word) === false) {
      setTags([...tags, word]);
    }
  };
  // 검색 결과값을 빈 useState으로 갖고있음
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
        changeWord={changeWord}
        addClickTags={addClickTags}
      />
      <SearchResult />
    </SearchWrap>
  );
}

export default Search;

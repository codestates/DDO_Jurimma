import styled from 'styled-components';
import SearchHistory from './SearchHistory';
import SearchInputWrap from './SearchInputWrap';
import SearchResult from './SearchResult';
import { useState, useEffect } from 'react';
import checkModule from '../checkModule';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAccessToken, setLogout } from '../actions';
axios.defaults.withCredentials = true;

const SearchWrap = styled.div`
  width: 900px;
  height: 100%;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1399px) {
    width: 100%;
    padding-top: 10px;
  }
`;

function Search({ word, setWord, listen, listening, stop }) {
  let url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const dispatch = useDispatch();
  const initialTags = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const [tags, setTags] = useState(initialTags); // 단어 검색 기록
  const [wordResult, setWordResult] = useState([]); // 검색 결과
  const [autoCompResult, setAutoCompResult] = useState([]); // 자동 검색 결과
  const [notSearched, setNotSearched] = useState(true); // 검색기능 사용해 보았는지 여부

  if (tags && tags.length === 7) {
    tags.splice(0, 1);
  }

  const searchWord = async (event, word = '') => {
    try {
      setWord(word);
      if (
        (event.key === 'Enter' && word !== '') ||
        (event.type === 'click' && word !== '')
      ) {
        if (!tags.includes(word)) {
          setTags([...tags, word]);
          localStorage.setItem(
            'searchHistory',
            JSON.stringify([...tags, word])
          );
        }
        let getResult = await axios.get(
          `${url}/meaning?word=${word}&offset=0&limit=3`
        );
        if (getResult.data.accessToken) {
          dispatch(setAccessToken(getResult.data.accessToken));
        }
        setWordResult(getResult.data.data);
        if (notSearched === true) {
          setNotSearched(false);
        }
        setWord('');
        setAutoCompResult([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === 'Send new Login Request') {
        swal({
          title: '로그인이 필요합니다.',
          text: '로그인이 만료되었습니다.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      } else {
        swal({
          title: 'Internal Server Error',
          text: '죄송합니다. 다시 로그인해주세요.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        });
      }
    }
  };

  const removeTags = (indexToRemove) => {
    let newTags = tags
      .slice(0, indexToRemove)
      .concat(tags.slice(indexToRemove + 1));
    setTags(newTags); // tags 상태 업데이트
    localStorage.setItem('searchHistory', JSON.stringify([...newTags])); // localStorage 값 없데이트
  };

  useEffect(() => {
    let url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
    const getAutoComp = async (word) => {
      try {
        if (word !== '') {
          if (
            !checkModule.IsValidateWordName(word) &&
            checkModule.LimitWordName(word)
          ) {
            let getResult = await axios.get(`${url}/word?query=${word}`);
            setAutoCompResult(getResult.data.data);
          }
        } else {
          setAutoCompResult([]);
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.message === ' Internal Server Error') {
          swal({
            title: 'Internal Server Error',
            text: '죄송합니다. 다시 로그인 후 해주세요.',
            icon: 'warning',
          }).then(() => {
            dispatch(setLogout());
            window.location.replace('/');
          });
        }
      }
    };
    getAutoComp(word);
  }, [dispatch, word]);

  return (
    <SearchWrap>
      <SearchHistory
        initialTags={initialTags}
        removeTags={removeTags}
        tags={tags}
        setWord={setWord}
        onMouseDown={stop}
      />
      <SearchInputWrap
        word={word}
        setWord={setWord}
        autoCompResult={autoCompResult}
        searchWord={searchWord}
        listen={listen}
        listening={listening}
        stop={stop}
      />
      <SearchResult
        wordResult={wordResult}
        notSearched={notSearched}
        word={word}
        onMouseDown={stop}
      />
    </SearchWrap>
  );
}

export default Search;

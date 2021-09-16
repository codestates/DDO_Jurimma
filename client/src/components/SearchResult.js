// Search에서 검색 후 좋아요 순으로 3개만 보여지는 부분
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewContentModal } from '../actions/index';

const SearchResultWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;

function SearchResult({ wordResult }) {
  const dispatch = useDispatch();
  const openNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  };

  return (
    <SearchResultWrap>
      <ul>
        {wordResult.map((res) => {
          return (
            <li key={res.id}>
              {res.wordName}, {res.wordMean}, {res.thumbsup.length}
            </li>
          );
        })}
      </ul>
      {/*search의 검색결과가 0일때만 아래 새글쓰기 버튼이 보이도록 지정해줘야 함*/}
      <button onClick={() => openNewContentModal(true)}>새글쓰기</button>
      <button>
        {/* <Link to={`/searchMore?wordName=${}</button>`>검색하기</Link>로 바꿔줘야함 */}
        <Link to='/searchMore'>더보기</Link> {/* 더보기 페이지로 이동 */}
      </button>
    </SearchResultWrap>
  );
}

export default SearchResult;

// Search에서 검색 후 좋아요 순으로 3개만 보여지는 부분
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewContentModal } from '../actions/index';

const SearchResultWrap = styled.div`
  flex: 1 1 auto; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  box-sizing: border-box;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  width: 50%;
  margin: 0 auto;
  > .newOrSearchBtn {
    cursor: pointer;
    margin-top: 40px;
    border-radius: 50px;
    width: 40%;
    height: 50px;
    transition: 0.3s;
    background-color: #fff;
    color: #440a67;
  }
  > .newOrSearchBtn:nth-child(2) {
    > a {
      display: block;
      width: 100%;
      height: 50px;
      text-decoration: none;
      text-align: center;
      line-height: 50px;
      color: #440a67;
    }
  }
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
      <BtnWrap>
        {/*search의 검색결과가 0일때만 아래 새글쓰기 버튼이 보이도록 지정해줘야 함*/}
        <button
          className='newOrSearchBtn'
          onClick={() => openNewContentModal(true)}
        >
          새글쓰기
        </button>
        <button className='newOrSearchBtn'>
          {/* <Link to={`/searchMore?wordName=${}</button>`>검색하기</Link>로 바꿔줘야함 */}
          <Link to='/searchMore'>더보기</Link> {/* 더보기 페이지로 이동 */}
        </button>
      </BtnWrap>
    </SearchResultWrap>
  );
}

export default SearchResult;

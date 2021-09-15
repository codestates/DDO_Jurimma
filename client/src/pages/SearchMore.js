// 검색결과 전체 보여지는 페이지
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContentModal } from '../actions/index';

const SearchMoreWrap = styled.div`
  height: 70vh; // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
`;
const ToDiffSearchMore = styled.div``;

function SearchMore() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userInfoReducer);
  const openNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  }; // 새로 글쓰는 모달 키는 함수(=== true값으로 만들어줌)
  // 만약 다른곳에서 새로운 글쓰기 모달이 꺼져서 isShowNewContentModal 값이 false가 되었다면 useEffect를 통해 검색값 다시 요청해서 결과 업데이트 되도록 하기
  // 좋아요 누르면 useEffect를 통해 검색값 다시 요청해서 결과 업데이트 되도록 하기
  return (
    <>
      {state.isLogin ? (
        <SearchMoreWrap>
          this is searchMore page
          <ToDiffSearchMore>
            <input type='text' />{' '}
            {/* 더보기 페이지에서 다른 단어 더보기페이지로*/}
            <button onClick={() => openNewContentModal(true)}>새글쓰기</button>
            <button>
              {/* <Link to={`/searchMore?wordName=${}</button>`>검색하기</Link> 로 바꿔줘야함 */}
              <Link to={`/searchMore`}>검색하기</Link>
            </button>
          </ToDiffSearchMore>
        </SearchMoreWrap>
      ) : (
        <Redirect to='/main' /> // 메인페이지로 리디렉션
      )}
    </>
  );
}

export default SearchMore;

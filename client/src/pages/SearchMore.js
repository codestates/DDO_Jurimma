// 검색결과 전체 보여지는 페이지
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContentModal } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import exProfileImg from '../images/basic_profileImg.svg';

const SearchMoreWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 50px;
  flex-wrap: wrap;
  @media only screen and (max-width: 1399px) {
    width: 80vw;
  }
  > h1 {
    height: 100px;
    width: 100%;
    color: #fff;
    font-size: 50px;
    line-height: 100px;
    text-align: center;
  }
`;
const ToDiffSearchMore = styled.div`
  width: 1400px;
  margin: 0 auto;
  margin-top: 120px;
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 1399px) {
    width: 80vw;
  }
  @media only screen and (max-width: 800px) {
    justify-content: center;
  }
  > #searchMoreWrap {
    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: flex-end;
    @media only screen and (max-width: 800px) {
      width: 100%;
      margin: 0 auto;
    }
    > input {
      width: 300px;
      height: 30px;
      outline: none;
      padding-left: 5px;
      background-color: transparent;
      color: #fff;
      @media only screen and (max-width: 800px) {
        width: 90%;
      }
    }
    > button {
      width: 50px;
      height: 100%;
      font-size: 20px;
      margin-left: 10px;
      background-color: transparent;
      > a {
        > .searchIcon {
          font-size: 20px;
          color: #fff;
        }
      }
    }
  }
`;

const SearchMoreBox = styled.div`
  width: 100%;
  margin-top: 50px;
  background-color: green;
  > ul {
    margin-top: 50px;
    width: 100%;
    background-color: #fff;
    > .wordBox {
      width: 95%;
      height: 300px;
      margin: 0 auto;
      background-color: pink;
      > .topWrap {
        display: flex;
        background-color: orange;
        justify-content: space-between;
      }
      > .wordMean {
        width: 100%;
        height: 150px;
        background-color: blue;
      }
      > .bottomWrap {
        display: flex;
        height: 50px;
        background-color: red;
        justify-content: space-between;
      }
    }
  }
`;

const ProfileWrap = styled.div`
  height: 50px;
  background-color: red;
  display: flex;
  > .userName {
    background-color: yellow;
  }
  > img {
    width: 50px;
    height: 50px;
  }
`;

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
        <>
          <ToDiffSearchMore>
            <div id='searchMoreWrap'>
              <input type='text' />{' '}
              {/* 더보기 페이지에서 다른 단어 더보기페이지로*/}
              <button>
                {/* <Link to={`/searchMore?wordName=${}</button>`>검색하기</Link> 로 바꿔줘야함 */}
                <Link to={`/searchMore`}>
                  <FontAwesomeIcon className='searchIcon' icon={faSearch} />
                </Link>
              </button>
            </div>
          </ToDiffSearchMore>
          <SearchMoreWrap>
            <h1>자만추</h1>
            <SearchMoreBox>
              <button onClick={() => openNewContentModal(true)}>
                새글쓰기
              </button>
              <ul>
                <li className='wordBox'>
                  <div className='topWrap'>
                    <h3>wordTitle</h3>
                    <ProfileWrap>
                      <div className='userName'>김코딩</div>
                      <img src={exProfileImg} />
                    </ProfileWrap>
                  </div>

                  <div className='wordMean'>자연스러운 만남 추구</div>

                  <div className='bottomWrap'>
                    <span>2021-09-17</span>
                    <div>좋아요 6개</div>
                  </div>
                </li>

                <li className='wordBox'>
                  <div className='topWrap'>
                    <h3>wordTitle</h3>
                    <ProfileWrap>
                      <div className='userName'>김코딩</div>
                      <img src={exProfileImg} />
                    </ProfileWrap>
                  </div>

                  <div className='wordMean'>자연스러운 만남 추구</div>

                  <div className='bottomWrap'>
                    <span>2021-09-17</span>
                    <div>좋아요 6개</div>
                  </div>
                </li>
              </ul>
            </SearchMoreBox>
          </SearchMoreWrap>
        </>
      ) : (
        <Redirect to='/main' /> // 메인페이지로 리디렉션
      )}
    </>
  );
}

export default SearchMore;

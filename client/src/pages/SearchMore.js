// 검색결과 전체 보여지는 페이지
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContentModal, setLogout, setUserInfo } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import exProfileImg from '../images/basic_profileImg.svg';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
import { useState } from 'react';
import '../loadingCss.css';
import swal from 'sweetalert';
import { setAccessToken } from '../actions/index';
axios.defaults.withCredentials = true;

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
      font-size: 12px;
      @media only screen and (max-width: 800px) {
        width: 90%;
      }
    }
    > input::-webkit-input-placeholder {
      color: #fff;
    }
    > input:focus::-webkit-input-placeholder {
      color: transparent;
    }
    > input:hover::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 13px;
      transition: 0.3s;
    }
    > button {
      width: 50px;
      height: 100%;
      font-size: 20px;
      margin-left: 10px;
      color: #fff;
      background-color: transparent;
      > a {
        > .searchIcon {
          font-size: 20px;
          color: #fff;
        }
      }
      :hover {
        cursor: pointer;
      }
    }
  }
`;

const SearchMoreBox = styled.div`
  width: 100%;
  margin-top: 50px;
  > .btnAndFilter {
    display: flex;
    justify-content: space-between;
    > button {
      width: 200px;
      height: 50px;
      border-bottom: 2px solid #fff;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      @media only screen and (max-width: 550px) {
        width: 120px;
        height: 40px;
      }
    }
    > select {
      width: 200px;
      height: 50px;
      text-align-last: center;
      text-align: center;
      cursor: pointer;
      -ms-text-align-last: center;
      -moz-text-align-last: center;
      outline: none;
      border-bottom: 2px solid #fff;
      background-color: transparent;
      color: #fff;
      > option {
        background-color: black;
      }
      @media only screen and (max-width: 550px) {
        width: 120px;
        height: 40px;
      }
    }
  }
  > ul {
    margin-top: 30px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    padding: 30px 0;
    > .wordBox {
      width: 95%;
      height: 300px;
      margin: 0 auto;
      background-color: #230638;
      border: 2px solid #fff;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      :nth-child(1) {
        margin-top: 0;
      }
      > .wordBoxWrap {
        width: 90%;
        > .topWrap {
          display: flex;
          justify-content: space-between;
          > h3 {
            width: 120px;
            text-align: center;
            color: #fff;
            height: 50px;
            line-height: 50px;
            border-radius: 10px;
            border: 2px solid #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            @media only screen and (max-width: 550px) {
              width: 80px;
              font-size: 14px;
            }
          }
        }
        > .wordMean {
          width: 100%;
          height: 150px;
          margin-top: 10px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          text-align: center;
          line-height: 150px;
          font-size: 18px;
        }
        > .bottomWrap {
          display: flex;
          height: 40px;
          margin-top: 10px;
          justify-content: flex-end;
          > span {
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: transparent;
            border: 2px solid #fff;
            color: #fff;
            border-radius: 10px;
            font-size: 12px;
          }
          > p {
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: #fff;
            margin-left: 10px;
            border-radius: 10px;
            transition: 0.3s;
            box-sizing: border-box;
            cursor: pointer;
            border: 2px solid transparent;
            :hover {
              background-color: #440a67;
              border: 2px solid #fff;
              > .thumbsupWrap {
                top: -40px;
                color: #fff;
              }
              > .hoverThumbsup {
                display: block;
              }
            }
            > .thumbsupWrap {
              color: #230638;
              position: relative;
              /* top: -40px; */
            }
          }
        }
      }
    }
  }
`;

const HoverThumbsup = styled.span`
  width: 200px;
  height: 40px;
  position: relative;
  top: -50px;
  left: -80px;
  font-size: 12px;
  background-color: #440a67;
  color: #fff;
  border-radius: 10px;
  border: 2px solid #fff;
  display: none;
`;

const ProfileWrap = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  > .userName {
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 10px;
    @media only screen and (max-width: 550px) {
      width: 50px;
      font-size: 10px;
    }
  }
  > .userPic {
    margin-left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;

function SearchMore() {
  let query = window.location.search.split('=')[1]; // "?wordName=~~"에서 "="뒤 쿼리를 뜯어옴
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.userInfoReducer);
  const [searchMoreData, setSearchMoreData] = useState([]); // 보여질 데이터
  const [searchMoreTitle, setSearchMoreTitle] = useState(''); // 보여질 타이틀
  const [newQuery, setNewQuery] = useState(''); // 새로 검색할 줄임말
  const [isLoading, setIsLoading] = useState(false);

  const openNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  }; // 새로 글쓰는 모달 키는 함수(=== true값으로 만들어줌)

  useEffect(() => {
    if (state.userInfo.id === -1) {
      // 유저가 로그아웃 버튼을 누른 경우
      swal({
        title: '로그아웃이 완료되었습니다.',
        text: '다음에 또 만나요! 🙋',
        icon: 'success',
      }).then(() => {
        history.push('/main');
      });
    } else {
      getMoreSearch(query);
    }
    // getMoreSearch(query);
  }, [state]); // 렌더 되고 바로 실행 -> 새글 추가할때마다 렌더링되게 수정

  // useEffect(() => {}, []); // 좋아요 업데이트를 위한 함수
  const updateThumbsup = async (contentId) => {
    try {
      let updateLike = await axios.patch(
        `${url}/meaning/thumbsup`,
        { contentId: contentId },
        {
          headers: { authorization: `Bearer ${state.accessToken}` },
        }
      );
      if (updateLike.data.accessToken) {
        dispatch(setAccessToken(updateLike.data.accessToken));
      }
      const getResult = await axios.get(`${url}/user`, {
        headers: { authorization: `Bearer ${state.accessToken}` },
      }); //새로 유저 정보 요청하는 axios 요청
      dispatch(setUserInfo(getResult.data.data));
    } catch (error) {
      console.log(error);
      swal({
        title: '로그인이 만료되었습니다.',
        text: '다시 로그인을 해주세요!',
        icon: 'error',
      }).then(() => {
        dispatch(setLogout());
        history.push('/');
      }); // sweet alert로 안내하고 랜딩페이지로 리다이렉트
    }
  };

  const getMoreSearch = async (query) => {
    try {
      if (!query) {
        query = window.location.pathname.split('=')[1];
      }
      let getResult = await axios.get(
        `${url}/meaning?word=${query}&offset=0&limit=10`,
        {
          headers: { authorization: `Bearer ${state.accessToken}` },
        }
      );
      console.log(getResult.data);
      if (getResult.data.accessToken) {
        // 응답에 accessToken이 담겨있다면
        dispatch(setAccessToken(getResult.data.accessToken));
      }
      // console.log(getResult.data);
      setSearchMoreData(getResult.data.data);
      setSearchMoreTitle(decodeURI(query));
      setIsLoading(true);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      swal({
        title: '로그인이 만료되었습니다.',
        text: '다시 로그인을 해주세요!',
        icon: 'error',
      }).then(() => {
        dispatch(setLogout());
        history.push('/main');
      }); // sweet alert로 안내하고 메인페이지로 리다이렉트
    }
  }; // axios로 searchMoreData에서 보여질 데이터 요청하는 함수

  const handleKeyPressNewQuery = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      history.push(`/searchMore/wordName=${newQuery}`);
      handleNewQuery();
    }
  }; // 더보기 페이지에서 검색 실행 시

  const handleNewQueryInputValue = (key) => (e) => {
    setNewQuery(e.target.value);
  }; // 더보기 페이지에서 검색 실행 시 인풋 값 가져오기

  const handleNewQuery = async () => {
    try {
      if (!newQuery || newQuery === ' ') {
        swal({
          title: '검색어를 입력해주세요.',
          text: '궁금한 줄임말을 검색해주세요.',
          icon: 'warning',
        }).then(() => {
          setNewQuery('');
        });
      } else {
        getMoreSearch(newQuery);
      }
    } catch (error) {
      console.log(error);
      swal({
        title: '로그인이 만료되었습니다.',
        text: '다시 로그인을 해주세요!',
        icon: 'error',
      }).then(() => {
        dispatch(setLogout());
        window.location.replace('/main');
      }); // sweet alert로 안내하고 메인페이지로 리다이렉트
    }
  };
  // TODO : 만약 다른곳에서 새로운 글쓰기 모달이 꺼져서 isShowNewContentModal 값이 false가 되었다면 useEffect를 통해 검색값 다시 요청해서 결과 업데이트 되도록 하기
  // TODO : 좋아요 누르면 useEffect를 통해 검색값 다시 요청해서 결과 업데이트 되도록 하기 + 다시 렌더 되도록 하기
  // TODO : 스크롤 떨어지는 부분 확인해서 axios 요청 다시 가도록 만들기
  return (
    <>
      {/* {state.isLogin ? ( */}
      {/* <> */}
      <ToDiffSearchMore>
        <div id='searchMoreWrap'>
          <input
            type='text'
            placeholder='다른 줄임말도 검색해보세요!'
            value={newQuery}
            onChange={handleNewQueryInputValue()}
            onKeyPress={handleKeyPressNewQuery}
          />
          {/* 더보기 페이지에서 다른 단어 더보기페이지로*/}
          <button>
            {/* <Link to={`/searchMore?wordName=${입력한 단어}</button>`>검색하기</Link> 로 바꿔줘야함 */}
            <Link
              to={`/searchMore/wordName=${newQuery}`}
              onClick={handleNewQuery}
            >
              <FontAwesomeIcon className='searchIcon' icon={faSearch} />
            </Link>
          </button>
        </div>
      </ToDiffSearchMore>
      <SearchMoreWrap>
        <h1>{searchMoreTitle}</h1>
        <SearchMoreBox>
          <div className='btnAndFilter'>
            <button onClick={() => openNewContentModal(true)}>
              새 줄임말 만들기
            </button>
            <select>
              <option>추천순</option>
              <option>최신순</option>
            </select>
          </div>
          {isLoading ? (
            <ul>
              {searchMoreData.map((data) => {
                return (
                  <li className='wordBox' key={data.id}>
                    <div className='wordBoxWrap'>
                      <div className='topWrap'>
                        <h3>{data.wordName}</h3>
                        <ProfileWrap>
                          <div className='userName'>{data.username}</div>
                          <div
                            className='userPic'
                            style={
                              data.userPic
                                ? {
                                    background: `url(${data.userPic})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                  }
                                : {
                                    background: `url(${exProfileImg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                  }
                            }
                          ></div>
                        </ProfileWrap>
                      </div>

                      <div className='wordMean'>{data.wordMean}</div>

                      <div className='bottomWrap'>
                        <span>2021-09-17</span>
                        <p>
                          <HoverThumbsup className='hoverThumbsup'>
                            {data.thumbsup.length === 0
                              ? `아직 좋아한 사람이
                            없습니다.`
                              : `${data.thumbsup[0]}님 외
                            ${data.thumbsup.length - 1}
                            명이 좋아합니다.`}
                          </HoverThumbsup>
                          <span
                            className='thumbsupWrap'
                            onClick={() => {
                              updateThumbsup(data.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faThumbsUp} />
                            {data.thumbsup.length}개
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul>
              <div id='loadingIndicator'>
                <div className='lds-dual-ring'></div>
              </div>
            </ul>
          )}
        </SearchMoreBox>
      </SearchMoreWrap>
      {/* </> */}
      {/* // ) : ( // console.log('isloginstate', state) // <Redirect to='/main' />{' '}
      // 메인페이지로 리디렉션 // 작성 글을 조회하는 axios 요청 과정에서,
      로그인이 만료된 경우 catch를 통해 메인페이지로 리다이렉트 하도록 변경함 //
      새로고침을 했을 때, 더보기페이지에서 유지를 못하고 메인으로 갔던 이유는,
      렌더링 될 때, isLogin이 false로 바뀌었다가 true로 바뀌는데 그 과정에서
      false에서 걸려서 메인페이지로 리다이렉트 되었던 것이었음. // )} //{' '} */}
    </>
  );
}

export default SearchMore;

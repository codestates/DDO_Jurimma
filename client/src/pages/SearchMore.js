// 검색결과 전체 보여지는 페이지
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNewContentModal,
  setLogout,
  setLogoutModal,
  setAccessToken,
} from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import exProfileImg from '../images/basic_profileImg.svg';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
import { useState } from 'react';
import '../loadingCss.css';
import swal from 'sweetalert';
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
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 30px 0;
    > .wordBox {
      width: 95%;
      min-height: 300px;
      height: auto;
      margin: 0 auto;
      background-color: #230638;
      border: 2px solid #fff;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      padding: 10px 0px;
      box-sizing: border-box;
      :nth-child(2n) {
        background-color: #2b055a;
      }
      :nth-child(1) {
        margin-top: 0;
        border: 4px solid #daa520;
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
          min-height: 150px;
          height: auto;
          margin-top: 10px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          font-size: 18px;
          display: grid;
          place-items: center;
          padding: 10px;
          box-sizing: border-box;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media only screen and (max-width: 550px) {
      width: 50px;
      min-height: 50px;
      line-height: 50px;
      font-size: 12px;
      padding: 0px 5px;
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
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [orderBy, setOrderBy] = useState('byThumbsup'); // 필터링 기준

  const ordering = (value) => {
    if (value === 'byThumbsup') {
      setOrderBy('byThumbsup');
    } else {
      setOrderBy('byUpdatedAt');
    }
  };

  const closeLogoutModal = (isOpen) => {
    dispatch(setLogoutModal(isOpen));
  }; // 로그인 모달 닫는 함수

  const openNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  }; // 새로 글쓰는 모달 키는 함수(=== true값으로 만들어줌)

  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [isEnd, setIsEnd] = useState(true);

  const axiosMoreWordMeaning = async () => {
    // 추가 데이터를 로드하는 상태로 전환
    setFetching(true);

    setSearchMoreData([
      ...searchMoreData,
      { id: 0, createdAt: 'T', thumbsup: [] },
    ]);

    if (!window.location.search) {
      query = window.location.pathname.split('=')[1];
    }
    // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
    let getResult = await axios.get(
      `${url}/meaning?word=${query}&offset=${searchMoreData.length}&limit=4&sort=${orderBy}`,
      {
        headers: { authorization: `Bearer ${state.accessToken}` },
      }
    );
    if (getResult.data.accessToken) {
      // 응답에 accessToken이 담겨있다면
      dispatch(setAccessToken(getResult.data.accessToken));
    }
    if (getResult.data.data.length === 0) {
      const loadedData = searchMoreData.slice();
      loadedData.push({ id: 'done', createdAt: 'T', thumbsup: [] });
      setSearchMoreData(loadedData);
      setIsEnd(false);
    } else {
      setSearchMoreData([...searchMoreData, ...getResult.data.data]);
    }
    setFetching(false);
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      fetching === false &&
      isEnd === true
    ) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setIsLoadingContent(false);
      axiosMoreWordMeaning();
      setIsLoadingContent(true);
    } else if (isEnd === false && isLoadingContent === true) {
      setIsLoadingContent(false);
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    if (state.userInfo.id === -1) {
      // 유저가 로그아웃 버튼을 누른 경우
      history.push('/main');
    } else {
      getMoreSearch(query);
      setIsEnd(true);
    }
  }, [state.userInfo.experience, orderBy]);

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
      const newSearchData = searchMoreData.slice();
      for (let i = 0; i < newSearchData.length; i++) {
        if (newSearchData[i].id === contentId) {
          newSearchData[i].thumbsup.push({
            username: state.userInfo.username,
            id: state.userInfo.id,
          });
          break;
        }
      }
      setSearchMoreData(newSearchData);
    } catch (err) {
      if (err.response.data.message === 'Send new Login Request') {
        swal({
          title: '로그인이 필요합니다.',
          text: '로그인이 만료되었습니다.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        }); // sweet alert로 안내하고 랜딩페이지로 리다이렉트
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

  const getMoreSearch = async (query) => {
    try {
      if (!query) {
        query = window.location.pathname.split('=')[1];
      }
      let getResult = await axios.get(
        `${url}/meaning?word=${query}&offset=0&limit=4&sort=${orderBy}`,
        {
          headers: { authorization: `Bearer ${state.accessToken}` },
        }
      );
      if (getResult.data.accessToken) {
        // 응답에 accessToken이 담겨있다면
        dispatch(setAccessToken(getResult.data.accessToken));
      }
      setSearchMoreData(getResult.data.data);
      setSearchMoreTitle(decodeURI(query));
      setIsLoading(true);
    } catch (err) {
      if (err.response.data.message === 'Send new Login Request') {
        swal({
          title: '로그인이 필요합니다.',
          text: '로그인이 만료되었습니다.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        }); // sweet alert로 안내하고 랜딩페이지로 리다이렉트
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
  }; // axios로 searchMoreData에서 보여질 데이터 요청하는 함수

  const handleKeyPressNewQuery = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      history.push(`/searchMore/wordName=${newQuery}`);
      handleNewQuery();
    }
  }; // 더보기 페이지에서 검색 실행 시

  const handleNewQueryInputValue = () => (e) => {
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
        setIsEnd(true);
        getMoreSearch(newQuery);
      }
    } catch (err) {
      if (err.response.data.message === 'Send new Login Request') {
        swal({
          title: '로그인이 필요합니다.',
          text: '로그인이 만료되었습니다.',
          icon: 'warning',
        }).then(() => {
          dispatch(setLogout());
          window.location.replace('/');
        }); // sweet alert로 안내하고 랜딩페이지로 리다이렉트
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

  return (
    <>
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
            <select value={orderBy} onChange={(e) => ordering(e.target.value)}>
              <option value='byThumbsup'>추천순</option>
              <option value='byUpdatedAt'>최신순</option>
            </select>
          </div>
          {isLoading || isLoadingContent ? (
            <ul>
              {searchMoreData.length > 0 ? (
                searchMoreData.map((data, idx) => {
                  if (data.id === 0) {
                    return (
                      <li className='wordBox' key={data.id}>
                        <div className='wordBoxWrap'>
                          <div className='topWrap'></div>
                          <div className='lds-dual-ring'></div>
                        </div>
                      </li>
                    );
                  } else if (data.id === 'done') {
                    return (
                      <li className='wordBox' key={data.id}>
                        <div className='wordBoxWrap'>
                          <div className='topWrap'></div>
                          <div
                            className='wordMean'
                            style={{ fontWeight: 'bold' }}
                          >
                            줄임말을 전부 가져왔습니다! 😁
                          </div>
                        </div>
                      </li>
                    );
                  } else {
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
                            <span>{data.createdAt.split('T')[0]}</span>
                            <p
                              onClick={() => {
                                const isLiked = data.thumbsup.filter(
                                  (el) => el.id === state.userInfo.id
                                );
                                if (isLiked.length > 0) {
                                  // 만약 내가 좋아요를 눌렀었다면 swal 처리하고 막음
                                  swal({
                                    title: '이미 좋아요를 누른 글입니다.',
                                    icon: 'warning',
                                  });
                                } else {
                                  updateThumbsup(data.id);
                                }
                              }}
                            >
                              <HoverThumbsup className='hoverThumbsup'>
                                {data.thumbsup.length === 0
                                  ? `아직 좋아한 사람이
                            없습니다.`
                                  : `${data.thumbsup[0].username}님 외
                            ${data.thumbsup.length - 1}
                            명이 좋아합니다.`}
                              </HoverThumbsup>
                              <span className='thumbsupWrap'>
                                <FontAwesomeIcon icon={faThumbsUp} />
                                &nbsp;&nbsp;{data.thumbsup.length}개
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  }
                })
              ) : (
                <li className='wordBox'>
                  <div className='wordBoxWrap'>
                    <div className='topWrap'></div>
                    <div className='wordMean' style={{ fontWeight: 'bold' }}>
                      아직 이 줄임말에 뜻이 없습니다. 새로운 뜻을 만들어보세요!
                      😁
                    </div>
                  </div>
                </li>
              )}
            </ul>
          ) : (
            <ul>
              <li className='wordBox'>
                <div className='lds-dual-ring'></div>
              </li>
            </ul>
          )}
        </SearchMoreBox>
      </SearchMoreWrap>
    </>
  );
}

export default SearchMore;

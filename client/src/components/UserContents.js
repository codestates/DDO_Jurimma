// Mypage에서 유저가 쓴 글 목록
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setEditContentModal } from '../actions/index';
import { setAccessToken, setLogout } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
axios.defaults.withCredentials = true;

const UserContentsWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  flex: 4 1 auto;
  box-sizing: border-box;
  margin-top: 50px;
  @media only screen and (max-width: 800px) {
    margin-top: 0;
  }
  @media only screen and (max-width: 550px) {
    width: 100%;
  }
  > ul {
    margin-top: 30px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 30px 0;
    > .noContent {
      > img {
        width: 220px;
        height: 220px;
      }
      color: #fff;
      display: grid;
      place-items: center;
    }
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
          text-align: center;
          font-size: 18px;
          display: grid;
          place-items: center;
          padding: 10px;
          box-sizing: border-box;
          @media only screen and (max-width: 550px) {
            font-size: 14px;
          }
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
          > .hoverThumbsWrap {
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

const EditContent = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 550px) {
    width: 100px;
  }
  > button {
    width: 90px;
    height: 40px;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.3s;
    background-color: #fff;
    @media only screen and (max-width: 550px) {
      width: 47px;
    }
    :hover {
      background-color: #440a67;
      color: #fff;
      border: 2px solid #fff;
    }
  }
`;

const FilterWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 550px) {
    justify-content: center;
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
function UserContents({
  setEditInfo,
  setStateCheck,
  stateCheck,
  editAndDelState,
  setEditAndDelState,
}) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const dispatch = useDispatch();
  const userInfoState = useSelector((state) => state.userInfoReducer);
  const [orderBy, setOrderBy] = useState('byUpdatedAt');
  const [myContentData, setmyContentData] = useState([]); // 보여질 데이터
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부
  const [isLoadingContent, setIsLoadingContent] = useState(false); // 유저 컨텐츠 로딩 여부
  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [isEnd, setIsEnd] = useState(true); // 유저 컨텐츠 다 가져왔는지 확인

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      scrollTop + clientHeight >= scrollHeight - 150 &&
      fetching === false &&
      isEnd === true
    ) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setIsLoadingContent(false);
      axiosMyContent(); // 3개 이후 데이터 요청
      setIsLoadingContent(true);
    } else if (isEnd === false && isLoadingContent === true) {
      setIsLoadingContent(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const axiosMyContent = async () => {
    setFetching(true); // 추가데이터 로딩중

    setmyContentData([
      ...myContentData,
      { id: 0, createdAt: 'T', thumbsup: [] },
    ]); // 원래있던 myContentData 에다가 id=0인 요소 추가

    let getResult = await axios.get(
      `${url}/meaning/user/${userInfoState.userInfo.id}?offset=${myContentData.length}&limit=3&sort=${orderBy}`,
      {
        headers: { authorization: `Bearer ${userInfoState.accessToken}` },
      }
    );
    if (getResult.data.accessToken) {
      dispatch(setAccessToken(getResult.data.accessToken));
    }
    // 받아온 4번~이후 데이터 length가 0이라면(=더 가져올게 없으면)
    if (getResult.data.data.length === 0) {
      const loadedData = myContentData.slice();
      loadedData.push({ id: 'done', createdAt: 'T', thumbsup: [] });
      setmyContentData(loadedData);
      setIsEnd(false); // 더 가져올거 없다고 표시해주기
    } else {
      // 받아온 4번~이후 데이터를 더 가져올게 있으면 추가해줌
      setmyContentData([...myContentData, ...getResult.data.data]);
    }
    setFetching(false); // 추가데이터 로딩 완료
  };

  useEffect(() => {
    getMyContent();
    setIsEnd(true);
    if (editAndDelState === true) {
      window.scrollTo(0, 600);
      setEditAndDelState(false);
    }
  }, [stateCheck]);

  const ordering = (value) => {
    if (value === 'byThumbsup') {
      setOrderBy('byThumbsup');
      setStateCheck(!stateCheck);
    } else {
      setOrderBy('byUpdatedAt');
      setStateCheck(!stateCheck);
    }
  };

  const openEditContentModal = async (
    isOpen,
    userEditId,
    userEditWordName,
    userEditWordMean
  ) => {
    await setEditInfo({ userEditId, userEditWordName, userEditWordMean }); // 수정 모달에서 보여질 데이터 지정
    dispatch(setEditContentModal(isOpen)); // 수정 모달 열기
    // setEditOrDelState(false); // 모달 기억 상태 true로 만들기
  }; // 모달에 띄울 정보 지정 + 수정 모달 여는 함수

  const deleteContent = (contentId) => {
    swal({
      title: '삭제 하시겠습니까?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          let delContent = await axios.delete(`${url}/meaning/${contentId}`, {
            headers: { authorization: `Bearer ${userInfoState.accessToken}` },
          });
          if (delContent.data.accessToken) {
            dispatch(setAccessToken(delContent.data.accessToken));
          }
          swal('삭제가 완료되었습니다', {
            icon: 'success',
          }).then(() => {
            setEditAndDelState(true);
            setStateCheck(!stateCheck); //상태 뒤집어줘서 useEffect 작동되게
          });
        } catch (error) {
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
      } else {
        return;
      }
    });
  };

  const getMyContent = async () => {
    try {
      let contentResult = await axios.get(
        `${url}/meaning/user/${userInfoState.userInfo.id}?offset=0&limit=3&sort=${orderBy}`,
        {
          headers: { authorization: `Bearer ${userInfoState.accessToken}` },
        }
      );
      if (contentResult.data.accessToken) {
        dispatch(setAccessToken(contentResult.data.accessToken));
      }
      setmyContentData([...contentResult.data.data]);
      setIsLoading(true);
    } catch (error) {
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
  }; // axios로 유저가 쓴 글 요청 및 dispatch로 redux 업데이트

  return (
    <UserContentsWrap>
      <FilterWrap>
        <select value={orderBy} onChange={(e) => ordering(e.target.value)}>
          <option value='byThumbsup'>추천순</option>
          <option value='byUpdatedAt'>최신순</option>
        </select>
      </FilterWrap>

      <ul>
        {isLoading || myContentData.length > 0 ? (
          myContentData.map((data, idx) => {
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
                    <div className='wordMean' style={{ fontWeight: 'bold' }}>
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
                      <EditContent>
                        <button onClick={() => deleteContent(data.id)}>
                          삭제하기
                        </button>
                        <button
                          onClick={() =>
                            openEditContentModal(
                              true,
                              data.id,
                              data.wordName,
                              data.wordMean
                            )
                          }
                        >
                          수정하기
                        </button>
                      </EditContent>
                    </div>

                    <div className='wordMean'>{data.wordMean}</div>

                    <div className='bottomWrap'>
                      <span>{data.updatedAt.split('T')[0]}</span>
                      <div className='hoverThumbsWrap'>
                        <HoverThumbsup className='hoverThumbsup'>
                          {data.thumbsup.length === 0
                            ? `아직 좋아한 사람이
                              없습니다.`
                            : `${data.thumbsup[0]}님 외
                              ${data.thumbsup.length - 1}
                              명이 좋아합니다.`}
                        </HoverThumbsup>
                        <div className='thumbsupWrap'>
                          <FontAwesomeIcon icon={faThumbsUp} />
                          &nbsp;&nbsp;{data.thumbsup.length}개
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
          })
        ) : (
          <ul>
            <li className='wordBox'>
              <div className='lds-dual-ring'></div>
            </li>
          </ul>
        )}
      </ul>
    </UserContentsWrap>
  );
}

export default UserContents;

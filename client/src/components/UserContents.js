// Mypage에서 유저가 쓴 글 목록
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setEditContentModal, getContent } from '../actions/index';
import { setAccessToken, setLogout } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
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
    @media only screen and (max-width: 550px) {
      width: 45px;
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

function UserContents({ setEditInfo, setUserContentsLength }) {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const dispatch = useDispatch();
  const userInfoState = useSelector((state) => state.userInfoReducer);
  const userContentState = useSelector((state) => state.userContentReducer);
  const [orderBy, setOrderBy] = useState('byUpdatedAt');

  const ordering = (value) => {
    if (value === 'byThumbsup') {
      setOrderBy('byThumbsup');
      dispatch(
        getContent(
          userContentState.data.sort(
            (a, b) => b.thumbsup.length - a.thumbsup.length
          )
        )
      );
    } else {
      setOrderBy('byUpdatedAt');
      dispatch(
        getContent(
          userContentState.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )
        )
      );
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
          let delContent = await axios.delete(
            `${url}/meaning/me?content-id=${contentId}`,
            {
              headers: { authorization: `Bearer ${userInfoState.accessToken}` },
            }
          );
          if (delContent.data.accessToken) {
            dispatch(setAccessToken(delContent.data.accessToken));
          }
          setUserContentsLength(userContentState.data.length - 1);
          swal('삭제가 완료되었습니다', {
            icon: 'success',
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

  return (
    <UserContentsWrap>
      <FilterWrap>
        <select value={orderBy} onChange={(e) => ordering(e.target.value)}>
          <option value='byThumbsup'>추천순</option>
          <option value='byUpdatedAt'>최신순</option>
        </select>
      </FilterWrap>

      <ul>
        {userContentState.data.map((el, idx) => {
          return (
            <li className='wordBox' key={idx}>
              <div className='wordBoxWrap'>
                <div className='topWrap'>
                  <h3>{el.wordName}</h3>
                  <EditContent>
                    <button onClick={() => deleteContent(el.id)}>
                      삭제하기
                    </button>
                    <button
                      onClick={() =>
                        openEditContentModal(
                          true,
                          el.id,
                          el.wordName,
                          el.wordMean
                        )
                      }
                    >
                      수정하기
                    </button>
                  </EditContent>
                </div>

                <div className='wordMean'>{el.wordMean}</div>

                <div className='bottomWrap'>
                  <span>{el.updatedAt.split('T')[0]}</span>
                  <div className='hoverThumbsWrap'>
                    <HoverThumbsup className='hoverThumbsup'>
                      {el.thumbsup.length === 0
                        ? `아직 좋아한 사람이
                            없습니다.`
                        : `${el.thumbsup[0]}님 외
                            ${el.thumbsup.length - 1}
                            명이 좋아합니다.`}
                    </HoverThumbsup>
                    <div className='thumbsupWrap'>
                      <FontAwesomeIcon icon={faThumbsUp} />
                      &nbsp;&nbsp;{el.thumbsup.length}개
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </UserContentsWrap>
  );
}

export default UserContents;

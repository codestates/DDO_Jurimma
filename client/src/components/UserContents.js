// Mypage에서 유저가 쓴 글 목록
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setEditContentModal, setAccessToken } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
  @media only screen and (max-width: 400px) {
    width: 300px;
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

const EditContent = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  > button {
    width: 120px;
    height: 40px;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.3s;
    @media only screen and (max-width: 550px) {
      width: 100px;
      font-size: 10px;
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

const HoverThumbsup = styled.div`
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

function UserContents() {
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const state = useSelector((state) => state.userInfoReducer);
  const openEditContentModal = (isOpen) => {
    dispatch(setEditContentModal(isOpen));
  }; // 수정 모달 여는 함수

  const getMyContent = async () => {
    let contentResult = await axios.get(`${url}/meaning/me`, {
      headers: { authorization: `Bearer ${state.accessToken}` },
    });
    if (contentResult.data.accessToken) {
      dispatch(setAccessToken(contentResult.data.accessToken));
    } // contentResult에 accessToken이 담겨오면 새로 업데이트
    dispatch(getContent([...contentResult.data.data]));
  }; // axios로 유저가 쓴 글 요청 및 dispatch로 redux 업데이트

  useEffect(() => {
    getMyContent();
  }, []);

  return (
    <UserContentsWrap>
      <FilterWrap>
        <select>
          <option>추천순</option>
          <option>최신순</option>
        </select>
      </FilterWrap>

      <ul>
        <li className='wordBox'>
          <div className='wordBoxWrap'>
            <div className='topWrap'>
              <h3>자만추</h3>
              <EditContent>
                <button onClick={() => openEditContentModal(true)}>
                  내가 쓴 글 수정하기
                </button>
              </EditContent>
            </div>

            <div className='wordMean'>자연스러운 만남 추구</div>

            <div className='bottomWrap'>
              <span>2021-09-17</span>
              <p>
                <HoverThumbsup className='hoverThumbsup'>
                  박해커님 외에 1명이 좋아합니다.
                </HoverThumbsup>
                <div className='thumbsupWrap'>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  2개
                </div>
              </p>
            </div>
          </div>
        </li>

        <li className='wordBox'>
          <div className='wordBoxWrap'>
            <div className='topWrap'>
              <h3>자만추</h3>
              <EditContent>
                <button onClick={() => openEditContentModal(true)}>
                  내가 쓴 글 수정하기
                </button>
              </EditContent>
            </div>

            <div className='wordMean'>자연스러운 만남 추구</div>

            <div className='bottomWrap'>
              <span>2021-09-17</span>
              <p>
                <HoverThumbsup className='hoverThumbsup'>
                  박해커님 외에 1명이 좋아합니다.
                </HoverThumbsup>
                <div className='thumbsupWrap'>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  2개
                </div>
              </p>
            </div>
          </div>
        </li>
      </ul>
      {/* 수정하기 버튼은 유저가 쓴 글이 mapping 된 div에 각각 들어가 있어야 함 */}
    </UserContentsWrap>
  );
}

export default UserContents;

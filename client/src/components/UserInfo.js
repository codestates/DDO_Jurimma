// Mypage 안에서 유저 정보 나타날 부분
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import basicProfile from '../images/basic_profileImg.svg';
import diaProfile from '../images/master_profile.svg';
import { useSelector } from 'react-redux';

const UserInfoWrap = styled.div`
  width: max(375px, 100%);
  max-width: 1080px;
  margin: 0 auto;
  flex: 3 1 auto;
  // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const UserInfoLevel = styled.div`
  flex: 1 1 auto;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  > #levelProfile {
    width: 100%;
    height: 80%;
    margin: 0 auto;
    background: url(${diaProfile}) center no-repeat;
    display: grid;
    place-items: center;
    @media only screen and (max-width: 800px) {
      min-height: 350px;
    }
    > #profileImg {
      width: 150px;
      height: 150px;
      border-radius: 150px;
      background: url(${basicProfile}) no-repeat;
    }
  }
  > #levelWrap {
    height: 20%;
    border: 1px solid #fff;
    color: #fff;
    display: grid;
    place-items: center;
    > #levelInfo {
      text-align: center;
      > p {
        color: #fff;
        margin-bottom: 10px;
      }
    }
    @media only screen and (max-width: 800px) {
      min-height: 100px;
    }
  }
`; // 유저 사진 및 레벨 정보
const UserInfoProgress = styled.div`
  width: 100%;
  height: 15px;
  background-color: #fff;
  border-radius: 50px;
  overflow: hidden;
  > #barStyle {
    /* 나중에 axios 하고나면 "state.experience"% 로 처리하기*/
    height: 100%;
    background-color: #b4aee8;
  }
`; // 유저 레벨 progress bar
const UserInfoData = styled.div`
  flex: 1 1 auto;
  border: 1px solid blue;
  display: grid;
  place-items: center;
  > #userInfo {
    width: 80%;
    text-align: center;
    > p {
      color: #fff;
      padding-bottom: 10px;
      box-sizing: border-box;
    }
    > #userInfoEditBtn {
      cursor: pointer;
      border-radius: 50px;
      width: 40%;
      height: 50px;
      background-color: #fff;
      color: #440a67;
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
  }
`; // 유저 개인 정보

function UserInfo() {
  const state = useSelector((state) => state.userInfoReducer);
  const barWidth = {
    width: state.userInfo.experience + '%',
  }; // 경험치 status bar width 정하는 함수

  let whatLevel;
  if (0 <= state.userInfo.experience && state.userInfo.experience < 100) {
    whatLevel = '실버';
  } else if (
    100 <= state.userInfo.experience &&
    state.userInfo.experience < 200
  ) {
    whatLevel = '골드';
  } else {
    whatLevel = '다이아';
  } // 나타낼 레벨 정하기

  return (
    <UserInfoWrap>
      <UserInfoLevel>
        <div id='levelProfile'>
          <div id='profileImg'></div>
        </div>
        <div id='levelWrap'>
          <div id='levelInfo'>
            <p>
              {whatLevel} ({state.userInfo.experience}exp) 레벨 입니다.
            </p>
            <UserInfoProgress>
              <div id='barStyle' style={barWidth}></div>
            </UserInfoProgress>
          </div>
        </div>
      </UserInfoLevel>
      <UserInfoData>
        <div id='userInfo'>
          <p>{state.userInfo.username}</p>
          <p>{state.userInfo.email}</p>
          <button id='userInfoEditBtn'>
            <Link to='/mypageEdit'>수정하기</Link>
          </button>
        </div>
      </UserInfoData>
    </UserInfoWrap>
  );
}

export default UserInfo;

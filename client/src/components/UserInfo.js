// Mypage 안에서 유저 정보 나타날 부분
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import basicProfile from '../images/basic_profileImg.svg';
import diaProfile from '../images/master_profile.svg';

const UserInfoWrap = styled.div`
  width: 100%;
  flex: 3 1 auto;
  // 콘텐츠 전체 길이 생각해서 후에 max 설정해주기
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
`;
const UserInfoLevel = styled.div`
  flex: 3 1 auto;
  height: max(350px, 100%);
  display: grid;
  place-items: center;
  > #levelProfile {
    width: 200px;
    height: 200px;
    background: url(${diaProfile}) no-repeat;
    margin: 0 auto;
    display: flex;
    align-items: center;
    > #profileImg {
      /* width: 130px;
      height: 130px; */
      border-radius: 300px;
      margin: 0 auto;
      background: url(${basicProfile}); // 주림마에서 기본적으로 제공하는 img
      background-repeat: no-repeat;
      background-size: cover;
      @media only screen and (max-width: 1399px) {
        width: 80px;
        height: 80px;
      }
    }
  }
`; // 유저 사진 및 레벨 정보
const UserInfoData = styled.div`
  flex: 1 1 auto;
`; // 유저 개인 정보

function UserInfo() {
  return (
    <UserInfoWrap>
      <UserInfoLevel>
        <div id='levelProfile'>
          <div id='profileImg'></div>
        </div>
        <div id='levelWrap'>현재 ~~ 레벨입니다</div>
      </UserInfoLevel>
      <UserInfoData>
        <div id='userInfo'>
          <p>김코딩</p>
          <p>kimcoding@gmail.com</p>
        </div>
        <button id='userInfoEditBtn'>
          <Link to='/mypageEdit'>수정하기</Link>
        </button>
      </UserInfoData>
    </UserInfoWrap>
  );
}

export default UserInfo;

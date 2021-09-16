// EditMyPage에서 유저 정보 변경하는 부분
import styled from 'styled-components';
const EditUserInfoWrap = styled.div`
  width: 900px;
  height: 580px;
  display: flex;
  align-items: center;
  background-color: #b4aee8;
  border-radius: 30px;
  @media only screen and (max-width: 1399px) {
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
    height: 600px;
  }
`;

const OldUserName = styled.div`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  background-color: #440a67;
  text-align: center;
  line-height: 60px;
  color: #fff;
  border-radius: 20px;
  @media only screen and (max-width: 400px) {
    font-size: 14px;
  }
  > span {
    color: #fff;
    font-size: 13px;
    @media only screen and (max-width: 400px) {
      font-size: 11px;
    }
  }
`;

const EditUserInfoBox = styled.div`
  width: 60%;
  margin: 0 auto;
  > #buttonWrap {
    width: 430px;
    margin: 0 auto;
    margin-top: 30px;
    @media only screen and (max-width: 1000px) {
      width: 80%;
    }
    > button {
      width: 200px;
      height: 50px;
      margin-left: 30px;
      border-radius: 50px;
      background-color: #fff;
      cursor: pointer;
      transition: 0.3s;
      color: #440a67;
      :hover {
        background-color: #230638;
        color: #fff;
      }
      @media only screen and (max-width: 1000px) {
        width: 48%;
        margin-left: 4%;
      }
    }
    > button:nth-child(1) {
      margin-left: 0;
      background-color: #440a67;
      color: #fff;
      transition: 0.5s;
      :hover {
        background-color: #230638;
      }
    }
  }
  > input {
    width: 100%;
    height: 50px;
    outline: none;
    font-size: 15px;
    background-color: transparent;
    border-bottom: 2px solid #fff;
    margin-top: 30px;
    @media only screen and (max-width: 400px) {
      font-size: 11px;
    }
  }
  > #rePasswordWrap {
    margin-top: 30px;
    width: 100%;
    margin: 0 auto;
    /* display: flex;
    justify-content: space-between;
    flex-wrap: wrap; */
    > input {
      display: inline-block;
      width: 48%;
      margin-left: 4%;
      height: 50px;
      margin-top: 30px;
      background-color: transparent;
      border-bottom: 2px solid #fff;
      font-size: 15px;
      outline: none;
      @media only screen and (max-width: 1000px) {
        width: 100%;
        margin-left: 0;
      }
      @media only screen and (max-width: 400px) {
        font-size: 11px;
      }
    }
    > input:nth-child(1) {
      margin-left: 0;
    }
  }
`;

function EditUserInfo() {
  // EditUserInfo에서 버튼이 눌리면 유저 정보 state 업데이트 + axios 요청
  return (
    <EditUserInfoWrap>
      <EditUserInfoBox>
        <OldUserName>
          김코딩<span>님, 수정을 원하시나요?</span>
        </OldUserName>
        <input placeholder='변경할 이름을 입력하세요'></input>
        <input placeholder='기존 비밀번호를 입력하세요'></input>
        <div id='rePasswordWrap'>
          <input placeholder='변경할 비밀번호를 입력하세요'></input>
          <input placeholder='변경할 비밀번호를 다시 입력하세요'></input>
        </div>

        <div id='buttonWrap'>
          <button>저장하기</button>
          <button>취소하기</button>
        </div>
      </EditUserInfoBox>
    </EditUserInfoWrap>
  );
}

export default EditUserInfo;

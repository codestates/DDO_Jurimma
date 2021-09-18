// EditMyPage에서 유저 정보 변경하는 부분
import styled, { keyframes } from 'styled-components';

const colorAni = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const EditUserInfoWrap = styled.div`
  width: 900px;
  height: 580px;
  display: flex;
  align-items: center;
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
  animation: ${colorAni} 10s ease infinite;
  background: linear-gradient(-45deg, #3fc1ff, #d42aff);
  background-size: 200% 100%;
  text-align: center;
  line-height: 60px;
  color: #fff;
  border-radius: 20px;
  border: 2px solid #fff;
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
      @media only screen and (max-width: 1000px) {
        width: 48%;
        margin-left: 4%;
      }
    }
    > button:nth-child(1) {
      margin-left: 0;
      background: linear-gradient(-45deg, #3fc1ff, #d42aff);
      color: #fff;
      border: 2px solid #fff;
      :hover {
        background: linear-gradient(-45deg, #ddd, #3fc1ff, #d42aff);
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
    color: #fff;
    padding-left: 5px;
    @media only screen and (max-width: 400px) {
      font-size: 11px;
    }
  }
  > input:focus::-webkit-input-placeholder {
    color: transparent;
  }
  > input:hover::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #fff;
    transition: 0.3s;
  }
  > #rePasswordWrap {
    margin-top: 30px;
    width: 100%;
    margin: 0 auto;
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
      color: #fff;
      padding-left: 5px;
      @media only screen and (max-width: 1000px) {
        width: 100%;
        margin-left: 0;
      }
      @media only screen and (max-width: 400px) {
        font-size: 11px;
      }
    }
    > input:focus::-webkit-input-placeholder {
      color: transparent;
    }
    > input:hover::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #fff;
      transition: 0.3s;
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
          <button>쉬소하기</button>
        </div>
      </EditUserInfoBox>
    </EditUserInfoWrap>
  );
}

export default EditUserInfo;

// EditMyPage에서 사진 변경 일어나는 부분
import styled from 'styled-components';
import basicProfile from '../images/basic_profileImg.svg';
import {
  setSignOutModal,
  setAccessToken,
  setLogout,
  setUserInfo,
} from '../actions/index';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import silverProfile from '../images/junior_profile.svg';
import goldProfile from '../images/senior_profile.svg';
import diaProfile from '../images/master_profile.svg';
import axios from 'axios';
import swal from 'sweetalert';
axios.defaults.withCredentials = true;

const EditUserPicWrap = styled.div`
  width: 450px; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  height: 100%;
  box-sizing: border-box;
  @media only screen and (max-width: 1399px) {
    width: 100%;
  }
  > button {
    display: block;
    width: 150px;
    height: 40px;
    margin: 0 auto;
    margin-top: 90px;
    background-color: transparent;
    color: #b61919;
    cursor: pointer;
    border: 2px solid #b61919;
    border-radius: 50px;
    transition: 0.3s;
    :hover {
      border: 2px solid #b61919;
      background-color: #b61919;
      color: #fff;
    }
    @media only screen and (max-width: 1399px) {
      margin-top: 70px;
    }
  }
`;

const ProfileChange = styled.div`
  width: 450px;
  height: 450px;
  margin: 0 auto;
  @media only screen and (max-width: 1399px) {
    height: 300px;
    width: 300px;
  }
  > #profileBtnWrap {
    width: 300px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -40px;
    > button {
      display: block;
      width: 150px;
      height: 40px;
      margin: 0 auto;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      border: 2px solid #fff;
      border-radius: 50px;
      transition: 0.3s;
      margin-left: 20px;
      :hover {
        border: 2px solid #fff;
        background-color: #fff;
        color: #440a67;
      }
      > input {
        opacity: 0;
        width: 150px;
        height: 40px;
        position: absolute;
        background-color: #000;
        margin-left: -110px;
        margin-top: -12px;
      }
    }

    > button:nth-child(1) {
      margin-left: 0;
    }
  }
`;

const ProfileImgWrap = styled.div`
  background-color: red;
  width: 450px;
  height: 450px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1399px) {
    height: 300px;
    width: 300px;
  }
  > #profileImg {
    width: 130px;
    height: 130px;
    border-radius: 300px;
    margin: 0 auto;
    background-repeat: no-repeat;
    @media only screen and (max-width: 1399px) {
      width: 80px;
      height: 80px;
    }
  }
`;

function EditUserPic() {
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  const openSignoutModal = (isOpen) => {
    dispatch(setSignOutModal(isOpen));
  }; // 회원탈퇴 모달 여는 함수
  const state = useSelector((state) => state.userInfoReducer);

  const [newImg, setNewImg] = useState({}); // 유저가 로컬에서 업로드한 프로필 이미지

  let whatProfile;
  if (0 <= state.userInfo.experience && state.userInfo.experience < 100) {
    whatProfile = silverProfile;
  } else if (
    100 <= state.userInfo.experience &&
    state.userInfo.experience < 200
  ) {
    whatProfile = goldProfile;
  } else {
    whatProfile = diaProfile;
  } // 나타낼 레벨 정하기

  const changeProfileBtn = () => {
    // 로컬에서 선택한 사진 파일을 마이페이지 상에 미리보기로 띄움
    const file = document.querySelector('input[type=file]').files;
    console.log(file.value);
    console.log(file);
    // const imageSRC = URL.createObjectURL(file);
    // const profileImg = document.querySelector('#profileImg');
    // profileImg.style.backgroundImage = `url(${imageSRC})`;
    // profileImg.style.backgroundSize = 'cover';
    // setNewImg(file);
    // console.log(newImg);
  };

  const sendImgToServer = async () => {
    // 선택한 파일을 서버로 axios 요청을 보내 유저 db의 userPic 업데이트
    console.log(newImg);
    let formData = new FormData();
    formData.append('lastModified', newImg.lastModified);
    formData.append('lastModifiedDate', newImg.lastModifiedDate);
    formData.append('name', newImg.name);
    formData.append('size', newImg.size);
    formData.append('type', newImg.type);
    formData.append('webkitRelativePath', newImg.webkitRelativePath);

    console.log(formData);
    const imageRes = await axios.patch(`${url}/user/image`, formData, {
      headers: { authorization: `Bearer ${state.accessToken}` },
    });

    console.log(imageRes);
  };

  return (
    <EditUserPicWrap>
      <ProfileChange>
        <ProfileImgWrap
          style={{
            background: `url(${whatProfile})`,
            backgroundSize: 'cover',
          }}
        >
          <div
            id='profileImg'
            style={
              state.userInfo.userPic
                ? {
                    backgroundImage: `url(${state.userInfo.userPic})`,
                    backgroundSize: 'cover',
                  }
                : {
                    backgroundImage: `url(${basicProfile})`,
                    backgroundSize: 'cover',
                  }
            }
          ></div>
        </ProfileImgWrap>
        <div id='profileBtnWrap'>
          <button>
            프로필 바꾸기
            <input
              type='file'
              id='image_uploads'
              name='image'
              accept='image/*'
              value=''
              onChange={() => changeProfileBtn()}
            ></input>
          </button>

          <button onClick={() => sendImgToServer()}>프로필 저장하기</button>
        </div>
      </ProfileChange>
      <button onClick={() => openSignoutModal(true)}>회원탈퇴 하기</button>
    </EditUserPicWrap>
  );
}

export default EditUserPic;

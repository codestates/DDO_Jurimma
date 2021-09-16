// EditMyPage에서 사진 변경 일어나는 부분
import styled from 'styled-components';
import basicProfile from '../images/basic_profileImg.svg';
import { setSignOutModal } from '../actions/index';
import { useDispatch } from 'react-redux';

const EditUserPicWrap = styled.div`
  width: 400px; // 콘텐츠 전체 길이 생각해서 후에 수정해주기
  height: 100%;
  border: 1px solid red;
  box-sizing: border-box;
  @media only screen and (max-width: 1399px) {
    width: 100%;
    background-color: blue;
  }
  > button {
    display: block;
    width: 150px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 50px;
  }
`;

const ProfileChange = styled.div`
  width: 100%;
  height: 370px;
  > #profileImg {
    width: 250px;
    height: 250px;
    border-radius: 300px;
    margin: 0 auto;
    background: url(${basicProfile}); // 주림마에서 기본적으로 제공하는 img
    background-repeat: no-repeat;
    background-size: cover;
  }
  > button {
    display: block;
    width: 200px;
    height: 50px;
    margin: 0 auto;
    margin-top: 40px;
  }
`;

function EditUserPic() {
  const dispatch = useDispatch();
  const openSignoutModal = (isOpen) => {
    dispatch(setSignOutModal(isOpen));
    console.log(setSignOutModal);
  }; // 회원탈퇴 모달 여는 함수

  return (
    <EditUserPicWrap>
      <ProfileChange>
        <div id='profileImg'></div>
        <button>프로필 사진 바꾸기</button>
      </ProfileChange>
      <button onClick={() => openSignoutModal(true)}>회원탈퇴 하기</button>
    </EditUserPicWrap>
  );
}

export default EditUserPic;

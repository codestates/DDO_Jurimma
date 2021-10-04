// 개인정보 변경 페이지
import styled from 'styled-components';
import EditUserInfo from '../components/EditUserInfo';
import EditUserPic from '../components/EditUserPic';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const MypageEditWrap = styled.div`
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  flex-wrap: wrap;
  margin-top: 150px;
  @media only screen and (max-width: 1399px) {
    width: 80vw;
  }
  @media only screen and (max-width: 400px) {
    margin-top: 40px;
  }
`;

function MypageEdit() {
  const state = useSelector((state) => state.userInfoReducer);
  const history = useHistory();

  useEffect(() => {
    if (state.userInfo.id === -1) {
      history.push('/main');
      window.scrollTo(0, 0);
    }
  }, [state, history]);

  return (
    <>
      <MypageEditWrap>
        <EditUserPic />
        <EditUserInfo />
      </MypageEditWrap>
    </>
  );
}

export default MypageEdit;

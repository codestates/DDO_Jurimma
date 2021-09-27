import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContentModal } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

const SearchResultWrap = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  > .wordResultList {
    width: 100%;
    min-height: 250px;
    height: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    @media only screen and (max-width: 800px) {
      flex-direction: column;
      padding: 20px 0px;
    }
    > li {
      flex: none;
      width: 30%;
      height: 230px;
      border-radius: 30px;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      background-color: #230638;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      border: 2px solid #fff;
      color: #fff;
      margin-right: 10px;
      > p {
        color: #fff;
        @media only screen and (max-width: 800px) {
          display: grid;
          place-items: center;
        }
      }
      @media only screen and (max-width: 800px) {
        /* flex: 1 0 auto; */
        font-size: 14px;
        width: 80%;
        height: 150px;
        flex-direction: row;
        margin-right: 0;
        margin-bottom: 20px;
        justify-content: space-around;
        > p:nth-child(1) {
          width: max(50px, 15%);
        }
        > p:nth-child(2) {
          width: max(150px, 70%);
          font-size: 12px;
        }
      }
      > .wordThumbsup {
        > div {
          background-color: #fff;
          width: max(35px, 5vh);
          height: max(35px, 5vh);
          border-radius: max(35px, 5vh);
          margin: 0 auto;
          display: grid;
          place-items: center;
          > p {
            color: #230638;
          }
        }
        @media only screen and (max-width: 800px) {
          width: max(50px, 15%);
          display: grid;
          place-items: center;
        }
      }
    }
    > li:last-child {
      margin-right: 0px;
      @media only screen and (max-width: 800px) {
        margin-bottom: 0px;
      }
    }
  }
`;

const BtnWrap = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  width: 50%;
  margin: 0 auto;
  > .newOrSearchBtn {
    cursor: pointer;
    margin-top: 40px;
    border-radius: 50px;
    width: 40%;
    height: 50px;
    transition: 0.3s;
    background-color: #fff;
    color: #440a67;
    @media only screen and (max-width: 800px) {
      width: 130px;
    }
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
`;

function SearchResult({ wordResult, notSearched }) {
  const state = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const openNewContentModal = (isOpen) => {
    dispatch(setNewContentModal(isOpen));
  };
  const showLogin = () => {
    swal({
      title: '로그인이 필요합니다.',
      text: '로그인 후 더보기 페이지를 이용할 수 있습니다.',
      icon: 'warning',
    });
  };

  return (
    <SearchResultWrap>
      {notSearched ? null : (
        <>
          {wordResult.length !== 0 ? (
            <>
              <ul className='wordResultList'>
                {wordResult.map((res) => {
                  return (
                    <li key={res.id} className='wordResultData'>
                      <p>{res.wordName}</p>
                      <p>
                        {res.wordMean.length > 50
                          ? `${res.wordMean.slice(0, 50)}...`
                          : res.wordMean}
                      </p>
                      <div className='wordThumbsup'>
                        <div>
                          <FontAwesomeIcon icon={faThumbsUp} />
                          <p>{res.thumbsup.length}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <BtnWrap>
                <button
                  className='newOrSearchBtn'
                  onClick={state.isLogin ? null : showLogin}
                >
                  {state.isLogin ? (
                    <Link
                      to={`/searchMore?wordName=${encodeURIComponent(
                        wordResult[0].wordName
                      )}`}
                    >
                      더보기
                    </Link>
                  ) : (
                    '더보기'
                  )}
                </button>
              </BtnWrap>
            </>
          ) : (
            <>
              <ul className='wordResultList'>
                <li>
                  아직 뜻이 없네요! <br />
                  새로 작성하시겠어요?
                </li>
              </ul>

              <BtnWrap>
                <button
                  className='newOrSearchBtn'
                  onClick={() => openNewContentModal(true)}
                >
                  새글쓰기
                </button>
              </BtnWrap>
            </>
          )}
        </>
      )}
    </SearchResultWrap>
  );
}

export default SearchResult;

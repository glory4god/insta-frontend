import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import s from '../CommonModal.module.css';

import { selectProfile } from 'lib/redux/profile/profileSlice';
import { selectLogin } from 'lib/redux/login/loginSlice';
import { setModalInitial } from 'lib/redux/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import Button from '@material-ui/core/Button';

import { ProfileImage } from 'components/profile';

import cn from 'classnames';
import { ModalDataType } from 'types/modal/types';
import { idInListChecker } from 'lib/common';

interface ModalProps {
  modalData: ModalDataType[];
}

const Modal: React.FC<ModalProps> = ({ modalData }) => {
  const { myUserInfo } = useSelector(selectLogin);
  const { userData } = useSelector(selectProfile);
  const dispatch = useDispatch();
  const router = useRouter();

  const closeModal = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.preventDefault();
    dispatch(setModalInitial());
  };

  const isMe = myUserInfo.id === userData.id;

  const followCheck: boolean = idInListChecker(
    myUserInfo.follower,
    myUserInfo.id,
  );

  const followerHandler = async (id: string, state: string) => {
    // TODO: 팔로우하기/취소하기 api 기능 추가
    if (state === 'follow') {
    } else if (state === 'cancel') {
    }
  };
  return (
    <>
      <div className={s.outerContainer_2} onClick={closeModal} />
      <div className={s.innerContainer_2}>
        {modalData.length === 1 ? (
          <>
            <div className={s.header2_bt}>
              {modalData[0].link === undefined ? (
                <div>
                  <p>
                    <b>{modalData[0].name}</b>
                  </p>
                </div>
              ) : (
                <Link href={modalData[0].link}>
                  <a>
                    <p>
                      <b>{modalData[0].name}</b>
                    </p>
                  </a>
                </Link>
              )}
            </div>
            <CloseSharpIcon
              onClick={closeModal}
              className={s.out2}
              fontSize="large"
            />
            {/* TODO: 테스트 데이터 만든 후에 방법적용 (팔로워 누를 때 모달)*/}
            {modalData[0].name === '팔로워' && (
              <>
                {userData.follower.map((p, idx) => {
                  return (
                    <div
                      key={userData.id + 'follower' + idx}
                      className={s.content2}>
                      <div>
                        <ProfileImage size={'board'} imageUrl={p.imageUrl} />
                        <div>
                          <span>
                            <b>{p.id}</b>
                            {!idInListChecker(myUserInfo.follower, p.id) &&
                              isMe && (
                                <span style={{ color: '#2294ff' }}>
                                  · <b>팔로우</b>
                                </span>
                              )}
                          </span>
                          <span style={{ color: 'rgb(140,140,140)' }}>
                            {p.name}
                          </span>
                        </div>
                      </div>
                      {/*TODO: 내 상태알 때, 나랑 팔로워 상태인지 아닌지에 따른 결과보여주는 로직 짜야함*/}
                      {p.id === myUserInfo.id ? (
                        <></>
                      ) : isMe ? (
                        <Button
                          size="small"
                          variant="outlined"
                          style={{
                            height: '28px',
                          }}
                          onClick={() => followerHandler(p.id, '')}>
                          <b>삭제</b>
                        </Button>
                      ) : followCheck ? (
                        <Button
                          size="small"
                          variant="outlined"
                          style={{
                            height: '28px',
                          }}
                          onClick={() => followerHandler(p.id, '')}>
                          <b>팔로잉</b>
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          style={{
                            height: '28px',
                            color: 'white',
                            backgroundColor: '#2294ff',
                          }}
                          onClick={() => followerHandler(p.id, '')}>
                          <b>팔로우</b>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </>
            )}
            {/* 팔로우 누를 때 모달 */}
            {modalData[0].name === '팔로우' && (
              <>
                {userData.following.map((p, idx) => {
                  return (
                    <div
                      key={userData.id + 'follwing' + idx}
                      className={s.content2}>
                      <div>
                        <ProfileImage size={'board'} imageUrl={p.imageUrl} />
                        <div>
                          <span>
                            <b>{p.id}</b>
                          </span>
                        </div>
                      </div>
                      {/*TODO: 내 상태알 때, 나랑 팔로우 상태인지 아닌지에 따른 결과보여주는 로직 짜야함*/}
                      {p.id === myUserInfo.id ? (
                        <>/</>
                      ) : idInListChecker(myUserInfo.following, p.id) ? (
                        <Button
                          size="small"
                          variant="outlined"
                          style={{
                            height: '28px',
                          }}
                          onClick={() => followerHandler(p.id, '')}>
                          <b>팔로잉</b>
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          style={{
                            height: '28px',
                            color: 'white',
                            backgroundColor: '#2294ff',
                          }}
                          onClick={() => followerHandler(p.id, '')}>
                          <b>팔로우</b>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <>
            {modalData.map((arr, idx) => {
              return (
                <div
                  className={cn(
                    modalData.length - 1 !== idx ? s.header2_bt : s.header2,
                  )}
                  style={{ fontSize: '14px' }}
                  key={arr.name + idx}
                  onClick={arr.onClick}>
                  <a
                    style={{ color: arr.color }}
                    onClick={() => {
                      if (arr.link !== undefined) {
                        router.replace(arr.link);
                      }
                    }}>
                    <p>{arr.name}</p>
                  </a>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Modal;

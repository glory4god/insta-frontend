import React from 'react';
import Link from 'next/link';
import s from './UserInfo.module.css';

import ProfileImage from '../ProfileImage';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

import { formatNumber } from 'lib/common';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from 'lib/redux/profile/profileSlice';
import { setModal } from 'lib/redux/modal/modalSlice';

interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = ({}) => {
  const { userData } = useSelector(selectProfile);
  const dispatch = useDispatch();

  return (
    <>
      <div className={s.container}>
        <ProfileImage
          border={false}
          size={'profile'}
          imageUrl={userData.imageUrl}
        />
        <div className={s.pcinfo}>
          <div className={s.tit01}>
            <div>{userData.id}</div>
            <div>
              <Link href="/accounts/edit">
                <a>
                  <Button size="small" variant="outlined">
                    <b>프로필 편집</b>
                  </Button>
                </a>
              </Link>
            </div>

            <a onClick={() => dispatch(setModal('setting', true))}>
              <SettingsIcon
                style={{ cursor: 'pointer' }}
                color="disabled"
                fontSize="medium"
              />
            </a>
          </div>
          <div className={s.tit02}>
            <p>
              게시물 <span>{formatNumber(userData.board)}</span>
            </p>
            <a>
              <p onClick={() => dispatch(setModal('followers', true))}>
                팔로워 <span>{formatNumber(userData.follower)}</span>
              </p>
            </a>
            <a>
              <p onClick={() => dispatch(setModal('followings', true))}>
                팔로우 <span>{formatNumber(userData.following)}</span>
              </p>
            </a>
          </div>
          {/* ///FIXME: 어떤형식의 데이터인지 확인후 변경 */}
          <div className={s.tit03}>
            <b>{userData.name}</b>
          </div>
          <div className={s.tit03}>{userData.introduce}</div>
          <a
            className={s.tit03}
            onClick={() => {
              var win = window.open(`http://${userData.webSite}`);
              if (win !== null) {
                win.focus();
              }
            }}>
            <b>{userData.webSite}</b>
          </a>
        </div>
      </div>
      <div className={s.mobiletit03}>
        <b>{userData.name}</b>
      </div>
      <div className={s.mobiletit03}>{userData.introduce}</div>
      <a
        className={s.mobiletit03}
        onClick={() => {
          var win = window.open(`http://${userData.webSite}`);
          if (win !== null) {
            win.focus();
          }
        }}>
        <b>{userData.webSite}</b>
      </a>
      <div className={s.mobile}>
        <span>
          <div>게시물</div>
          {formatNumber(userData.board)}
        </span>
        <span>
          <div onClick={() => dispatch(setModal('followers', true))}>
            팔로워
          </div>
          {formatNumber(userData.follower)}
        </span>
        <span>
          <div onClick={() => dispatch(setModal('followings', true))}>
            팔로우
          </div>
          {formatNumber(userData.following)}
        </span>
      </div>
    </>
  );
};

export default React.memo(UserInfo);

import React from 'react';
import s from './UserInfo.module.css';

import ProfileImage from '../ProfileImage';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

import type { UserData } from 'types/profile/types';

interface UserInfoProps {
  data: UserData;
}

const UserInfo: React.FC<UserInfoProps> = ({ data }) => {
  return (
    <>
      <div className={s.container}>
        <ProfileImage
          border={false}
          size={'profile'}
          imageUrl={data.imageUrl}
        />
        <div className={s.pcinfo}>
          <div className={s.tit01}>
            <div>{data.id}</div>
            <div>
              <Button size="small" variant="outlined">
                <b>프로필 편집</b>
              </Button>
            </div>
            <SettingsIcon color="disabled" fontSize="large" />
          </div>
          <div className={s.tit02}>
            <p>
              게시물 <span>{formatNumber(data.board)}</span>
            </p>
            <p>
              팔로워 <span>{formatNumber(data.follower)}</span>
            </p>
            <p>
              팔로우 <span>{formatNumber(data.following)}</span>
            </p>
          </div>
          {/* FIXME: 어떤형식의 데이터인지 확인후 변경 */}
          <div className={s.tit03}>
            <b>{data.name}</b>
          </div>
          <div className={s.tit03}>{data.introduce}</div>
        </div>
      </div>
      <div className={s.mobiletit03}>
        <b>{data.name}</b>
      </div>
      <div className={s.mobiletit03}>{data.introduce}</div>
      <div className={s.mobile}>
        <span>
          <div>게시물</div>
          {formatNumber(data.board)}
        </span>
        <span>
          <div>팔로워</div>
          {formatNumber(data.follower)}
        </span>
        <span>
          <div>팔로우</div>
          {formatNumber(data.following)}
        </span>
      </div>
    </>
  );
};

export default UserInfo;

const formatNumber = (n: number) => {
  if (n < 10000) {
    return n;
  } else if (n < 1000000) {
    return Math.ceil(n / 100) / 10 + '천';
  } else {
    return Math.ceil(n / 100000) / 10 + '백만';
  }
};

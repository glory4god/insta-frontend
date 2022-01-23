import React from 'react';
import s from '../AccountCommon.module.scss';
import Link from 'next/link';

import ProfileInput from 'components/ui/Input/ProfileInput';
import { PasswordEdit } from 'types/accounts/types';
import { ProfileImage } from 'components/profile';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import axios from 'axios';
import { NEXT_SERVER } from 'config';

const AccountPassword = () => {
  const { userInfo } = useSelector(selectUser);
  const [password, setPassword] = React.useState<PasswordEdit>({
    prev: '',
    new: '',
    validation: '',
  });

  const submitPassword = () => {
    axios
      .post(`${NEXT_SERVER}/v1/user/password`, password, {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((response) => {
        alert('비밀번호 변경을 성공하였습니다.');
        setPassword({
          prev: '',
          new: '',
          validation: '',
        });
      })
      .catch((err) => {
        alert('비밀번호 변경을 실패하였습니다.');
        console.log(err.response.data);
      });
  };

  return (
    <>
      <div className={s.header}>
        <div className={cn(s.tit, s.profile)}>
          <ProfileImage size="m" imageUrl={userInfo.profileImageUrl} />
        </div>
        <div className={s.content}>
          <span style={{ fontSize: '1.5rem' }}>{userInfo.username}</span>
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>이전 비밀번호</div>
        <div className={s.content}>
          <ProfileInput
            size="m"
            value={password.prev}
            backgroundColor={true}
            type={'password'}
            onChange={(e) => {
              setPassword({
                ...password,
                prev: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>새 비밀번호</div>
        <div className={s.content}>
          <ProfileInput
            size="m"
            value={password.new}
            backgroundColor={true}
            type={'password'}
            onChange={(e) => {
              setPassword({
                ...password,
                new: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>새 비밀번호 확인</div>
        <div className={s.content}>
          <ProfileInput
            size="m"
            value={password.validation}
            backgroundColor={true}
            type={'password'}
            onChange={(e) => {
              setPassword({
                ...password,
                validation: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className={s.editbox} style={{ marginTop: '16px' }}>
        <div className={s.tit}></div>
        {/* FIXME: 셀렉트 박스형식으로 성별 선택하는거로 바뀌면 좋을듯   =>  셀렉트 박스로 해결  */}
        <div className={s.content}>
          <div className={s.submit}>
            <button onClick={submitPassword}>제출</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPassword;

import React from 'react';
import s from '../AccountCommon.module.css';
import Link from 'next/link';

import ProfileInput from 'components/ui/Input/ProfileInput';
import { PasswordEdit } from 'types/accounts/types';
import { ProfileImage } from 'components/profile';
import cn from 'classnames';

const AccountPassword = () => {
  const [password, setPassword] = React.useState<PasswordEdit>({
    prev: '',
    new: '',
    validation: '',
  });

  return (
    <>
      {console.log(password)}
      <div className={s.header}>
        <div className={cn(s.tit, s.profile)}>
          <ProfileImage size="m" imageUrl={'/profile/winter.png'} />
        </div>
        <div className={s.content}>
          <span style={{ fontSize: '1.5rem' }}>yhy_814</span>
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
    </>
  );
};

export default AccountPassword;

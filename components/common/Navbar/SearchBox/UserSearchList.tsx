import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import s from './UserSearchList.module.css';
import { ProfileImage } from 'components/profile';

import { BaseUser3 } from 'types/profile/types';

interface UserSearchListProps {
  userList: BaseUser3[];
  closeModal: () => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  userList,
  closeModal,
}) => {
  const router = useRouter();

  return (
    <div className={s.wrapper}>
      <h4>유저 목록</h4>
      {userList.map((user) => {
        return (
          <Link href={`/${user.id}`} key={user.name}>
            <a className={s.userBox} onClick={closeModal}>
              <ProfileImage imageUrl={user.imageUrl} size="m" />
              <div>
                <span>
                  <b>{user.id}</b>
                </span>
                <span style={{ color: 'rgb(120,120,120)', fontSize: '14px' }}>
                  {user.name}
                </span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default UserSearchList;

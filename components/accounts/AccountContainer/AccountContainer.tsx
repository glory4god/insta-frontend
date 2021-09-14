import React from 'react';
import { AccountLMB, AccountEdit } from '..';
import AccountManage from '../AccountManage';
import AccountPassword from '../AccountPassword';
import s from './AccountContainer.module.css';

interface AccountProps {
  page: string;
}

const AccountContainer: React.FC<AccountProps> = ({ page }) => {
  return (
    <div className={s.container}>
      <div className={s.lmb}>
        <AccountLMB />
      </div>
      <div className={s.rightScreen}>
        {page === 'edit' && <AccountEdit />}
        {page === 'password_change' && <AccountPassword />}
        {page === 'manage_access' && <AccountManage />}
      </div>
    </div>
  );
};

export default AccountContainer;

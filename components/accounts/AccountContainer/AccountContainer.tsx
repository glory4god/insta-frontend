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
      <AccountLMB />
      {page === 'edit' && <AccountEdit />}
      {page === 'password_change' && <AccountPassword />}
      {page === 'manage_access' && <AccountManage />}
    </div>
  );
};

export default AccountContainer;

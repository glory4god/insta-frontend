import React from 'react';
import Link from 'next/link';
import s from './AccountLMB.module.css';

import {
  getAccountsIds,
  getAccountsValues,
} from 'lib/redux/accounts/accountsApis';
import { useRouter } from 'next/dist/client/router';

const AccountLMB = ({}) => {
  const pages = useRouter();
  const valueList = getAccountsValues();
  const keyList = getAccountsIds();

  return (
    <div className={s.lmb}>
      {valueList.map((arr, idx) => {
        return (
          <Link href={`/accounts/${keyList[idx]}`} key={arr}>
            <a
              className={s.linktag}
              style={{
                borderLeft: `${
                  pages.asPath === `/accounts/${keyList[idx]}`
                    ? '2px solid black'
                    : ''
                }`,
                fontWeight: `${
                  pages.asPath === `/accounts/${keyList[idx]}`
                    ? 'bold'
                    : 'normal'
                }`,
              }}>
              <span>{arr}</span>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountLMB;

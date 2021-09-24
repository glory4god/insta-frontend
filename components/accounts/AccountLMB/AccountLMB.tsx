import React from 'react';
import Link from 'next/link';
import s from './AccountLMB.module.css';

import { accountMenuBar } from 'lib/redux/accounts/accountsApis';
import { useRouter } from 'next/dist/client/router';

const AccountLMB = ({}) => {
  const pages = useRouter();

  return (
    <>
      {accountMenuBar.map((arr) => {
        return (
          <Link href={arr.link} key={arr.name}>
            <a
              className={s.linktag}
              style={{
                borderLeft: `${pages.asPath === arr.link}
                    ? '2px solid black'
                    : ''
                }`,
                fontWeight: `${pages.asPath === arr.link ? 'bold' : 'normal'}`,
              }}>
              <span>{arr.name}</span>
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default AccountLMB;

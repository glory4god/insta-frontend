import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getAccountsIds } from 'lib/redux/accounts/accountsApis';

import { AccountContainer } from 'components/accounts';
import Container from 'components/ui/Container';

import { ParsedUrlQuery } from 'querystring';

const Accounts = ({ currerntPages }: { currerntPages: string }) => {
  return (
    <>
      <Head>
        <title>프로필 편집 instagram 사진 및 동영상</title>
        <meta name="" content=""></meta>
      </Head>
      <Container>
        <AccountContainer page={currerntPages} />
      </Container>
    </>
  );
};

export default Accounts;

interface IParams extends ParsedUrlQuery {
  profile: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const arr = getAccountsIds() as string[];
  const paths = arr.map((accounts) => {
    return {
      params: { accounts },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const { accounts } = context.params as IParams;
  const currerntPages = accounts;

  return {
    props: { currerntPages },
  };
};

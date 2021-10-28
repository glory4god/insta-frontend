import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { getUserBoard } from 'lib/redux/profile/profileApis';
import { selectProfile } from 'lib/redux/profile/profileSlice';
import { setBoardData } from 'lib/redux/profile/profileSlice';
import { Board } from 'types/profile/types';
import { Container } from 'components/ui/Container';
import Footer from 'components/main/Footer';
import styled from '@emotion/styled';
import Post from 'components/main/Post';
import { LoginPage } from './login';

const Main = ({ boardData }: { boardData: Board[] }) => {
  const { login } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBoardData(boardData));
  }, []);
  return (
    <>
      <Head>
        <title>instagram</title>
        <meta name="description" content="instagram" />
      </Head>
      {login ? (
        <Container>
          <main>
            <Section>
              <div>
                {/* <div>스토리</div> */}
                {console.log(boardData)}
                {boardData.map((boardData, index) => {
                  return <Post key={index} postData={boardData} />;
                })}
              </div>
              <div>
                {/* <div>나</div> */}
                {/* <div>추천</div> */}
                <Footer />
              </div>
            </Section>
          </main>
        </Container>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Main;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      boardData: (await getUserBoard('winter')) as Board[],
    },
    revalidate: 1,
  };
};

const Section = styled.section`
  max-width: 935px;
  padding-top: 84px;
  display: flex;
  justify-content: center;
  & > div:first-of-type {
    float: left;
    margin-right: 28px;
    max-width: 614px;
    width: 100%;
    @media (max-width: 998px) {
      margin: 0;
    }
  }
  & > div:last-of-type {
    max-width: 293px;
  }
`;

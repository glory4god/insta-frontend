import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { getTotalBoards } from 'lib/redux/profile/profileApis';
import { selectProfile, setUserData } from 'lib/redux/profile/profileSlice';
import { setBoardData } from 'lib/redux/profile/profileSlice';
import { Board } from 'types/profile/types';
import { Container } from 'components/ui/Container';
import Footer from 'components/main/Footer';
import styled from '@emotion/styled';
import Post from 'components/main/Post';
import { LoginPage } from './login';

import axios from 'axios';
import { NEXT_SERVER } from 'config';
import { useState } from 'react';

const Main = ({}) => {
  const { login, userInfo } = useSelector(selectUser);
  const [mainData, setMainData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.accessToken) {
      axios
        .get(`${NEXT_SERVER}/test/main`, {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setMainData(response.data);
          // dispatch(setUserData(response.data));
        });
    }
  }, [userInfo]);
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
                {mainData.map((postData, index) => {
                  return (
                    <Post
                      key={index}
                      postData={postData}
                      setMainData={setMainData}
                      mainData={mainData}
                    />
                  );
                })}
              </div>
              <div>
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

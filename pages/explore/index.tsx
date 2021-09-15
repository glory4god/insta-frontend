import React from 'react';
import Head from 'next/head';
import { Container } from 'components/ui/Container';
import { GetStaticProps } from 'next';
import { getAllBoard } from 'lib/redux/explore/exploreApis';
import { BoardContainer } from 'components/profile';
import type { BoardData } from 'types/profile/types';
import { useDispatch } from 'react-redux';
import { setBoardData } from 'lib/redux/profile/profileSlice';

const Explore = ({ boardList }: { boardList: BoardData[] }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setBoardData(boardList));
  }, []);
  return (
    <>
      <Head>
        <title>instagram</title>
        <meta />
      </Head>
      <Container>
        <BoardContainer />
      </Container>
    </>
  );
};

export default Explore;

export const getStaticProps: GetStaticProps = async (context) => {
  const boardList = (await getAllBoard()) as BoardData[];
  return {
    props: { boardList },
  };
};

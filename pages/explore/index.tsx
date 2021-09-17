import React from 'react';
import Head from 'next/head';
import { Container } from 'components/ui/Container';
import { GetStaticProps } from 'next';
import { getAllBoard } from 'lib/redux/explore/exploreApis';
import { BoardContainer } from 'components/profile';
import type { Board, BoardData } from 'types/profile/types';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardData } from 'lib/redux/profile/profileSlice';
import { selectModal, setBoardModal } from 'lib/redux/modal/modalSlice';
import BoardModal from 'components/modal/BoardModal';

const Explore = ({ boardList }: { boardList: Board[] }) => {
  const { showBoardModal } = useSelector(selectModal);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setBoardData(boardList));
    dispatch(setBoardModal(false));
  }, []);
  return (
    <>
      <Head>
        <title>instagram</title>
        <meta />
      </Head>
      <Container modalOn={showBoardModal}>
        <BoardContainer className={'pt'} />
      </Container>
      {showBoardModal && <BoardModal />}
    </>
  );
};

export default Explore;

export const getStaticProps: GetStaticProps = async (context) => {
  const boardList = (await getAllBoard()) as Board[];
  return {
    props: { boardList },
  };
};

import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBoard } from 'lib/redux/explore/exploreApis';
import { setBoardData } from 'lib/redux/profile/profileSlice';
import {
  selectModal,
  setBoardModal,
  setModal,
  setModalInitial,
  setSelectBoard,
} from 'lib/redux/modal/modalSlice';

import { Container } from 'components/ui/Container';
import BoardModal from 'components/modal/BoardModal';
import { Modal } from 'components/modal';
import { BoardContainer } from 'components/profile';

import { ModalDataType } from 'types/modal/types';
import type { Board, UserBoards } from 'types/profile/types';

const Explore = ({ boardData }: { boardData: UserBoards }) => {
  const { selectedBoard, selectedReplyIdx, showModal, showBoardModal } =
    useSelector(selectModal);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setBoardData(boardData));
    dispatch(setBoardModal(false));
  }, []);

  const replyModal: ModalDataType[] = [
    {
      name: '삭제',
      link: undefined,
      color: 'red',
      onClick: () => {
        var board = selectedBoard;
        // TODO: restapi 연결시 api로 삭제할 인덱스 보내는 함수 작성
        // if (board !== undefined) {
        //   dispatch(
        //     setSelectBoard({
        //       ...board,
        //       reply: board.reply.filter((arr, idx) => {
        //         console.log(selectedReplyIdx, idx);
        //         if (idx !== selectedReplyIdx) {
        //           return arr;
        //         }
        //       }),
        //     }),
        //   );
        // }
        dispatch(setModalInitial());
      },
    },
    {
      name: '취소',
      link: undefined,
      onClick: () => dispatch(setModal('reply', false)),
    },
  ];

  return (
    <>
      <Head>
        <title>instagram</title>
        <meta />
      </Head>
      <Container modalOn={showBoardModal}>
        {/* <BoardContainer className={'pt'} /> */}
      </Container>
      {showBoardModal && <BoardModal />}
      {showModal.reply && <Modal modalData={replyModal} />}
    </>
  );
};

export default Explore;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const boardData = (await getAllBoard()) as UserBoards;

  return {
    props: {
      boardData,
    },
  };
};

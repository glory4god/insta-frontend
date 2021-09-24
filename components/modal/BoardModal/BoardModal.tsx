import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import s from '../CommonModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectModal,
  setBoardModal,
  setModal,
  setSelectBoard,
  setSelectedReplyIdx,
} from 'lib/redux/modal/modalSlice';

import { ProfileImage } from 'components/profile';

import cn from 'classnames';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { Reply } from 'types/profile/types';

interface BoardModalProps {}

const BoardModal: React.FC<BoardModalProps> = ({}) => {
  const { selectedBoard, selectedBoardUser } = useSelector(selectModal);
  const dispatch = useDispatch();

  const [reply, setReply] = React.useState<Reply>({
    name: '익명',
    imageUrl: '/profile/winter.png',
    content: '',
    createdDate: new Date().toString(),
  });

  const onReplyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReply({
      ...reply,
      content: e.target.value,
    });
  };

  const postReplyHandler = (reply: Reply) => {
    //TODO: rest api post 과정 추가
    // 현재는 테스트식으로 확인 가능하게 만든 로직임
    var board = selectedBoard;
    if (board !== undefined) {
      dispatch(setSelectBoard({ ...board, reply: [...board.reply, reply] }));
      setReply({
        name: '익명',
        imageUrl: '/profile/winter.png',
        content: '',
        createdDate: new Date().toString(),
      });
    }
  };

  React.useEffect(() => {}, []);

  return (
    <>
      {selectedBoard && (
        <>
          <div
            className={s.outerContainer}
            onClick={() => {
              dispatch(setBoardModal(false));
            }}>
            <CloseSharpIcon className={s.out} fontSize="large" />
          </div>
          <div className={s.innerContainer}>
            <div className={cn(s.header, s.form, s.mobile)}>
              <div>
                <ProfileImage
                  size="board"
                  imageUrl={selectedBoardUser?.imageUrl}
                />
                <div>
                  <b>{selectedBoard.name}</b>
                </div>
              </div>
              <MoreHorizSharpIcon fontSize="small" />
            </div>
            <div className={s.imageBox}>
              {/* TODO: 백엔드 이미지 저장 사이즈 고려하여 다시 css 만지기 */}

              <div
                className={s.image}
                style={{
                  backgroundImage: `url(${selectedBoard.imageUrl})`,
                }}
              />
              {/* FIXME: Image 태그 사용할지 백그라운드이미지 사용할지 추후 결정 */}
              {/* <Image
                src={selectedBoard.imageUrl[0]}
                width={525}
                height={300}
                alt={'board'}
                layout="responsive"
              /> */}
            </div>
            <div className={s.content}>
              <div className={cn(s.header, s.form, s.pc)}>
                <div>
                  <ProfileImage
                    size="board"
                    imageUrl={selectedBoardUser?.imageUrl}
                  />
                  <div>
                    <b>{selectedBoard.name}</b>
                  </div>
                </div>
                <MoreHorizSharpIcon fontSize="small" />
              </div>
              <div className={cn(s.footer, s.mobile)}>
                좋아요, 디엠, 저장 기능 풋터
              </div>
              <div className={s.comment}>
                {/* TODO: 댓글 목록 map 으로 하기 */}
                {selectedBoard.reply.map((reply, idx) => {
                  return (
                    <div key={idx} className={s.form}>
                      <div>
                        <ProfileImage size="board" imageUrl={reply.imageUrl} />
                        <div>
                          <b>{reply.name}</b> <span>{reply.content}</span>
                          <div className={s.date}>1주</div>
                        </div>
                      </div>
                      <MoreHorizSharpIcon
                        className={s.hoverIcon}
                        fontSize="small"
                        onClick={() => {
                          console.log('click');
                          dispatch(setSelectedReplyIdx(idx));
                          dispatch(setModal('reply', true));
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={cn(s.footer, s.pc)}>
                좋아요, 디엠, 저장 기능 풋터
              </div>
              <div className={s.edit}>
                <input
                  type="text"
                  value={reply.content}
                  onChange={onReplyHandler}
                />
                <button
                  onClick={() => postReplyHandler(reply)}
                  disabled={reply.content.length === 0}>
                  게시
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BoardModal;

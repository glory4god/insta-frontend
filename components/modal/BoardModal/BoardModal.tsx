import React, { ChangeEvent, ReactEventHandler } from 'react';
import Image from 'next/image';
import s from '../CommonModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal, setBoardModal } from 'lib/redux/modal/modalSlice';

import { ProfileImage } from 'components/profile';

import cn from 'classnames';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

interface BoardModalProps {}

const BoardModal: React.FC<BoardModalProps> = ({}) => {
  const { selectedBoard, selectedBoardUser } = useSelector(selectModal);
  const dispatch = useDispatch();

  const [reply, setReply] = React.useState<string>('댓글 달기...');

  const replyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
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
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((arr, idx) => {
                  return (
                    <div key={idx} className={s.form}>
                      <div>
                        <ProfileImage
                          size="board"
                          imageUrl={selectedBoardUser?.imageUrl}
                        />
                        <div>
                          <b>{selectedBoard.name}</b>{' '}
                          <span>
                            {selectedBoard.title}
                            {idx} 댓글이 길어도 끝까지 나올까??!??!!??!?!
                            어띠까지 나올까?!?!?!
                          </span>
                          <div className={s.date}>1주</div>
                        </div>
                      </div>
                      <MoreHorizSharpIcon fontSize="small" />
                    </div>
                  );
                })}
              </div>
              <div className={cn(s.footer, s.pc)}>
                좋아요, 디엠, 저장 기능 풋터
              </div>
              <div className={s.edit}>댓글 input </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BoardModal;

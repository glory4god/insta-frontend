import React from 'react';
import Image from 'next/image';
import s from './BoardModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal, setBoardModal } from 'lib/redux/modal/modalSlice';

import { ProfileImage } from 'components/profile';

import cn from 'classnames';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { UserData } from 'types/profile/types';
import { getProfileData } from 'lib/redux/profile/profileApis';

interface BoardModalProps {}

const BoardModal: React.FC<BoardModalProps> = ({}) => {
  const { selectedBoard, selectedBoardUser } = useSelector(selectModal);
  const dispatch = useDispatch();

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
            <Image
              src={selectedBoard.imageUrl[0]}
              width={525}
              height={600}
              alt={'board'}
              layout="responsive"
            />
            <div className={s.content}>
              <div className={cn(s.header, s.form)}>
                <div>
                  <ProfileImage
                    size="board"
                    imageUrl={selectedBoardUser?.imageUrl}
                  />
                  <p>
                    <b>{selectedBoard.name}</b>
                  </p>
                </div>
                <MoreHorizSharpIcon fontSize="small" />
              </div>
              <div className={s.comment}>
                {/* TODO: 댓글 목록 map 으로 하기 */}
                <div className={s.form}>
                  <div>
                    <ProfileImage
                      size="board"
                      imageUrl={selectedBoardUser?.imageUrl}
                    />
                    <p>
                      <b>{selectedBoard.name}</b>{' '}
                      <span>{selectedBoard.title}</span>
                      <div className={s.date}>1주</div>
                    </p>
                  </div>
                </div>
              </div>
              <div className={s.footer}>푸터</div>
              <div className={s.edit}>댓글쓰기</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BoardModal;

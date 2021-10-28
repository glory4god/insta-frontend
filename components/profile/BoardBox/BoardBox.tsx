import React from 'react';
import Image from 'next/image';

import { useDispatch } from 'react-redux';
import { setBoardModal, setSelectBoard } from 'lib/redux/modal/modalSlice';

import s from './BoardBox.module.css';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import { Board } from 'types/profile/types';

import { formatNumber } from 'lib/common';
import cn from 'classnames';

interface BoardBoxProps {
  size: number;
  board: Board;
}

const BoardBox: React.FC<BoardBoxProps> = ({ size, board }) => {
  const [hover, setHover] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setHover(true);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setHover(false);
  };

  return (
    <div
      className={cn(s.imagebox)}
      onClick={() => {
        dispatch(setSelectBoard(board));
        dispatch(setBoardModal(true));
      }}
      onMouseOver={(e) => onMouseOver(e)}
      onMouseLeave={(e) => onMouseLeave(e)}>
      <Image
        className={s.image}
        src={board.boardImageUrl[0]}
        width={size}
        height={size}
        alt="게시글"
        layout="responsive"
      />

      {/* TODO: 이미지 개수에 따라 / 동영상 여부에 따른 노출 */}
      <div className={s.multiple}>
        {board.boardImageUrl.length > 1 && (
          <PhotoLibraryRoundedIcon className={s.picture} />
        )}
        {/* <PlayArrowRoundedIcon className={s.play} /> */}
      </div>
      {hover && (
        <div className={s.boardinfo}>
          <div className={s.flex}>
            <div>
              <FavoriteIcon fontSize="small" />
              <span>{formatNumber(board.favoriteCnt)}</span>
            </div>
            <div>
              <ModeCommentIcon fontSize="small" />
              <span>{formatNumber(board.commentCnt)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(BoardBox);

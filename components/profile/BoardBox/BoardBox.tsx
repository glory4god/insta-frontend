import React from 'react';
import Image from 'next/image';

import s from './BoardBox.module.css';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { formatNumber } from 'lib/common';
import { useDispatch } from 'react-redux';
import { setBoardModal, setSelectedModal } from 'lib/redux/modal/modalSlice';
import { Board } from 'types/profile/types';

interface BoardBoxProps {
  size: number;
  board: Board;
}

const BoardBox: React.FC<BoardBoxProps> = ({ size, board }) => {
  const dispatch = useDispatch();

  const [hover, setHover] = React.useState<boolean>(false);

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
      className={s.imagebox}
      onClick={() => {
        dispatch(setBoardModal(true));
        dispatch(setSelectedModal(board));
      }}
      onMouseOver={(e) => onMouseOver(e)}
      onMouseLeave={(e) => onMouseLeave(e)}>
      <Image
        className={s.image}
        src={board.imageUrl[0]}
        width={size}
        height={size}
        alt="게시글"
        layout="responsive"
      />

      {/* TODO: 이미지 개수에 따라 / 동영상 여부에 따른 노출 */}
      <div className={s.multiple}>
        <PhotoLibraryRoundedIcon className={s.picture} />
        {/* <PlayArrowRoundedIcon className={s.play} /> */}
      </div>
      {hover && (
        <div className={s.boardinfo}>
          <div className={s.flex}>
            <div>
              <FavoriteIcon fontSize="small" />
              <span>{formatNumber(board.good)}</span>
            </div>
            <div>
              <ModeCommentIcon fontSize="small" />
              <span>{formatNumber(367376)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(BoardBox);

import React from 'react';
import s from './BoardContainer.module.css';

import BoardBox from '../BoardBox';

import { useSelector } from 'react-redux';
import { selectProfile } from 'lib/redux/profile/profileSlice';

import cn from 'classnames';

interface Props {
  className?: 'pt';
}

const BoardContainer: React.FC<Props> = ({ className }) => {
  const { boardData } = useSelector(selectProfile);

  return (
    <div className={cn(s.grid, className === 'pt' && s.pt)}>
      {boardData.boards.map((arr, idx) => {
        return <BoardBox key={idx} size={180} board={arr} />;
      })}
    </div>
  );
};

export default React.memo(BoardContainer);

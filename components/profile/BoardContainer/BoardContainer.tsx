import React from 'react';
import s from './BoardContainer.module.css';

import BoardBox from '../BoardBox';

import { BoardData } from 'types/profile/types';

interface Props {
  data: BoardData;
}

const BoardContainer: React.FC<Props> = ({ data }) => {
  return (
    <div className={s.grid}>
      {data.imageUrl.map((arr, idx) => {
        return <BoardBox key={idx} size={180} imageUrl={arr} />;
      })}
    </div>
  );
};

export default BoardContainer;

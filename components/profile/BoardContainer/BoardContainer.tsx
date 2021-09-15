import React from 'react';
import s from './BoardContainer.module.css';

import BoardBox from '../BoardBox';

import { useSelector } from 'react-redux';
import { selectProfile } from 'lib/redux/profile/profileSlice';

interface Props {}

const BoardContainer: React.FC<Props> = ({}) => {
  const { boardData } = useSelector(selectProfile);

  return (
    <div className={s.grid}>
      {boardData
        .map((data) => {
          return data.imageUrl;
        })
        .flat()
        .map((arr, idx) => {
          return <BoardBox key={idx} size={180} imageUrl={arr} />;
        })}
    </div>
  );
};

export default BoardContainer;

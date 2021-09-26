import React from 'react';
import s from './ReplyContent.module.css';

import { ProfileImage } from 'components/profile';
import { Reply } from 'types/profile/types';

interface ReplyProps {
  reply: Reply;
}

const ReplyContent: React.FC<ReplyProps> = ({ reply }) => {
  return (
    <div className={s.content}>
      <ProfileImage size="board" imageUrl={reply.imageUrl} />
      <div className={s.reply}>
        <b>{reply.name}</b> <span>{reply.content}</span>
        <div className={s.date}>1주</div>
      </div>
    </div>
  );
};

export default ReplyContent;

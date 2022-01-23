import React from 'react';
import Link from 'next/link';
import s from './ReplyContent.module.css';

import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ProfileImage } from 'components/profile';

import { Reply } from 'types/profile/types';
import { useDispatch } from 'react-redux';
import { setModal, setSelectedReplyIdx } from 'lib/redux/modal/modalSlice';

interface ReplyProps {
  reply: Reply;
  idx: number;
  onFocus: () => void;
  editReReply: (id: string) => void;
}

const ReplyContent: React.FC<ReplyProps> = ({
  reply,
  idx,
  onFocus,
  editReReply,
}) => {
  const [reReplyShow, setReReplyShow] = React.useState(false);

  const dispatch = useDispatch();

  const formatDate = (date: Date) => {
    const now = new Date();
    let dist = 0;
    console.log(date);
    dist = (now.getTime() - new Date(date).getTime()) / 1000 / 60;
    if (dist < 59) {
      return Math.ceil(dist) + '분';
    }
    dist = dist / 60;
    if (dist < 23) {
      return Math.ceil(dist) + '시간';
    }
    dist = dist / 24;
    if (dist < 29) {
      return Math.ceil(dist) + '일';
    }
    dist = dist / 30;
    if (dist < 11) {
      return Math.ceil(dist) + '달';
    }
    dist = dist / 12;
    return Math.ceil(dist) + '년';
  };

  return (
    <>
      <div id={s.form}>
        <ProfileImage size="board" imageUrl={reply.imageUrl} />
        <div className={s.content}>
          <div className={s.reply}>
            <Link href={`/${reply.username}`}>
              <a>
                <b>{reply.username}</b>
              </a>
            </Link>{' '}
            <span>{reply.content}</span>
            <div className={s.date}>
              <span>{formatDate(reply.createdDate)}</span>
              <span
                onClick={() => {
                  onFocus();
                  editReReply(`@${reply.username} `);
                }}>
                <b>답글 달기</b>
              </span>
              <span>
                <MoreHorizSharpIcon
                  id={s.hoverIcon}
                  fontSize="small"
                  onClick={() => {
                    dispatch(setSelectedReplyIdx(idx));
                    dispatch(setModal('reply', true));
                  }}
                />
              </span>
            </div>
          </div>
          <span>
            <FavoriteBorderRoundedIcon
              style={{ fontSize: '16px', cursor: 'pointer' }}
            />
          </span>
        </div>
      </div>
      {/* {reply.reReply.length !== 0 &&
        (!reReplyShow ? (
          <div
            className={s.replyShow}
            onClick={() => {
              setReReplyShow(true);
            }}>
            답글 보기({reply.reReply.length}개)
          </div>
        ) : (
          <div
            className={s.replyShow}
            onClick={() => {
              setReReplyShow(false);
            }}>
            답글 숨기기
          </div>
        ))} */}
      {reReplyShow ? (
        // reply.reReply.length > 0 &&
        reply.reReply.map((reply, idx) => {
          return (
            <div key={reply.username + idx} className={s.reReply}>
              <div id={s.form}>
                <ProfileImage size="board" imageUrl={reply.imageUrl} />
                <div className={s.content}>
                  <div className={s.reply}>
                    <Link href={`/${reply.username}`}>
                      <a>
                        <b>{reply.username}</b>
                      </a>
                    </Link>{' '}
                    <span>{reply.content}</span>
                    <div className={s.date}>
                      <span>{formatDate(new Date(reply.createdDate))}</span>
                      <span
                        onClick={() => {
                          onFocus();
                          editReReply(`@${reply.username} `);
                        }}>
                        <b>답글 달기</b>
                      </span>
                      <span>
                        <MoreHorizSharpIcon
                          id={s.hoverIcon}
                          fontSize="small"
                          onClick={() => {
                            dispatch(setSelectedReplyIdx(idx));
                            dispatch(setModal('reply', true));
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <span>
                    <FavoriteBorderRoundedIcon style={{ fontSize: '16px' }} />
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(ReplyContent);

import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import s from '../CommonModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectModal,
  setBoardModal,
  setModal,
  setSelectBoard,
  setSelectedReplyIdx,
} from 'lib/redux/modal/modalSlice';

import { ProfileImage } from 'components/profile';

import ReplyContent from '../ReplyContent';
import Button from '@material-ui/core/Button';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import TelegramIcon from '@material-ui/icons/Telegram';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import { formatNumber } from 'lib/common';
import cn from 'classnames';

import { PostReply, Reply } from 'types/profile/types';
import { selectUser } from 'lib/redux/user/userSlice';
import { selectProfile } from 'lib/redux/profile/profileSlice';
import { NEXT_SERVER } from 'config';
import fetcher from 'lib/common/fetcher';
import {
  fetchDeleteGood,
  fetchGetComment,
  fetchPostComment,
  fetchPostGood,
} from 'lib/apis/board';

interface BoardModalProps {}

const BoardModal: React.FC<BoardModalProps> = ({}) => {
  const { selectedBoard } = useSelector(selectModal);
  const { userData } = useSelector(selectProfile);
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [postReply, setPostReply] = React.useState<PostReply>({
    username: userInfo.username,
    content: '',
  });
  const [replys, setReplys] = React.useState<Reply[]>([]);
  const [favorite, setFavorite] = React.useState<number>(0);
  const [pressFavorite, setPressFavorite] = React.useState<boolean>(false);
  const textareaRef = React.useRef<any>(null);

  const onReplyHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostReply({
      ...postReply,
      content: e.target.value,
    });
  };

  const fetchFavoriteCheckHandler = async () => {
    const data: { check: boolean } = await fetcher(
      `${NEXT_SERVER}/v1/board/checkFavorite/${selectedBoard?._id}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      },
    );
    setPressFavorite(data.check);
  };

  const goodHandler = async () => {
    if (selectedBoard !== undefined) {
      if (pressFavorite) {
        const res = await fetchDeleteGood(
          selectedBoard._id,
          userInfo.accessToken,
        );
        if (!res.ok) {
          alert('좋아요를 취소하지 못했습니다.');
        } else {
          setFavorite((f) => f - 1);
          setPressFavorite(false);
          dispatch(
            setSelectBoard({
              ...selectedBoard,
              favoriteCnt: selectedBoard.favoriteCnt - 1,
            }),
          );
        }
      } else {
        const res = await fetchPostGood(
          selectedBoard._id,
          userInfo.accessToken,
        );
        if (!res.ok) {
          alert('좋아요를 누르지 못했습니다.');
        } else {
          setFavorite((f) => f + 1);
          setPressFavorite(true);
          dispatch(
            setSelectBoard({
              ...selectedBoard,
              favoriteCnt: selectedBoard.favoriteCnt + 1,
            }),
          );
        }
      }
    }
  };
  const fetchReplys = async () => {
    if (selectedBoard !== undefined) {
      const res = await fetchGetComment(selectedBoard._id);
      if (!res.ok) {
        alert('댓글을 불러오지 못했습니다');
      } else {
        const resJson = await res.json();
        setReplys(resJson);
      }
    }
  };

  const postReplyHandler = async (reply: PostReply) => {
    //TODO: rest api post 과정 추가

    if (selectedBoard !== undefined) {
      const res = await fetchPostComment(
        selectedBoard._id,
        userInfo.accessToken,
        reply,
      );
      if (!res.ok) {
        alert('댓글 작성에 실패했습니다');
      } else {
        dispatch(
          setSelectBoard({
            ...selectedBoard,
            commentCnt: selectedBoard.commentCnt + 1,
          }),
        );
        setPostReply({
          username: userInfo.username,
          content: '',
        });

        fetchReplys();
      }
    }
  };

  const inputFocusing = () => {
    textareaRef.current.focus();
  };

  React.useEffect(() => {
    if (selectedBoard !== undefined) {
      setFavorite(selectedBoard.favoriteCnt);
      fetchFavoriteCheckHandler();
      fetchReplys();
    }
  }, [userInfo.username, selectedBoard]);

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
            <div className={cn(s.header, s.mobileFlex)}>
              <div>
                <ProfileImage size="board" imageUrl={userData.imageUrl} />
                <Link href={`/${userData.username}`}>
                  <a id={s.profileId}>
                    <b>{userData.username}</b>
                  </a>
                </Link>
              </div>
              <MoreHorizSharpIcon fontSize="small" />
            </div>
            <div className={s.imageBox}>
              {/* TODO: 백엔드 이미지 저장 사이즈 고려하여 다시 css 만지기 */}

              <div
                className={s.image}
                style={{
                  backgroundImage: `url(${selectedBoard.boardImageUrl[0]})`,
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
              <div className={cn(s.header, s.pcFlex)}>
                <div>
                  <ProfileImage size="board" imageUrl={userData.imageUrl} />
                  <Link href={`/${userData.username}`}>
                    <a id={s.profileId}>
                      <b>{userData.username}</b>
                    </a>
                  </Link>
                </div>
                <MoreHorizSharpIcon fontSize="small" />
              </div>
              <div className={cn(s.footer, s.mobileBlock)}>
                <div className={s.footerIcon}>
                  <div className={s.footerNavi}>
                    {pressFavorite ? (
                      <a>
                        <FavoriteIcon
                          onClick={() => goodHandler()}
                          style={{ color: 'red', fontSize: '26px' }}
                        />
                      </a>
                    ) : (
                      <a>
                        <FavoriteBorderRoundedIcon
                          onClick={() => goodHandler()}
                          style={{ fontSize: '26px' }}
                        />
                      </a>
                    )}
                    <a>
                      <ChatBubbleOutlineRoundedIcon
                        style={{ borderRadius: '1rem', fontSize: '26px' }}
                        onClick={inputFocusing}
                      />
                    </a>
                    <a>
                      <TelegramIcon
                        style={{ color: 'gray', fontSize: '26px' }}
                      />
                    </a>
                  </div>
                  <div>
                    <a>
                      <BookmarkBorderIcon style={{ fontSize: '28px' }} />
                    </a>
                  </div>
                </div>
                <a
                  className={s.favorite}
                  onClick={() => {
                    dispatch(setModal('favorite', true));
                  }}>
                  {formatNumber(favorite)}명이 좋아합니다
                </a>
                <div className={s.datef}>0시간 전</div>
              </div>
              <div className={s.comment}>
                {/* TODO: 댓글 목록 map 으로 하기 */}
                {replys.map((reply: Reply, idx: number) => {
                  return (
                    <ReplyContent
                      reply={reply}
                      idx={idx}
                      key={idx}
                      onFocus={inputFocusing}
                      editReReply={(name: string) => {
                        // setReply({ ...reply, content: name })
                      }}
                    />
                  );
                })}
              </div>
              <div className={cn(s.footer, s.pcBlock)}>
                <div className={s.footerIcon}>
                  <div className={s.footerNavi}>
                    {pressFavorite ? (
                      <a>
                        <FavoriteIcon
                          onClick={() => goodHandler()}
                          style={{ color: 'red', fontSize: '26px' }}
                        />
                      </a>
                    ) : (
                      <a>
                        <FavoriteBorderRoundedIcon
                          onClick={() => goodHandler()}
                          style={{ fontSize: '26px' }}
                        />
                      </a>
                    )}
                    <a>
                      <ChatBubbleOutlineRoundedIcon
                        style={{ borderRadius: '1rem', fontSize: '26px' }}
                        onClick={inputFocusing}
                      />
                    </a>
                    <a>
                      <TelegramIcon
                        style={{ color: 'gray', fontSize: '26px' }}
                      />
                    </a>
                  </div>
                  <div>
                    <a>
                      <BookmarkBorderIcon style={{ fontSize: '28px' }} />
                    </a>
                  </div>
                </div>
                <a
                  className={s.favorite}
                  onClick={() => {
                    dispatch(setModal('favorite', true));
                  }}>
                  {formatNumber(favorite)}명이 좋아합니다
                </a>
                <div className={s.datef}>10월 1일</div>
              </div>
              <div className={s.edit}>
                <textarea
                  ref={textareaRef}
                  style={{
                    resize: 'none',
                    overflowY: 'hidden',
                    border: 'none',
                  }}
                  rows={postReply.content.length > 18 ? 2 : 1}
                  cols={30}
                  placeholder="댓글 달기.."
                  value={postReply.content}
                  onChange={onReplyHandler}
                />
                <Button
                  onClick={() => postReplyHandler(postReply)}
                  disabled={postReply.content.length === 0}
                  size="small"
                  style={{ color: '#2294ff' }}>
                  <b>게시</b>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BoardModal;

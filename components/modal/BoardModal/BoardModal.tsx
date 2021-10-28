import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import s from '../CommonModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectModal,
  setBoardModal,
  setModal,
  setSelectBoard,
  setSelectedReplyIdx,
} from 'lib/redux/modal/modalSlice';
import { selectLogin } from 'lib/redux/login/loginSlice';

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

import { formatNumber, idInListChecker, idNotInList } from 'lib/common';
import cn from 'classnames';

import { Reply } from 'types/profile/types';

interface BoardModalProps {}

const BoardModal: React.FC<BoardModalProps> = ({}) => {
  const { selectedBoard } = useSelector(selectModal);
  const { myUserInfo } = useSelector(selectLogin);
  const dispatch = useDispatch();

  const [reply, setReply] = React.useState<Reply>({
    username: '익명',
    name: '익명',
    imageUrl: '/profile/winter.png',
    content: '',
    createdDate: new Date().toString(),
    modifiedDate: new Date().toString(),
    reReply: [],
  });
  const [favorite, setFavorite] = React.useState<number>(0);
  const [pressFavorite, setPressFavorite] = React.useState<boolean>(false);
  const textareaRef = React.useRef<any>(null);

  const onReplyHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReply({
      ...reply,
      content: e.target.value,
    });
  };

  const goodHandler = (user: string) => {
    // TODO: rest api 통해서 좋아요 누르기 취소 기능 구현해야함
    if (selectedBoard !== undefined) {
      if (idInListChecker(selectedBoard.favorite, user)) {
        // TODO: api 로직 다시 짜기
        const newFav = idNotInList(selectedBoard.favorite, user);

        setFavorite((f) => f - 1);
        setPressFavorite(false);
        dispatch(setSelectBoard({ ...selectedBoard, favorite: newFav }));
      } else {
        setFavorite((f) => f + 1);
        setPressFavorite(true);
        dispatch(
          setSelectBoard({
            ...selectedBoard,
            favorite: [
              ...selectedBoard.favorite,
              {
                idusername: myUserInfo.username,
                name: myUserInfo.name,
                imageUrl: '/profile/winter.png',
              },
            ],
          }),
        );
      }
      console.log(favorite);
    }
  };

  const postReplyHandler = (reply: Reply) => {
    //TODO: rest api post 과정 추가
    // 현재는 테스트식으로 확인 가능하게 만든 로직임

    var board = selectedBoard;
    if (board !== undefined) {
      dispatch(setSelectBoard({ ...board, reply: [...board.reply, reply] }));
      setReply({
        username: '익명',
        name: '익명',
        imageUrl: '/profile/winter.png',
        content: '',
        createdDate: new Date().toString(),
        modifiedDate: new Date().toString(),
        reReply: [],
      });
    }
  };

  const inputFocusing = () => {
    textareaRef.current.focus();
  };

  React.useEffect(() => {
    if (selectedBoard !== undefined) {
      setFavorite(selectedBoard.favoriteCnt);
      idInListChecker(selectedBoard.favorite, myUserInfo.username)
        ? setPressFavorite(true)
        : setPressFavorite(false);
    }
  }, [myUserInfo.username, selectedBoard]);

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
                <ProfileImage size="board" imageUrl={selectedBoard.imageUrl} />
                <Link href={`/${selectedBoard.username}`}>
                  <a id={s.profileId}>
                    <b>{selectedBoard.username}</b>
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
                  <ProfileImage
                    size="board"
                    imageUrl={selectedBoard.imageUrl}
                  />
                  <Link href={`/${selectedBoard.username}`}>
                    <a id={s.profileId}>
                      <b>{selectedBoard.username}</b>
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
                          onClick={() => goodHandler(myUserInfo.username)}
                          style={{ color: 'red', fontSize: '26px' }}
                        />
                      </a>
                    ) : (
                      <a>
                        <FavoriteBorderRoundedIcon
                          onClick={() => goodHandler(myUserInfo.username)}
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
                {selectedBoard.reply.map((reply: Reply, idx) => {
                  return (
                    <ReplyContent
                      reply={reply}
                      idx={idx}
                      key={idx}
                      onFocus={inputFocusing}
                      editReReply={(name: string) =>
                        setReply({ ...reply, content: name })
                      }
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
                          onClick={() => goodHandler(myUserInfo.username)}
                          style={{ color: 'red', fontSize: '26px' }}
                        />
                      </a>
                    ) : (
                      <a>
                        <FavoriteBorderRoundedIcon
                          onClick={() => goodHandler(myUserInfo.username)}
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
                  rows={reply.content.length > 18 ? 2 : 1}
                  cols={30}
                  placeholder="댓글 달기.."
                  value={reply.content}
                  onChange={onReplyHandler}
                />
                <Button
                  onClick={() => postReplyHandler(reply)}
                  disabled={reply.content.length === 0}
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

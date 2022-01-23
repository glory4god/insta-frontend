/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ProfileImage } from 'components/profile';
import Link from 'next/link';
import { postFormatNumber, timeConvert } from 'lib/common';
import Swipe from 'react-easy-swipe';

import { Board } from 'types/profile/types';
import { FavoriteIcon, CommentIcon, DirectIcon, MarkIcon, EmoticonIcon, SeeMoreIcon } from 'components/ui/Icon';
import { fetchDeleteGood, fetchPostGood } from 'lib/apis/board';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { NEXT_SERVER } from 'config';
import fetcher from 'lib/common/fetcher';

const Post = ({ mainData, postData, setMainData }: { mainData: Board[], postData: Board, setMainData: (value: any) => void }) => {
  const [imgCount, setImgCount] = useState(1);
  const [seeMore, setSeeMore] = useState(false);
  const [positionx, setPositionx] = useState(0);
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();
  const positionX = useRef<number>(0)
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event: { target: { value: string } }) => {
    setTextAreaHeight("auto");
    setText(event.target.value);
  };

  const prevImg = () => {
    setImgCount((imgCount) => imgCount - 1);
  };
  const nextImg = () => {
    setImgCount((imgCount) => imgCount + 1);
  };
  const postSeeMore = () => {
    setSeeMore(() => true);
  };

  const onSwipeMove = (position: { x: number; y: number }) => {
    if (postData.boardImageUrl.length == 1) {
      return;
    }
    if (imgCount == 1 && position.x < 0) {
      positionX.current = position.x;
      setPositionx(() => position.x);
      return;
    }
    if (imgCount > 1 && imgCount < postData.boardImageUrl.length) {
      positionX.current = position.x;
      setPositionx(() => position.x);
      return;
    }
    if (imgCount == postData.boardImageUrl.length && position.x > 0) {
      positionX.current = position.x;
      setPositionx(() => position.x);
      return;
    }
  };
  const onSwipeEnd = () => {
    if (positionx < -20) {
      setPositionx(() => 0);
      positionX.current = 0;
      setImgCount((imgCount) => imgCount + 1);
    }
    if (positionx > 20) {
      setPositionx(() => 0);
      positionX.current = 0;
      setImgCount((imgCount) => imgCount - 1);
    }
    setPositionx(() => 0);
    positionX.current = 0;
  };

  const [favorite, setFavorite] = React.useState<number>(0);
  const [pressFavorite, setPressFavorite] = React.useState<boolean>(false);
  const goodHandler = async () => {
    if (pressFavorite) {
      const res = await fetchDeleteGood(
        postData._id,
        userInfo.accessToken,
      );
      if (!res.ok) {
        alert('좋아요를 취소하지 못했습니다.');
      } else {
        setFavorite((f) => f - 1);
        setPressFavorite(false);
        // 데이터 변화 시 postData 값 사라짐
        // setMainData(mainData.map(data => {
        //   data._id === postData._id ? { ...data, favoriteCnt: postData.favoriteCnt - 1 } : data
        // }));
      }
    } else {
      const res = await fetchPostGood(
        postData._id,
        userInfo.accessToken,
      );
      if (!res.ok) {
        alert('좋아요를 누르지 못했습니다.');
      } else {
        setFavorite((f) => f + 1);
        setPressFavorite(true);
        // setMainData(mainData.map(data => {
        //   data._id === postData._id ? { ...data, favoriteCnt: postData.favoriteCnt + 1 } : data
        // }));
      }
    }
  };

  const fetchFavoriteCheckHandler = async () => {
    const data: { check: boolean } = await fetcher(
      `${NEXT_SERVER}/v1/board/checkFavorite/${postData._id}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      },
    );
    setPressFavorite(data.check);
  };

  useEffect(() => {
    fetchFavoriteCheckHandler();
  }, [])

  return (
    <Article>
      <div>
        <HeaderWrapper>
          <div>
            <Header>
              <div>
                <ProfileImage
                  border={false}
                  size={'board'}
                  imageUrl={postData.profileImageUrl}
                />
              </div>
              <div>
                <span>
                  <Link href={`/${postData.username}`}>{postData.username}</Link>
                </span>
              </div>
            </Header>
            <ModalButtonWrapper>
              <button>
                <div>
                  <div>
                    <SeeMoreIcon />
                  </div>
                </div>
              </button>
            </ModalButtonWrapper>
          </div>
        </HeaderWrapper>
        <ImageWrapper>
          <div>
            <PostImage>
              <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
                <ImgDiv imgCount={imgCount} positionx={positionX.current}>
                  {postData.boardImageUrl.map((imageUrl, index) => {
                    return <Img key={index} src={imageUrl} alt="" />;
                  })}
                </ImgDiv>
              </Swipe>
              {imgCount > 1 && (
                <PrevButtonWrapper onClick={prevImg}>
                  <div
                    style={{
                      backgroundImage: 'url(/instagramIcon.png)',
                      backgroundPosition: '-130px -98px',
                    }}></div>
                </PrevButtonWrapper>
              )}
              {imgCount < postData.boardImageUrl.length && (
                <NextButtonWrapper onClick={nextImg}>
                  <div
                    style={{
                      backgroundImage: 'url(/instagramIcon.png)',
                      backgroundPosition: '-162px -98px',
                    }}></div>
                </NextButtonWrapper>
              )}
            </PostImage>
            {postData.boardImageUrl.length > 1 && (
              <ImageCounterWrapper>
                {postData.boardImageUrl.map((props, index) => {
                  return (
                    <ImageCounter
                      key={index}
                      index={index}
                      imgCount={imgCount}
                    />
                  );
                })}
              </ImageCounterWrapper>
            )}
          </div>
        </ImageWrapper>
        <div>
          <div>
            <div>
              <IconSection imgLength={postData.boardImageUrl.length}>
                <span>
                  <button onClick={() => goodHandler()}>
                    <FavoriteIcon
                      on={pressFavorite}
                    />
                  </button>
                </span>
                <span>
                  <button>
                    <CommentIcon />
                  </button>
                </span>
                <span>
                  <button>
                    <DirectIcon />
                  </button>
                </span>
                <span>
                  <button>
                    <MarkIcon />
                  </button>
                </span>
              </IconSection>
              <FavoriteSection>
                <div>
                  좋아요&nbsp;
                  <span>{postFormatNumber(postData.favoriteCnt)}</span>개
                </div>
              </FavoriteSection>
              <WriteWrapper>
                <div>
                  <PostDescriptionWrapper>
                    <div>
                      <NameSpan>
                        <Link href={`/${postData.username}`}>
                          {postData.username}
                        </Link>
                      </NameSpan>
                      &nbsp;
                      <PostDescription>
                        <span>
                          {postData.content.split('\n').length > 1 ? (
                            seeMore ? (
                              postData.content.split('\n').map((line) => {
                                return (
                                  <span key={line}>
                                    {line}
                                    <br />
                                  </span>
                                );
                              })
                            ) : (
                              <>
                                {postData.content.split('\n')[0]}
                                <SeeMore>
                                  ...&nbsp;
                                  <button onClick={postSeeMore}>더 보기</button>
                                </SeeMore>
                              </>
                            )
                          ) : (
                            postData.content
                          )}
                        </span>
                      </PostDescription>
                    </div>
                  </PostDescriptionWrapper>
                  <ReplyWrapper>
                    {postData.commentCnt > 2 && (
                      <ReplyCounter>
                        <div>
                          댓글 {postData.commentCnt}개 모두 보기
                        </div>
                      </ReplyCounter>
                    )}
                    {postData.comment ? postData.comment.map((reply: any, index: number) => {
                      if (index > 1) {
                        return;
                      } else {
                        return (
                          <div key={index}>
                            <div>
                              <NameSpan>
                                <Link href={`/${reply.username}`}>{reply.username}</Link>
                              </NameSpan>
                              &nbsp;
                              <span>
                                <span>{reply.content}</span>
                              </span>
                            </div>
                          </div>
                        );
                      }
                    }) : null}
                  </ReplyWrapper>
                </div>
              </WriteWrapper>
              <TimeWrapper>
                <time>{timeConvert(postData.createdDate)}</time>
              </TimeWrapper>
              <CommentSection>
                <div>
                  <form>
                    <IconButton>
                      <EmoticonIcon />
                    </IconButton>
                    <textarea
                      ref={textAreaRef}
                      rows={1}
                      style={{
                        height: textAreaHeight,
                      }}
                      onChange={onChangeHandler}
                      placeholder="댓글 달기..."
                      autoComplete="off"
                      autoCorrect="off"
                    />
                    <PostButton>게시</PostButton>
                  </form>
                </div>
              </CommentSection>
            </div>
          </div>
        </div>
      </div>
    </Article>
  );
};

export default Post;

const buttonStyle = css`
  border: 0;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid #dbdbdb;
  margin-bottom: 24px;
  background-color: rgba(var(--d87, 255, 255, 255), 1);
  margin-left: -1px;
  margin-right: -1px;
  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const HeaderWrapper = styled.div`
  background-color: #fafafa;
  border-bottom: 1px solid #efefef;
  & > div {
    display: flex;
    justify-content: space-between;
    flex: 0 0 auto;
    align-items: center;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-shrink: 1;
  height: 60px;
  padding: 0 16px;
  & > div:last-of-type {
    margin-left: 14px;
  }
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  padding-right: 4px;
  & > button {
    width: 40px;
    height: 40px;
    border: 0;
    background-color: #fafafa;
    cursor: pointer;
  }
`;

const ImageWrapper = styled.div`
  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const ImageCounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
`;

type ImgCount = {
  imgCount: number;
  positionx?: number;
  index?: number;
};

const ImageCounter = styled.div<ImgCount>`
  width: 6px;
  height: 6px;
  background: ${(props) =>
    props.index === props.imgCount - 1 ? '#0095f6' : '#a8a8a8'};
  border-radius: 50%;
  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ImgDiv = styled.div<ImgCount>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
  transform: translateX(
    ${({ imgCount, positionx }) =>
    positionx
      ? `calc(${positionx}px + ${-100 * (imgCount - 1)}%)`
      : `${-100 * (imgCount - 1)}%`}
  );
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NextButtonWrapper = styled.button`
  ${buttonStyle}
  background: none;
  padding: 16px 8px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  & > div {
    height: 30px;
    width: 30px;
  }
`;

const PrevButtonWrapper = styled.button`
  ${buttonStyle}
  background: none;
  padding: 16px 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  & > div {
    height: 30px;
    width: 30px;
  }
`;

type ImgLength = {
  imgLength: number;
};

const IconSection = styled.section<ImgLength>`
  display: flex;
  margin-top: ${(props: { imgLength: number }) =>
    props.imgLength > 1 ? '-34px' : '4px'};
  padding: 0 16px;
  & button {
    width: 40px;
    height: 40px;
    ${buttonStyle}
  }
  & > span:first-of-type {
    margin-left: -8px;
  }
  & > span:last-of-type {
    margin-left: auto;
    margin-right: -10px;
  }
`;

const FavoriteSection = styled.section`
  display: flex;
  padding: 0 16px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  & > div {
    cursor: pointer;
  }
`;

const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  margin-bottom: 8px;
  font-size: 14px;
  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const PostDescriptionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
  & > div {
    width: 100%;
    text-align: left;
  }
`;

const PostDescription = styled.span`
  width: 100%;
  heigth: 100%;
  & > span {
  }
`;

const SeeMore = styled.span`
  & > button {
    border: 0;
    outline: 0;
    background-color: #fff;
    cursor: pointer;
    color: #8e8e8e;
    font-size: 14px;
  }
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    text-align: left;
  }
`;

const ReplyCounter = styled.div`
  margin-bottom: 4px;
  & > div {
    display: inline;
    color: #8e8e8e;
    cursor: pointer;
  }
`;

const NameSpan = styled.span`
  display: inline;
  & > a {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 5px;
    margin-left: -5px;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  padding: 0 16px;
  margin-bottom: 4px;
  font-size: 10px;
  & > time {
    line-height: 18px;
    color: #8e8e8e;
  }
`;

const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  margin-top: 4px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  line-height: 18px;
  min-height: 56px;
  & form {
    display: flex;
    align-items: center;
    & > textarea {
      box-sizing: border-box;
      display: flex;
      flex-grow: 1;
      border: none;
      resize: none;
      color: #262626;
      min-heigth: 18px;
      max-height: 80px;
      line-height: 18px;
      &:focus {
        outline: none;
      }
    }
  }
`;

const IconButton = styled.div`
  ${buttonStyle}
  padding: 8px 16px 8px 0;
`;

const PostButton = styled.div`
  ${buttonStyle}
  color: #0095f6;
  font-weight: 600;
  text-align: center;
`;
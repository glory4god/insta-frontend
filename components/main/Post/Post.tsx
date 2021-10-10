/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ProfileImage } from 'components/profile';
import Link from 'next/link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { postFormatNumber } from 'lib/common';
import ExploreIcon from '@material-ui/icons/Explore';
import Swipe from 'react-easy-swipe';

import { Board } from 'types/profile/types';

const Post = ({ postData }: { postData: Board }) => {
  const [imgCount, setImgCount] = useState(1);
  const [seeMore, setSeeMore] = useState(false);
  const [positionx, setPositionx] = useState(0);
  const prevImg = () => {
    setImgCount((imgCount) => imgCount - 1);
  };
  const nextImg = () => {
    setImgCount((imgCount) => imgCount + 1);
  };
  const postSeeMore = () => {
    setSeeMore(() => true);
  };
  // useEffect(() => {
  //   console.log(positionX);
  // }, [positionX]);

  const onSwipeMove = (position: { x: any; y: any }, event: any) => {
    console.log(position.x);
    if (postData.boardImageUrl.length == 1) {
      return;
    }
    if (imgCount == 1 && position.x < 0) {
      setPositionx(() => position.x);
      return;
    }
    if (imgCount > 1 && imgCount < postData.boardImageUrl.length) {
      setPositionx(() => position.x);
      return;
    }
    if (imgCount == postData.boardImageUrl.length && position.x > 0) {
      setPositionx(() => position.x);
      return;
    }
  };
  const onSwipeEnd = () => {
    if (positionx < -20) {
      setPositionx(() => 0);
      setImgCount((imgCount) => imgCount + 1);
    }
    if (positionx > 20) {
      setPositionx(() => 0);
      setImgCount((imgCount) => imgCount - 1);
    }
    setPositionx(() => 0);
  };
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
                  imageUrl={`/profile/${postData.id}.png`}
                />
              </div>
              <div>
                <span>
                  <Link href="/">{postData.id}</Link>
                </span>
              </div>
            </Header>
            <ModalButtonWrapper>
              <button>
                <div>
                  <div>
                    <MoreHorizIcon />
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
                <ImgDiv imgCount={imgCount} positionx={positionx}>
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
                  <button>
                    <FavoriteBorderIcon />
                  </button>
                </span>
                <span>
                  <button>
                    <FavoriteBorderIcon />
                  </button>
                </span>
                <span>
                  <button>
                    <FavoriteBorderIcon />
                  </button>
                </span>
                <span>
                  <button>
                    <FavoriteBorderIcon />
                  </button>
                </span>
              </IconSection>
              <FavoriteSection>
                <div>
                  좋아요&nbsp;
                  <span>{postFormatNumber(postData.favorite.length)}</span>개
                </div>
              </FavoriteSection>
              <WriteWrapper>
                <div>
                  <PostDescriptionWrapper>
                    <div>
                      <NameSpan>
                        <Link href={`/${postData.id}`}>{postData.id}</Link>
                      </NameSpan>
                      &nbsp;
                      <PostDescription>
                        <span>
                          {postData.title.split('\n').length > 1 ? (
                            seeMore ? (
                              postData.title.split('\n').map((line) => {
                                return (
                                  <span key={line}>
                                    {line}
                                    <br />
                                  </span>
                                );
                              })
                            ) : (
                              <>
                                {postData.title.split('\n')[0]}
                                <SeeMore>
                                  ...&nbsp;
                                  <button onClick={postSeeMore}>더 보기</button>
                                </SeeMore>
                              </>
                            )
                          ) : (
                            postData.title
                          )}
                        </span>
                      </PostDescription>
                    </div>
                  </PostDescriptionWrapper>
                  <ReplyWrapper>
                    {postData.reply.length > 2 && (
                      <ReplyCounter>
                        <Link href={'/'}>
                          댓글 {postData.reply.length}개 모두 보기
                        </Link>
                      </ReplyCounter>
                    )}
                    {postData.reply.map((reply, index) => {
                      return (
                        <div key={index}>
                          <div>
                            <NameSpan>
                              <Link href={`/${reply.id}`}>{reply.id}</Link>
                            </NameSpan>
                            &nbsp;
                            <span>
                              <span>{reply.content}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </ReplyWrapper>
                </div>
              </WriteWrapper>
              <TimeWrapper>
                <time>1시간 전</time>
              </TimeWrapper>
              <CommentSection>
                <div>
                  <form>
                    <IconButton>
                      <FavoriteBorderIcon />
                    </IconButton>
                    <textarea
                      placeholder="댓글 달기..."
                      autoComplete="off"
                      autoCorrect="off"></textarea>
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
  background: ${(props: { index: number; imgCount: number; }) =>
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
  margin-top: ${(props: { imgLength: number; }) => (props.imgLength > 1 ? '-34px' : '4px')};
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
  & > a {
    color: #8e8e8e;
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
      display: flex;
      flex-grow: 1;
      border: none;
      resize: none;
      height: 18px;
      color: #262626;
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

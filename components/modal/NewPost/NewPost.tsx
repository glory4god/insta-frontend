/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import s from '../CommonModal.module.scss';

import { ModalDataType } from 'types/modal/types';

import { useSelector, useDispatch } from 'react-redux';
import { selectModal, setModal } from 'lib/redux/modal/modalSlice';
import {
  initPostImage,
  setPostImage,
  selectNewPost,
  addPostImage,
  deletePostImage,
} from 'lib/redux/newPost/newPostSlice';
import { selectUser } from 'lib/redux/user/userSlice';
import Crop from './Crop';
import classNames from 'classnames';
import ProfileImage from 'components/profile/ProfileImage';
import Link from 'next/link';
import styled from '@emotion/styled';
import axios from 'axios';
import { NEXT_SERVER } from 'config';
import {
  AddIcon,
  BackIcon,
  DeleteIcon,
  EmoticonIcon,
  ImageVideoIcon,
} from 'components/ui/Icon';

interface ModalProps {
  modalData: ModalDataType[];
}

const NewPost: React.FC = () => {
  const nextId = useRef(1);
  const imageControlRef = useRef<HTMLDivElement>(null);
  const [imageNumber, setImageNumber] = useState<number>(1);
  const [postState, setPostState] = useState<string>('newPost');
  const [imageControl, setImageControl] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const images = useSelector(selectNewPost);
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();
  const closeModal = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.preventDefault();
    document.body.style.overflow = 'unset';
    dispatch(initPostImage());
    dispatch(setModal('newPost', false));
  };

  useEffect(() => {
    dispatch(initPostImage());
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClick = (event: any) => {
    event.preventDefault();
    let myInput: HTMLElement | null = document.getElementById('input');
    myInput?.click();
  };

  function readFile(file: Blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const handleChange = async (event: any) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      let imageDataUrl: any = await readFile(file);

      const postImage = {
        id: nextId.current,
        image: imageDataUrl,
        name: fileUploaded.name,
      };

      setPostState(() => 'crop');
      if (nextId.current === 1) {
        dispatch(setPostImage(postImage));
        setImageNumber(() => 1);
      } else {
        dispatch(addPostImage(postImage));
        setImageNumber((imageNumber) => imageNumber + 1);
      }
      nextId.current += 1;
    }
  };

  const nextPostState = () => {
    if (postState === 'crop') {
      setPostState(() => 'content');
    }
  };
  const prevPostState = () => {
    if (postState === 'crop') {
      setPostState(() => 'newPost');
      dispatch(initPostImage());
      nextId.current = 1;
    } else if (postState === 'content') {
      setPostState(() => 'crop');
    }
  };

  const prevImg = () => {
    setImageNumber((imageNumber) => imageNumber - 1);
  };
  const nextImg = () => {
    setImageNumber((imageNumber) => imageNumber + 1);
  };

  function clickClopEvent(event: { target: any }) {
    var target = event.target;

    if (imageControl === false) return;

    if (imageControlRef.current?.contains(target)) return;
    setImageControl(false);
  }

  const deleteImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    deleteId: number,
  ) => {
    e.preventDefault();
    if (images.length === 1) {
      setPostState(() => 'newPost');
      dispatch(initPostImage());
      nextId.current = 1;
    } else {
      if (imageNumber === 1) {
        setImageNumber(() => 1);
      } else {
        setImageNumber((imageNumber) => imageNumber - 1);
      }
    }
    dispatch(deletePostImage({ id: deleteId }));
  };

  const changeContent = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContent(e.target.value);
  };

  const postContent = () => {
    var formdata = new FormData();
    for (let j = 0; j < images.length; j++) {
      const imgDataUrl = images[j].croppedImage;
      var blobBin = atob(imgDataUrl.split(',')[1]); // base64 데이터 디코딩
      var array = [];
      for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      var file = new Blob([new Uint8Array(array)], { type: 'image/png' }); // Blob 생성
      formdata.append('file', file, images[j].name);
    }
    formdata.append('content', content);
    // /* key 확인하기 */
    // for (let key of formdata.keys()) {
    //   console.log(key);
    // }

    // /* value 확인하기 */
    // for (let value of formdata.values()) {
    //   console.log(value);
    // }
    axios
      .post(`${NEXT_SERVER}/test/newPost`, formdata, {
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        onUploadProgress: (event) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total),
          );
        },
      })
      .then((response) => {
        dispatch(setModal('newPost', false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={s.outerContainerPost} onClick={closeModal} />
      <div
        className={classNames(s.innerContainerPost, {
          [s.innerContainerPostText]: postState === 'content',
        })}>
        <div>
          <div className={s.headerPost}>
            <div>
              <div>
                {postState !== 'newPost' && (
                  <button onClick={prevPostState}>
                    <div style={{ transform: 'translateX(-8px)' }}>
                      <BackIcon />
                    </div>
                  </button>
                )}
              </div>
            </div>
            <div>
              <h1>
                {postState === 'newPost'
                  ? '새 게시물 만들기'
                  : postState === 'crop'
                  ? '자르기'
                  : '새 게시물 만들기'}
              </h1>
            </div>
            <div>
              <div>
                {postState === 'crop' ? (
                  <button onClick={nextPostState}>다음</button>
                ) : postState === 'content' ? (
                  <button onClick={postContent}>공유하기</button>
                ) : null}
              </div>
            </div>
          </div>
          <div
            className={classNames(s.contentWrapPost, {
              [s.contentWrapPostText]: postState === 'content',
            })}>
            <div>
              {postState === 'newPost' ? (
                <div className={s.contentPost}>
                  <ImageVideoIcon />
                  <h2>사진과 동영상을 여기에 끌어다 놓으세요</h2>
                  <div className={s.inputButton}>
                    <button onClick={handleClick}>컴퓨터에서 선택</button>
                  </div>
                </div>
              ) : postState === 'crop' ? (
                images[0]?.image && (
                  <div onClick={clickClopEvent}>
                    <div className={s.imageWrap}>
                      {images.map((props, index) => {
                        if (index === imageNumber - 1) {
                          return (
                            <div key={props.id}>
                              <Crop image={props.image} id={props.id} />
                            </div>
                          );
                        }
                      })}
                    </div>
                    {imageNumber > 1 && (
                      <div className={s.prevButtonWrapper} onClick={prevImg}>
                        <div
                          style={{
                            backgroundImage: 'url(/instagramIcon.png)',
                            backgroundPosition: '-130px -98px',
                          }}></div>
                      </div>
                    )}
                    {imageNumber < images.length && (
                      <div className={s.nextButtonWrapper} onClick={nextImg}>
                        <div
                          style={{
                            backgroundImage: 'url(/instagramIcon.png)',
                            backgroundPosition: '-162px -98px',
                          }}></div>
                      </div>
                    )}
                    {imageControl && (
                      <div
                        ref={imageControlRef}
                        className={s.thumbnailContainer}
                        style={{
                          width: `${
                            images.length * 94 + (images.length - 1) * 12 + 100
                          }px`,
                        }}>
                        <div
                          style={{
                            height: '94px',
                            width: `${
                              images.length * 94 + (images.length - 1) * 12
                            }px`,
                          }}>
                          <div
                            style={{ position: 'absolute', transform: 'none' }}>
                            <div
                              style={{
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                border: 'none',
                                padding: 0,
                                height: '94px',
                              }}>
                              <div
                                style={{
                                  backgroundColor: 'rgba(0, 0, 0, 0)',
                                  boxShadow: 'rgba(0, 0, 0, 0) 0px 2px 6px 2px',
                                  transform: 'none',
                                }}>
                                <div
                                  style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0)',
                                    height: '100%',
                                    width: `${
                                      images.length * 94 +
                                      (images.length - 1) * 12
                                    }px`,
                                    display: 'flex',
                                  }}>
                                  {images.map((props, index) => {
                                    return (
                                      <div
                                        key={index}
                                        style={{
                                          backgroundColor: 'rgba(0, 0, 0, 0)',
                                          position: 'relative',
                                          marginRight: '12px',
                                        }}>
                                        <img
                                          src={props.croppedImage}
                                          alt={props.image}
                                          style={{
                                            // backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat',
                                            height: '94px',
                                            transform:
                                              'translateX(0px) translateY(0px) scale(1)',
                                            transition: 'none 0s ease 0s',
                                            width: '94px',
                                          }}
                                          onClick={() =>
                                            setImageNumber(() => index + 1)
                                          }
                                        />
                                        <div
                                          role="button"
                                          className={s.thumbnailDeleteWrap}
                                          onClick={(e) =>
                                            deleteImage(e, props.id)
                                          }
                                          style={{
                                            display: `${
                                              index + 1 === imageNumber
                                                ? 'block'
                                                : 'none'
                                            }`,
                                          }}>
                                          <button
                                            type="button"
                                            style={{ cursor: 'pointer' }}>
                                            <div>
                                              <DeleteIcon />
                                            </div>
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            height: '94px',
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <div
                            onClick={handleClick}
                            aria-disabled="false"
                            role="button"
                            style={{
                              height: '48px',
                              width: '48px',
                              border: '1px solid #FFF',
                              borderRadius: '50%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer',
                            }}>
                            <AddIcon />
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        padding: '8px',
                      }}
                      role="button">
                      <div
                        className={s.zoomButtonWrap}
                        onClick={() => setImageControl(true)}>
                        <div>
                          <button className={s.zoomButton} type="button">
                            <div>
                              <svg
                                aria-label="미디어 갤러리 열기"
                                color="#ffffff"
                                fill="#ffffff"
                                height="16"
                                role="img"
                                viewBox="0 0 24 24"
                                width="16">
                                <path d="M19 15V5a4.004 4.004 0 00-4-4H5a4.004 4.004 0 00-4 4v10a4.004 4.004 0 004 4h10a4.004 4.004 0 004-4zM3 15V5a2.002 2.002 0 012-2h10a2.002 2.002 0 012 2v10a2.002 2.002 0 01-2 2H5a2.002 2.002 0 01-2-2zm18.862-8.773A.501.501 0 0021 6.57v8.431a6 6 0 01-6 6H6.58a.504.504 0 00-.35.863A3.944 3.944 0 009 23h6a8 8 0 008-8V9a3.95 3.95 0 00-1.138-2.773z" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className={s.contentWrap}>
                  <div style={{ position: 'relative' }}>
                    {images.map((props, index) => {
                      return (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={index}
                          className={s.croppedImg}
                          src={props.croppedImage}
                          alt="Cropped"
                          style={{
                            display: `${
                              index + 1 === imageNumber ? 'block' : 'none'
                            }`,
                          }}
                        />
                      );
                    })}
                    {imageNumber > 1 && (
                      <div className={s.prevButtonWrapper} onClick={prevImg}>
                        <div
                          style={{
                            backgroundImage: 'url(/instagramIcon.png)',
                            backgroundPosition: '-130px -98px',
                          }}></div>
                      </div>
                    )}
                    {imageNumber < images.length && (
                      <div className={s.nextButtonWrapper} onClick={nextImg}>
                        <div
                          style={{
                            backgroundImage: 'url(/instagramIcon.png)',
                            backgroundPosition: '-162px -98px',
                          }}></div>
                      </div>
                    )}
                  </div>
                  <div className={s.contentWrapContent}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', margin: '16px' }}>
                        <div style={{ marginRight: '12px' }}>
                          <Link href={`/${userInfo.username}`}>
                            <a>
                              <ProfileImage
                                size={'nav'}
                                border={false}
                                borderColor={'black'}
                                imageUrl={userInfo.profileImageUrl}
                              />
                            </a>
                          </Link>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            color: '#262626',
                          }}>
                          <div>{userInfo.username}</div>
                        </div>
                      </div>
                      <div style={{ width: '100%' }}>
                        <form>
                          <textarea
                            name="content"
                            id="content"
                            key="content"
                            value={content}
                            onChange={changeContent}
                            placeholder="문구 입력..."
                            autoComplete="none"
                            autoCorrect="none"
                            spellCheck="false"
                            maxLength={2500}
                            style={{
                              boxSizing: 'border-box',
                              border: 'none',
                              resize: 'none',
                              padding: '0 16px',
                              width: '100%',
                              height: '168px',
                              outline: 'none',
                              overflow: 'auto',
                              lineHeight: '16px',
                              fontSize: '16px',
                            }}
                          />
                        </form>
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '4px 8px',
                          width: '100%',
                        }}>
                        <button
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            border: 'none',
                            padding: '8px',
                            cursor: 'pointer',
                          }}>
                          <EmoticonIcon />
                        </button>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <div style={{ padding: '0 16px', fontSize: '12px' }}>
                          {content.length}/2500
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <form>
              <input
                accept="image/jpeg,image/png,image/heic,image/heif"
                type="file"
                id="input"
                onClick={(event: any) => {
                  event.target.value = null;
                }}
                onChange={handleChange}
                style={{ display: 'none' }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;

type ContainerProps = {
  key: number;
  index: number;
  current: number;
};

const Container = styled.div<ContainerProps>`
  display: ${({ index, current }) => (current === index ? 'block' : 'none')};
`;

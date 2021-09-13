import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, setBanner } from 'lib/redux/profile/profileSlice';

import s from './BoardBanner.module.css';

import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

import { Banner } from 'types/profile/types';

interface BannerProps {
  bannerList: string[];
}

const BoardBanner: React.FC<BannerProps> = ({ bannerList }) => {
  const pages = useRouter();
  const { currentBanner } = useSelector(selectProfile);
  const dispatch = useDispatch();

  const keyList = Object.keys(bannerList) as Banner[];
  const valueList = Object.values(bannerList);

  const routeHandler = (push: Banner) => {
    dispatch(setBanner(push));
    console.log(push);
    console.log(currentBanner);
    if (currentBanner !== push) {
      // pages.push(`${pages.asPath}/${push !== 'main' ? push : ''}`);
    }
  };

  return (
    <div className={s.container}>
      {valueList.map((banner, idx) => {
        return (
          <Link href="" key={banner}>
            <a
              className={s.button}
              style={{
                borderTop: `${
                  currentBanner === keyList[idx] ? '1px solid black' : 'none'
                }`,
                marginRight: `${
                  valueList.length - 1 !== idx ? '3.5rem' : 'none'
                }`,
                color: `${currentBanner !== keyList[idx] ? 'gray' : 'black'}`,
              }}
              onClick={(e) => {
                e.preventDefault();
                routeHandler(keyList[idx]);
              }}>
              <span>
                {banner === '게시물' && <AppsOutlinedIcon className={s.icon} />}
                {banner === '동영상' && (
                  <PlayCircleOutlineIcon className={s.icon} />
                )}
                {banner === '저장됨' && (
                  <BookmarkBorderIcon className={s.icon} />
                )}
                {banner === '태그됨' && (
                  <AccountBoxOutlinedIcon className={s.icon} />
                )}
              </span>
              <span className={s.bannerSpace}>{banner}</span>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default BoardBanner;

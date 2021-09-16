import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import s from './Navbar.module.css';
import HomeIcon from '@material-ui/icons/Home';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import ProfileImage from 'components/profile/ProfileImage';

const Navbar = () => {
  return (
    <>
      <div className={s.paper}>
        <div className={s.navigator}>
          <Link href="/">
            <a className={s.mainlogo}>
              <Image
                src={'/instagram.png'}
                width={'103px'}
                height={'29px'}
                alt={'mainlogo'}></Image>
            </a>
          </Link>
          <div>
            <input className={s.input} type="text" placeholder="검색" />
          </div>
          <div className={s.right}>
            <div className={s.rightBanner}>
              <Link href="/">
                <a>
                  <HomeIcon style={{ fontSize: '30px' }} />
                </a>
              </Link>
              <Link href="/direct">
                <a>
                  <TelegramIcon
                    color={'disabled'}
                    style={{ fontSize: '30px' }}
                  />
                </a>
              </Link>

              <Link href="/explore">
                <a>
                  <ExploreIcon
                    color={'disabled'}
                    style={{ fontSize: '30px' }}
                  />
                </a>
              </Link>

              <Link href="/">
                <a>
                  <FavoriteBorderIcon
                    color={'disabled'}
                    style={{ fontSize: '30px' }}
                  />
                </a>
              </Link>

              {/* 이건 고민해봐야함  */}
              <Link href="/">
                <a>
                  <AddIcon color={'disabled'} style={{ fontSize: '30px' }} />
                </a>
              </Link>

              {/* TODO:누르면 메뉴바 나오도록 */}
              <Link href="/winter">
                <a>
                  <ProfileImage
                    size={'nav'}
                    border={true}
                    borderColor={'black'}
                    imageUrl={'/profile/winter.png'}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

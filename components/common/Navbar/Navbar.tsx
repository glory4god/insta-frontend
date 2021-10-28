import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import s from './Navbar.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from 'lib/redux/login/loginSlice';
import { logout } from 'lib/redux/user/userSlice';

import HomeIcon from '@material-ui/icons/Home';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';

import ProfileImage from 'components/profile/ProfileImage';
import UserSearchList from './SearchBox';

import { getBase3UserProfile } from 'lib/redux/profile/profileApis';
import { BaseUser3 } from 'types/profile/types';
import { LogoutRounded } from '@mui/icons-material';

const Navbar = () => {
  const { myUserInfo } = useSelector(selectLogin);
  const [userList, setUserList] = React.useState<BaseUser3[]>([]);
  const dispatch = useDispatch();

  const [onUserList, setOnUserList] = React.useState<boolean>(false);
  const el = React.useRef<HTMLDivElement>();
  const inputRef = React.useRef<any>();

  const fetchUserList = async () => {
    setUserList((await getBase3UserProfile()) as BaseUser3[]);
  };

  React.useEffect(() => {
    const handleCloseSearch = (e: any) => {
      if (!inputRef.current.contains(e.target)) {
        // 이 부분은 해결 못하겠다,,, 타입에러 어케하지 ㅠㅠ
        if (onUserList && (!el.current || !el.current.contains(e.target))) {
          setOnUserList(false);
        }
      }
    };
    window.addEventListener('click', handleCloseSearch);
    return () => {
      window.removeEventListener('click', handleCloseSearch);
    };
  }, [onUserList]);

  React.useEffect(() => {
    fetchUserList();
  }, []);

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
            <input
              ref={inputRef}
              onClick={() => {
                setOnUserList(true);
              }}
              className={s.input}
              type="text"
              placeholder="검색"
            />
            {onUserList && (
              <div ref={el}>
                <UserSearchList
                  userList={userList}
                  closeModal={() => setOnUserList(false)}
                />
              </div>
            )}
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
                  <AddIcon
                    color={'disabled'}
                    style={{ fontSize: '30px' }}
                    onClick={() => dispatch(logout())}
                  />
                </a>
              </Link>

              {/* TODO:누르면 메뉴바 나오도록 */}
              <Link href="/winter">
                <a>
                  <ProfileImage
                    size={'nav'}
                    border={true}
                    borderColor={'black'}
                    imageUrl={myUserInfo.imageUrl}
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

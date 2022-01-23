/* eslint-disable @next/next/link-passhref */
import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import router from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from 'lib/redux/user/userSlice';
import { ProfileIcon, SettingIcon } from 'components/ui/Icon';

interface SelectBoxProps {
  closeModal: () => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ closeModal }) => {
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();
  const clickLogout = () => {
    router.push('/');
    dispatch(logout());
  }
  const clickLink = () => {
    closeModal();
  }
  return (
    <Container>
      <div>
        <Rhombus />
        <Wrapper>
          <Link href={`/${userInfo.username}`}>
            <A onClick={clickLink}>
              <Box>
                <div style={{ marginRight: '12px' }}>
                  <ProfileIcon />
                </div>
                <div>
                  <div>프로필</div>
                </div>
              </Box>
            </A>
          </Link>
          <Link href={'/accounts/edit'}>
            <A onClick={clickLink}>
              <Box>
                <div style={{ marginRight: '12px' }}>
                  <SettingIcon />
                </div>
                <div>
                  <div>설정</div>
                </div>
              </Box>
            </A>
          </Link>
          <Hr />
          <div>
            <Box onClick={clickLogout}>
              <div>로그아웃</div>
            </Box>
            <div></div>
          </div>
        </Wrapper>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin-left: -180px;
  top: 15px;
  & > div {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px 1px rgba(var(--jb7,0,0,0),.0975);
    // position: absolute;
    z-index: 3;
    background: #FFF;
    border-radius: 6px;
  }
`;

const Rhombus = styled.div`
  width: 14px;
  height: 14px;
  left: 184px;
  bottom: 0;
  top: -6px;
  box-shadow: 0 0 5px 1px rgba(var(--jb7,0,0,0),.0975);
  position: absolute;
  transform: rotate(45deg);
  border: 1px solid rgba(var(--f23,255,255,255),1);
  background: #FFF;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  border-radius: 6px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const A = styled.a`

`;

const Box = styled.div`
  display: flex;
  padding: 8px 16px;
  & > div:first-of-type {
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: #F6F6F6;
  }
`;

const Hr = styled.hr`
  background-color: #dbdbdb;
  border: 0;
  height: 1px;
  margin: 0;
  width: 100%;
`;

export default SelectBox;

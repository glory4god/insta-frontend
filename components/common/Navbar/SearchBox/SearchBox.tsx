import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import UserSearchList from './UserSearchList';
import { SearchIcon } from 'components/ui/Icon';
import axios from 'axios';
import { NEXT_SERVER } from 'config';
import { BaseUser3 } from 'types/profile/types';
import { selectUser } from 'lib/redux/user/userSlice';
import { useSelector } from 'react-redux';
import { Loading } from 'components/ui/Loading';

const SearchBox: React.FC = () => {
  const { userInfo } = useSelector(selectUser);
  const [userList, setUserList] = useState<BaseUser3[]>([]);
  const [onUserList, setOnUserList] = useState<boolean>(false);
  const [offModal, setOffModal] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [loading, setLoading] = useState<boolean>(false);
  const el = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const deleteIconRef = useRef<HTMLDivElement>(null);

  const deleteInputText = () => {
    setOnUserList(false);
    setInputFocus(false);
    setLoading(false);
    setInputText("");
    setUserList([]);
  }

  useEffect(() => {
    const handleCloseSearch = (e: CustomEvent<MouseEvent>) => {
      if (!inputRef.current?.contains(e.target as Element)) {
        if (onUserList && (!el.current || !el.current.contains(e.target as Element))) {
          deleteInputText();
        }
      }
    };
    window.addEventListener('click', (handleCloseSearch) as EventListener);
    return () => {
      window.removeEventListener('click', (handleCloseSearch) as EventListener);
    };
  }, [onUserList]);

  const inputClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (deleteIconRef.current?.contains(e.target as Element)) return;
    setInputFocus(true);
    setOnUserList(true);
    if (null !== inputRef.current) {
      inputRef.current.focus();
    }
  }

  const searchUser = (e: { target: { value: string; }; }) => {
    setInputText(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    if (!e.target.value) return;
    setLoading(() => true);
    const newTimer = setTimeout(() => {
      axios.get(`${NEXT_SERVER}/v1/profiles/${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          }
        })
        .then((response) => {
          setUserList(() => response.data);
          setLoading(() => false);
        })
    }, 300);
    setTimer(newTimer);
  }

  useEffect(() => {
    if (offModal) {
      deleteInputText();
      if (null !== inputRef.current) {
        inputRef.current.blur();
      }
    }
  }, [offModal])

  useEffect(() => {
    if (!inputText) {
      setLoading(() => false);
      setUserList([]);
    }
  }, [inputText]);

  return (
    <Container onClick={(e) => inputClick(e)}>
      <div>
        <Input
          ref={inputRef}
          type="text"
          placeholder={inputFocus ? "검색" : undefined}
          value={inputText}
          onChange={searchUser}
        />
        {inputFocus ? null :
          <SearchIconWrapper>
            <div>
              <SearchIcon />
            </div>
            <span>
              검색
            </span>
          </SearchIconWrapper>
        }
        {inputFocus &&
          loading ?
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
          :
          <DeleteIcon
            ref={deleteIconRef}
            onClick={() => deleteInputText()}
            style={{ backgroundImage: `url(/instagramIcon.png)` }}
          />
        }
        {onUserList && (
          <div ref={el}>
            <UserSearchList
              listLoading={loading}
              userList={userList}
              setUserList={(value) => setUserList(value)}
              inputText={inputText}
              closeModal={() => setOffModal(true)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchBox;

const Container = styled.div`
  cursor: text;
  & > div {
    position: relative;
  }
`;

const Input = styled.input`
  display: inline-block;
  background-color: #EFEFEF;
  box-sizing: border-box;
  border: none;
  outline: none;
  width: 268px;
  height: 36px;
  border-radius: 8px;
  font-size: 16px;
  padding: 3px 16px;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  position: absolute;
  height: 36px;
  padding: 0 16px;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  & > span {
    color: #8e8e8e;
    height: 22px;
    line-height: 18px;
  }
  & > div {
    margin-right: 12px
  }
`;

const DeleteIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  background-position: -318px -333px;
  height: 20px;
  width: 20px;
  background-repeat: no-repeat;
  cursor: default;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  height: 20px;
  width: 20px;
  background-repeat: no-repeat;
  cursor: default;
`;
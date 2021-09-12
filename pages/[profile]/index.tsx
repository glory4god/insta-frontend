import BoardBanner from 'components/profile/BoardBanner';
import BoardContainer from 'components/profile/BoardContainer';
import ProfileImage from 'components/profile/ProfileImage';
import UserInfo from 'components/profile/UserInfo';
import Container from 'components/ui/Container';
import {
  getProfileData,
  getProfileIds,
  getUserBoard,
} from 'lib/redux/profile/profileApis';
import { initialBanner } from 'lib/redux/profile/profileSlice';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useDispatch } from 'react-redux';
import { BoardData, UserData } from 'types/profile/types';

const UserProfile = ({
  bannerList,
  userData,
  boardData,
}: {
  bannerList: string[];
  userData: UserData;
  boardData: BoardData;
}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initialBanner());
  });

  return (
    <>
      <Head>
        {/* 추후에 api로 데이터 가져올 때 추가 설정 */}
        <title></title>
        <meta name="" content=""></meta>
      </Head>
      <Container>
        <UserInfo data={userData} />
        <BoardBanner bannerList={bannerList} />
        <BoardContainer data={boardData} />
      </Container>
    </>
  );
};

export default UserProfile;

interface IParams extends ParsedUrlQuery {
  profile: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: 백엔드 연동시 추후에 api로 가져오기
  const arr = (await getProfileIds()) as string[];
  const paths = arr.map((profile) => {
    return {
      params: { profile },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const bannerList: object = {
    main: '게시물',
    channel: '동영상',
    saved: '저장됨',
    tagged: '태그됨',
  };
  const { profile } = context.params as IParams;

  // TODO: 백엔드 연동시 추후에 api로 가져오기
  const userData = (await getProfileData(profile)) as UserData;
  const boardData = (await getUserBoard(profile)) as BoardData;
  return {
    props: { userData, bannerList, boardData },
  };
};

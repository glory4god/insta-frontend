import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import Container from 'components/ui/Container';

import { ParsedUrlQuery } from 'querystring';

const ProfileBanner = () => {
  return (
    <Container>
      <div>banner</div>
    </Container>
  );
};

export default ProfileBanner;

// FIXME: 경로 설정 추후 다시 필요

// //이 과정이 사실 정확히 뭔지는 모르겠지만 빨간줄이 안뜸 ㅠㅠ
// interface IParams extends ParsedUrlQuery {
//   pages: string;
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = arr.map((profile) => {
//     return {
//       params: { profile },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };
// export const getStaticProps: GetStaticProps = async (context) => {
//   const bannerList: object = {
//     main: '게시물',
//     channel: '동영상',
//     saved: '저장됨',
//     tagged: '태그됨',
//   };
//   const { profile } = context.params as IParams;

//   // FIXME: 추후에 다시 수정 (왜 타입이 이상하지?)
//   const userData = (await getProfileData(profile)) as UserData;
//   return {
//     props: { userData, bannerList },
//   };
// };

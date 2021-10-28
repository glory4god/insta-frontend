import fetcher from 'lib/common/fetcher';
import { NEXT_SERVER } from 'config';

import type {
  Profile,
  Board,
  MyUserInfo,
  BaseUser3,
  UserBoards,
} from 'types/profile/types';

export async function getProfileData(pages: string) {
  const data: Profile = await fetcher<Profile>(
    `${NEXT_SERVER}/test/user/profile/${pages}`,
  );
  // const data: UserData[] = testUserData.filter((arr) => {
  //   if (arr.username === pages) {
  //     return arr;
  //   }
  // });
  return data;
}

export async function getProfileIds() {
  const userInfo: BaseUser3[] = await fetcher(`${NEXT_SERVER}/v1/user/ids`);

  const paths = userInfo.map((arr) => {
    return arr.username;
  });

  // const paths: string[] = testUserData.map((arr) => {
  //   return arr.username.toString();
  // });
  return paths;
}

// 유저 팔로우 api
export async function fetchFollow(userId: string, userInfo: BaseUser3[]) {
  return await fetcher(`${NEXT_SERVER}/v1/user/${userId}`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
  });
}

export async function getBase3UserProfile() {
  const userList: BaseUser3[] = await fetcher<BaseUser3[]>(
    `${NEXT_SERVER}/v1/user/ids`,
  );

  // const userList: BaseUser3[] = testUserData.map((arr) => {
  //   return { username: arr.username, imageUrl: arr.imageUrl, name: arr.name };
  // }) as BaseUser3[];

  return userList;
}

// 게시글 유저이름으로 조회
export async function getUserBoard(userId: string) {
  // test 게시글 데이터로 대체
  // return board.filter((arr) => {
  //   if (arr.userId === userId) {
  //     return arr;
  //   }
  // }) as BoardData[];

  const boardList: UserBoards = await fetcher<UserBoards>(
    `${NEXT_SERVER}/test/board/${userId}`,
  );

  return boardList;
}

export const testLoginUserData: MyUserInfo = {
  username: 'winter',
  imageUrl: '/profile/winter.png',
  name: '윈터',
  webSite: 'www.github.com',
  introduce: 'NextLevel!',
  follower: [
    { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
  ],
  following: [
    { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
  ],
  phone: '000-0000-0000',
  email: 'http://insta-frontend.vercel.app/winter',
  sex: '여성',
};

const testUserData: Profile[] = [
  {
    username: 'winter',
    name: '윈터',
    board: 6,
    follower: [
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
    ],
    following: [
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
    ],
    webSite: 'www.github.com',
    phone: '000-0000-0000',
    email: 'http://insta-frontend.vercel.app/winter',
    introduce: '에스빠',
    imageUrl: '/profile/winter.png',
  },
  {
    username: 'irene',
    name: '아이린',
    board: 3,
    follower: [
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
    ],
    following: [
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
    ],
    webSite: 'www.github.com',
    phone: '010-0000-0000',
    email: 'http://insta-frontend.vercel.app/irene',
    introduce: 'red velvet',
    imageUrl: '/profile/irene.png',
  },

  {
    username: 'karina',
    name: '카리나',
    board: 4,
    follower: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
    ],
    following: [
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    webSite: 'www.github.com',
    phone: '010-0000-0000',
    email: 'http://insta-frontend.vercel.app/karina',
    introduce: 'next level',
    imageUrl: '/profile/karina.png',
  },
];

export const testBoardData: Board[] = [
  {
    boardId: '1',
    username: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: [
      '/profile/winter1.png',
      '/profile/winter2.png',
      '/profile/winter1.png',
    ],
    title:
      "I'm on the Next Level Yeah✨✨\n절대적 룰을 지켜\n내 손을 놓지 말아\n결속은 나의 무기\n광야로 걸어가",
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '아니 도대체 언제 컴백해??????? 언제 기다려',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [
          {
            username: 'winter',
            name: '윈터',
            imageUrl: '/profile/winter.png',
            content: '좀만 기다려주세용',
            createdDate: '2021-09-08',
            modifiedDate: '2021-09-08',
            reReply: [],
          },
        ],
      },
      {
        username: 'irene',
        name: '아이린',
        imageUrl: '/profile/irene.png',
        content: '이ㅃㅓ이뻐',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '2',
    username: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter2.png'],
    title:
      '안녕히 계세요 여러분🙋‍♀️\n\n저는 행복을 찾아 떠납니다!\n모두 행복하세요!!🧡💛💚',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당!',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '3',
    username: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter3.png'],
    title:
      "I'm on the Next Level\n저 너머의 문을 열어\nNext Level\n널 결국엔 내가 부셔😢\nNext Level\nKOSMO에 닿을 때까지\nNext Level\n제껴라 제껴라 제껴라🎶",
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [],
  },
  {
    boardId: '4',
    username: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter4.png'],
    title: '윈터 4',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '5',
    username: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter5.png'],
    title: '윈터 5',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'irene',
        name: '아이린',
        imageUrl: '/profile/irene.png',
        content: '이쁘당',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '6',
    username: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter6.png'],
    title: '윈터 6',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'irene',
        name: '아이린',
        imageUrl: '/profile/irene.png',
        content: '이쁘당',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '7',
    username: 'karina',
    name: '카리나',
    imageUrl: '/profile/karina.png',
    boardImageUrl: ['/profile/karina1.png'],
    title: '카리나 1',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '8',
    username: 'karina',
    name: '카리나',
    imageUrl: '/profile/karina.png',
    boardImageUrl: ['/profile/karina2.png'],
    title: '카리나 2',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '9',
    username: 'karina',
    name: '카리나',
    imageUrl: '/profile/karina.png',
    boardImageUrl: ['/profile/karina3.png'],
    title: '카리나 3',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '10',
    username: 'karina',
    name: '카리나',
    imageUrl: '/profile/karina.png',
    boardImageUrl: ['/profile/karina4.png'],
    title: '카리나 4',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
  {
    boardId: '11',
    username: 'irene',
    name: '아이린',
    imageUrl: '/profile/irene.png',
    boardImageUrl: ['/profile/irene.png'],
    title: '아이린 1',
    favorite: [
      { username: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { username: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { username: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        username: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [],
      },
    ],
  },
];

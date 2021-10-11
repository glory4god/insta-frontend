import { NEXT_SERVER } from 'config';
import fetcher from 'lib/common/fetcher';
import type {
  UserData,
  Board,
  MyUserInfo,
  BaseUser3,
} from 'types/profile/types';

export async function getProfileData(pages: string) {
  return (await fetch(`${NEXT_SERVER}/user/${pages}`).then((res) =>
    res.json(),
  )) as UserData;
}

export async function getProfileIds() {
  const userInfo: BaseUser3[] = await fetch(`${NEXT_SERVER}/user/ids`).then(
    (res) => res.json(),
  );

  const paths = userInfo.map((arr) => {
    return arr.id;
  });

  // const paths: string[] = testUserData.map((arr) => {
  //   return arr.id.toString();
  // });
  return paths;
}

export async function getBase3UserProfile() {
  return (await fetch(`${NEXT_SERVER}/user/ids`).then((res) =>
    res.json(),
  )) as BaseUser3[];
}

// 게시글 유저이름으로 조회
export async function getUserBoard(name: string) {
  // test 게시글 데이터로 대체
  // return board.filter((arr) => {
  //   if (arr.name === name) {
  //     return arr;
  //   }
  // }) as BoardData[];

  return (await fetch(`${NEXT_SERVER}/board?userId=${name}`).then(
    (res) => res.json,
  )) as Board[];
}

export const testLoginUserData: MyUserInfo = {
  id: 'winter',
  imageUrl: '/profile/winter.png',
  name: '윈터',
  webSite: 'www.github.com',
  introduce: 'NextLevel!',
  follower: [{ id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' }],
  following: [
    { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
  ],
  phone: '000-0000-0000',
  email: 'http://insta-frontend.vercel.app/winter',
  sex: '여성',
};

const testUserData: UserData[] = [
  {
    id: 'winter',
    name: '윈터',
    board: 6,
    follower: [
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
    ],
    following: [
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
    ],
    webSite: 'www.github.com',
    phone: '000-0000-0000',
    email: 'http://insta-frontend.vercel.app/winter',
    introduce: '에스빠',
    imageUrl: '/profile/winter.png',
  },
  {
    id: 'irene',
    name: '아이린',
    board: 3,
    follower: [
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
    ],
    following: [
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
    ],
    webSite: 'www.github.com',
    phone: '010-0000-0000',
    email: 'http://insta-frontend.vercel.app/irene',
    introduce: 'red velvet',
    imageUrl: '/profile/irene.png',
  },

  {
    id: 'karina',
    name: '카리나',
    board: 4,
    follower: [{ id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' }],
    following: [
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
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
    id: 'winter',
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
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        name: '카리나',
        imageUrl: '/profile/karina1.png',
        content: '아니 도대체 언제 컴백해??????? 언제 기다려',
        createdDate: '2021-09-08',
        modifiedDate: '2021-09-08',
        reReply: [
          {
            id: 'winter',
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
        id: 'irene',
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
    id: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter2.png'],
    title:
      '안녕히 계세요 여러분🙋‍♀️\n\n저는 행복을 찾아 떠납니다!\n모두 행복하세요!!🧡💛💚',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
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
    id: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter3.png'],
    title:
      "I'm on the Next Level\n저 너머의 문을 열어\nNext Level\n널 결국엔 내가 부셔😢\nNext Level\nKOSMO에 닿을 때까지\nNext Level\n제껴라 제껴라 제껴라🎶",
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [],
  },
  {
    boardId: '4',
    id: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter4.png'],
    title: '윈터 4',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
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
    id: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter5.png'],
    title: '윈터 5',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'irene',
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
    id: 'winter',
    name: '윈터',
    imageUrl: '/profile/winter.png',
    boardImageUrl: ['/profile/winter6.png'],
    title: '윈터 6',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'irene',
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
    id: 'karina',
    name: '카리나',
    imageUrl: '/profile/karina.png',
    boardImageUrl: ['/profile/karina1.png'],
    title: '카리나 1',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
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
    id: 'karina',
    name: '카리나',
    imageUrl: '/profile/karina.png',
    boardImageUrl: ['/profile/karina2.png'],
    title: '카리나 2',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
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
    id: 'karina',
    name: '카리나',
    imageUrl: '/profile/karina.png',
    boardImageUrl: ['/profile/karina3.png'],
    title: '카리나 3',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
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
    id: 'karina',
    name: '카리나',
    imageUrl: '/profile/karina.png',
    boardImageUrl: ['/profile/karina4.png'],
    title: '카리나 4',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
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
    id: 'irene',
    name: '아이린',
    imageUrl: '/profile/irene.png',
    boardImageUrl: ['/profile/irene.png'],
    title: '아이린 1',
    favorite: [
      { id: 'winter', name: '윈터', imageUrl: '/profile/winter.png' },
      { id: 'karina', name: '카리나', imageUrl: '/profile/karina.png' },
      { id: 'irene', name: '아이린', imageUrl: '/profile/irene.png' },
    ],
    createdDate: '2021-09-08',
    modifiedDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
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

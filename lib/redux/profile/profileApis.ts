import type { UserData, Board } from 'types/profile/types';

export async function getProfileData(pages: string) {
  const data: UserData[] = testUserData.filter((arr) => {
    if (arr.id === pages) {
      return arr;
    }
  });
  return data[0];
}

export async function getProfileIds() {
  const paths: string[] = testUserData.map((arr) => {
    return arr.id.toString();
  });
  return paths;
}

const testUserData: UserData[] = [
  {
    id: 'winter',
    name: '윈터',
    board: 6,
    follower: [
      { id: 'karina', imageUrl: '/profile/karina.png' },
      { id: 'irene', imageUrl: '/profile/irene.png' },
    ],
    following: [{ id: 'karina', imageUrl: '/profile/karina.png' }],
    webSite: 'www.github.com',
    phone: '010-0000-0000',
    email: 'winter@facebook.com',
    sex: '여성',
    introduce: '에스빠',
    imageUrl: '/profile/winter.png',
  },
  {
    id: 'irene',
    name: '아이린',
    board: 3,
    follower: [{ id: 'irene', imageUrl: '/profile/irene.png' }],
    following: [{ id: 'karina', imageUrl: '/profile/karina.png' }],
    webSite: 'www.github.com',
    phone: '010-0000-0000',
    email: 'irene@facebook.com',
    sex: '여성',
    introduce: 'red velvet',
    imageUrl: '/profile/irene.png',
  },

  {
    id: 'karina',
    name: '카리나',
    board: 4,
    follower: [{ id: 'winter', imageUrl: '/profile/winter.png' }],
    following: [{ id: 'irene', imageUrl: '/profile/irene.png' }],
    webSite: 'www.github.com',
    phone: '010-0000-0000',
    email: 'karina@facebook.com',
    sex: '여성',
    introduce: 'next level',
    imageUrl: '/profile/karina.png',
  },
];

export async function getUserBoard(name: string) {
  // test 게시글 데이터로 대체
  // return board.filter((arr) => {
  //   if (arr.name === name) {
  //     return arr;
  //   }
  // }) as BoardData[];

  return testBoardData.filter((arr) => {
    if (arr.id === name) {
      return arr;
    }
  }) as Board[];
}

export const testBoardData: Board[] = [
  {
    id: 'winter',
    imageUrl: ['/profile/winter1.png', '/profile/winter4.png'],
    title: '윈터 1',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
      {
        id: 'irene',
        imageUrl: '/profile/irene.png',
        content: '이ㅃㅓ이뻐',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'winter',
    imageUrl: ['/profile/winter2.png'],
    title: '윈터 2',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당!',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'winter',
    imageUrl: ['/profile/winter3.png'],
    title: '윈터 3',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당!!',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'winter',
    imageUrl: ['/profile/winter4.png'],
    title: '윈터 4',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'winter',
    imageUrl: ['/profile/winter5.png'],
    title: '윈터 5',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'irene',
        imageUrl: '/profile/irene.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'winter',
    imageUrl: ['/profile/winter6.png'],
    title: '윈터 6',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'irene',
        imageUrl: '/profile/irene.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'karina',
    imageUrl: ['/profile/karina1.png'],
    title: '카리나 1',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'karina',
    imageUrl: ['/profile/karina2.png'],
    title: '카리나 2',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'karina',
    imageUrl: ['/profile/karina3.png'],
    title: '카리나 3',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'karina',
    imageUrl: ['/profile/karina4.png'],
    title: '카리나 4',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
    ],
  },
  {
    id: 'irene',
    imageUrl: ['/profile/irene.png'],
    title: '아이린 1',
    favorite: [
      { id: 'winter', imageUrl: '/profile/winter.png' },
      { id: 'winter2', imageUrl: '/profile/winter.png' },
      { id: 'winter3', imageUrl: '/profile/winter.png' },
      { id: 'winter4', imageUrl: '/profile/winter.png' },
    ],
    createdDate: '2021-09-08',
    reply: [
      {
        id: 'karina',
        imageUrl: '/profile/karina1.png',
        content: '이쁘당',
        createdDate: '20210919',
      },
    ],
  },
];

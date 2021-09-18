import type { UserData, BoardData, Board } from 'types/profile/types';

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
    follower: ['karina', 'irene', 'young'],
    following: ['karina', 'young'],
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
    follower: ['irene'],
    following: ['karina', 'irene', 'young'],
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
    follower: ['karina', 'irene', 'young'],
    following: ['karina', 'irene'],
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
    if (arr.name === name) {
      return arr;
    }
  }) as Board[];
}

export const testBoardData: Board[] = [
  {
    name: 'winter',
    imageUrl: ['/profile/winter1.png'],
    title: '윈터 1',
    good: 12333,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter1.png'],
    title: '윈터 1',
    good: 12333,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter1.png'],
    title: '윈터 1',
    good: 12333,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter1.png'],
    title: '윈터 1',
    good: 12333,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter1.png'],
    title: '윈터 1',
    good: 12333,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter2.png'],
    title: '윈터 2',
    good: 123123,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter3.png'],
    title: '윈터 3',
    good: 15124124,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter4.png'],
    title: '윈터 4',
    good: 4235,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter5.png'],
    title: '윈터 5',
    good: 312312,
    createdDate: '2021-09-08',
  },
  {
    name: 'winter',
    imageUrl: ['/profile/winter6.png'],
    title: '윈터 6',
    good: 123434,
    createdDate: '2021-09-08',
  },
  {
    name: 'karina',
    imageUrl: ['/profile/karina1.png'],
    title: '카리나 1',
    good: 72434,
    createdDate: '2021-09-08',
  },
  {
    name: 'karina',
    imageUrl: ['/profile/karina2.png'],
    title: '카리나 2',
    good: 845574,
    createdDate: '2021-09-08',
  },
  {
    name: 'karina',
    imageUrl: ['/profile/karina3.png'],
    title: '카리나 3',
    good: 6748,
    createdDate: '2021-09-08',
  },
  {
    name: 'karina',
    imageUrl: ['/profile/karina4.png'],
    title: '카리나 4',
    good: 467979,
    createdDate: '2021-09-08',
  },
  {
    name: 'irene',
    imageUrl: ['/profile/irene.png'],
    title: '아이린 1',
    good: 796789,
    createdDate: '2021-09-08',
  },
];

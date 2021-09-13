import type { UserData, BoardData } from 'types/profile/types';

export async function getProfileData(pages: string) {
  const data: UserData[] = testData.filter((arr) => {
    if (arr.id === pages) {
      return arr;
    }
  });
  return data[0];
}

export async function getProfileIds() {
  const paths: string[] = testData.map((arr) => {
    return arr.id.toString();
  });
  return paths;
}

export async function getUserBoard(name: string) {
  const filter: BoardData[] = board.filter((arr) => {
    if (arr.name === name) {
      return arr;
    }
  });
  return filter[0];
}

const testData: UserData[] = [
  {
    id: 'winter',
    name: '윈터',
    board: 6,
    follower: 10272334,
    following: 100,
    introduce: '에스빠',
    imageUrl: '/profile/winter.png',
  },
  {
    id: 'irene',
    name: '아이린',
    board: 3,
    follower: 10000000,
    following: 1002,
    introduce: 'red velvet',
    imageUrl: '/profile/irene.png',
  },

  {
    id: 'karina',
    name: '카리나',
    board: 4,
    follower: 1000090,
    following: 100,
    introduce: 'next level',
    imageUrl: '/profile/karina.png',
  },
];

const board: BoardData[] = [
  {
    name: 'winter',
    imageUrl: [
      '/profile/winter1.png',
      '/profile/winter2.png',
      '/profile/winter3.png',
      '/profile/winter4.png',
      '/profile/winter5.png',
      '/profile/winter6.png',
    ],
  },
  {
    name: 'karina',
    imageUrl: [
      '/profile/karina1.png',
      '/profile/karina2.png',
      '/profile/karina3.png',
      '/profile/karina4.png',
    ],
  },
  {
    name: 'irene',
    imageUrl: ['/profile/irene.png'],
  },
];

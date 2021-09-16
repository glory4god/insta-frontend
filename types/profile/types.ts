export type UserData = {
  id: string;
  name: string;
  board: number;
  follower: number;
  following: number;
  webSite: string;
  introduce: string;
  imageUrl: string;
};

export type BoardData = {
  name: string;
  imageUrl: string[];
};

export type Banner = 'main' | 'saved' | 'channel' | 'tagged';

export type Board = {
  name: string;
  imageUrl: string[];
  title: string;
  good: number;
  createdDate: string;
};

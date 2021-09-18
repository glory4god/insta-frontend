export type UserData = {
  id: string;
  name: string;
  board: number;
  follower: string[];
  following: string[];
  webSite: string;
  introduce: string;
  phone: string;
  imageUrl: string;
  email: string;
  sex: '남성' | '여성' | '비공개';
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

export type UserData = {
  id: string;
  name: string;
  board: number;
  follower: UserIdAndImage[];
  following: UserIdAndImage[];
  webSite: string;
  introduce: string;
  phone: string;
  imageUrl: string;
  email: string;
  sex: '남성' | '여성' | '비공개';
};

export type UserIdAndImage = {
  id: string;
  imageUrl: string;
};

export type Banner = 'main' | 'saved' | 'channel' | 'tagged';

export type Board = {
  id: string;
  imageUrl: string[];
  title: string;
  favorite: UserIdAndImage[];
  createdDate: string;
  reply: Reply[];
};

export type Reply = {
  id: string;
  imageUrl: string;
  content: string;
  createdDate: string;
};

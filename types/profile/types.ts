// 프로필용
export interface UserData extends BaseUser7 {
  board: number;
  follower: UserIdAndImage[];
  following: UserIdAndImage[];
  sex: '남성' | '여성' | '비공개';
}

// 계정용
export interface MyUserInfo extends BaseUser7 {
  sex: '남성' | '여성' | '비공개';
}

export interface BaseUser7 extends BaseUser2 {
  name: string;
  webSite: string;
  introduce: string;
  phone: string;
  email: string;
}

export interface UserIdAndImage extends BaseUser2 {
  id: string;
}

export type Banner = 'main' | 'saved' | 'channel' | 'tagged';

export interface Board extends BaseUser2 {
  boardId: string;
  boardImageUrl: string[];
  title: string;
  favorite: UserIdAndImage[];
  createdDate: string;
  modifiedDate: string;
  reply: Reply[];
}

export interface Reply extends BaseUser2 {
  content: string;
  createdDate: string;
  modifiedDate: string;
  reReply: Reply[];
}

type BaseUser2 = {
  id: string;
  imageUrl: string;
};

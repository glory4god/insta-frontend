// 프로필용
export interface UserData extends BaseUser9 {
  board: number;
}

// 계정용
export interface MyUserInfo extends BaseUser9 {
  sex: '남성' | '여성' | '비공개';
}

export interface BaseUser9 extends BaseUser3 {
  webSite: string;
  introduce: string;
  phone: string;
  email: string;
  follower: BaseUser3[];
  following: BaseUser3[];
}
export type Banner = 'main' | 'saved' | 'channel' | 'tagged';

export interface Board extends BaseUser3 {
  boardId: string;
  imageUrl: string;
  boardImageUrl: string[];
  title: string;
  favorite: BaseUser3[];
  createdDate: string;
  modifiedDate: string;
  reply: Reply[];
}

export interface Reply extends BaseUser3 {
  content: string;
  createdDate: string;
  modifiedDate: string;
  reReply: Reply[];
}

export type BaseUser3 = {
  id: string;
  imageUrl: string;
  name: string;
};

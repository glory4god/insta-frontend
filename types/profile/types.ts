// 프로필용
export interface Profile extends BaseUser9 {
  boardCnt: number;
}

// 계정용
export interface MyUserInfo extends BaseUser9 {
  gender: '남성' | '여성' | '비공개';
}

export interface BaseUser9 extends BaseUser3 {
  webSite: string;
  introduce: string;
  phone: string;
  email: string;
  followerCnt: number;
  followingCnt: number;
}
export type Banner = 'main' | 'saved' | 'channel' | 'tagged';

export interface Board extends BaseUser3 {
  _id: string;
  boardImageUrl: string[];
  content: string;
  favoriteCnt: number;
  commentCnt: number;
  createdDate: string;
  modifiedDate: string;
  location: string;
}

export interface UserBoards {
  writer: BaseUser3;
  boards: Board[];
}

export interface Reply extends BaseUser3 {
  content: string;
  createdDate: string;
  modifiedDate: string;
  reReply: Reply[];
}

export type BaseUser3 = {
  username: string;
  imageUrl: string;
  name: string;
};

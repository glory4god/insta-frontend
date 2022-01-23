export type EditUserProfile = {
  name: string;
  username: string;
  webSite: string;
  introduce: string;
  email: string;
  phone: string;
  gender: Gender;
};

export type Gender = '남성' | '여성' | '비공개';

export interface PasswordEdit {
  prev: string;
  new: string;
  validation: string;
}

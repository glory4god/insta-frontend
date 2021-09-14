export type EditUserProfile = {
  name: string;
  id: string;
  webSite: string;
  introduce: string;
  email: string;
  phone: string;
  sex: Sex;
};

export type Sex = '남성' | '여성' | '비공개';

export interface PasswordEdit {
  prev: string;
  new: string;
  validation: string;
}

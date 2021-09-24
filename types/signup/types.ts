export type EmailProps = {
  email: string;
  setEmail: Function;
};

export type PhonenumberProps = {
  phonenumber: string;
  setPhonenumber: Function;
};

export type SignupProps = {
  id: string;
  setId: Function;
  name: string;
  setName: Function;
  username: string;
  setUsername: Function;
  password: string;
  setPassword: Function;
  setEmail: Function;
  setPhonenumber: Function;
};

export interface IFormInputs {
  id: string;
  name: string;
  username: string;
  password: string;
}

export interface ICodeInputs {
  certificationCode?: string;
}

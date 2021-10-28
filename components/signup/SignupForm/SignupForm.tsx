/* eslint-disable @next/next/no-img-element */ //img
/* eslint-disable @next/next/link-passhref */ //link
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import styled from '@emotion/styled';
import axios from 'axios';
import { AWS_SERVER } from 'config';

type SignupProps = {
  signupData: {
    id: string;
    name: string;
    username: string;
    password: string;
  };
  onchange: (e: any) => void;
  setEmail: (value: string) => void;
  setPhonenumber: (value: string) => void;
};

interface IFormInputs {
  id: string;
  name: string;
  username: string;
  password: string;
}

const SignupForm: React.FC<SignupProps> = ({
  signupData,
  onchange,
  setEmail,
  setPhonenumber,
}) => {
  const { id, name, username, password } = signupData;
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [usernameDuplicate, setUsernameDuplicate] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setEmailDuplicate(false);
    setUsernameDuplicate(false);
    const regExpEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const regExpPhone: RegExp = /^01[016789][0-9]{8}$/;
    if (regExpEmail.test(id)) {
      const sendData = {
        email: id,
        name: name,
        username: username,
        password: password,
      };
      axios
        .post(`${AWS_SERVER}/user/signup`, sendData)
        .then((res: { data: any }) => {
          const data = res.data;
          setEmail(id);
        })
        .catch((err: { response: { data: { message: any } } }) => {
          // console.clear();
          if (err.response.data.message === '중복된 EMAIL 이 존재합니다.') {
            setEmailDuplicate(true);
          }
          if (err.response.data.message === '이미 존재하는 USERNAME 입니다.') {
            setUsernameDuplicate(true);
          }
        });
    }
    // if (regExpPhone.test(data.id)) setPhonenumber(data.id);
  };

  return (
    <SignupWrapper>
      <MainWrapper>
        <H1
          style={{
            backgroundImage: `url(/instagramIcon.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 -130px',
          }}></H1>
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <H2>친구들의 사진과 동영상을 보려면 가입하세요.</H2>
              <ButtonWrapper>
                <FacebookButton>
                  <FacebookIcon
                    style={{
                      backgroundImage: `url(/instagramIcon.png)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '-414px -300px',
                    }}
                  />
                  <span>Facebook으로 로그인</span>
                </FacebookButton>
              </ButtonWrapper>
              <HorizonWrapper>
                <HorizonBar />
                <HorizonText>또는</HorizonText>
                <HorizonBar />
              </HorizonWrapper>
              <LabelWrapper>
                <Label htmlFor="id">
                  <Span value={id}>휴대폰 번호 또는 이메일 주소</Span>
                  <Input
                    {...register('id', { required: true })}
                    autoCorrect="off"
                    maxLength={75}
                    name="id"
                    type="text"
                    value={id}
                    onChange={onchange}
                  />
                </Label>
                <div></div>
                {/* <p>{errors.username && "username is required"}</p> */}
              </LabelWrapper>
              <LabelWrapper>
                <Label htmlFor="name">
                  <Span value={name}>성명</Span>
                  <Input
                    {...register('name', { required: true })}
                    autoCorrect="off"
                    maxLength={75}
                    name="name"
                    type="text"
                    value={name}
                    onChange={onchange}
                  />
                </Label>
                <div></div>
                {/* <p>{errors.username && "username is required"}</p> */}
              </LabelWrapper>
              <LabelWrapper>
                <Label htmlFor="username">
                  <Span value={username}>사용자 이름</Span>
                  <Input
                    {...register('username', { required: true })}
                    autoCorrect="off"
                    maxLength={75}
                    name="username"
                    type="text"
                    value={username}
                    onChange={onchange}
                  />
                </Label>
                <div></div>
                {/* <p>{errors.username && "username is required"}</p> */}
              </LabelWrapper>
              <LabelWrapper>
                <Label htmlFor="password">
                  <Span value={password}>비밀번호</Span>
                  <Input
                    {...register('password', { required: true })}
                    autoCorrect="off"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onchange}
                  />
                </Label>
                <div></div>
              </LabelWrapper>
              <ButtonWrapper>
                <SignupButton
                  disabled={
                    password.length < 6
                      ? true
                      : (!id ? true : !username)
                      ? true
                      : false
                  }>
                  <div>가입하기</div>
                </SignupButton>
              </ButtonWrapper>
              <ErrorWrapper>
                <p>{emailDuplicate && '이미 존재하는 이메일입니다.'}</p>
                <p>{usernameDuplicate && '이미 존재하는 사용자 이름입니다.'}</p>
              </ErrorWrapper>
            </div>
          </Form>
        </div>
      </MainWrapper>
      <LinkWrapper>
        <div>
          <p>
            계정이 있으신가요?&nbsp;
            <Link href="/login">
              <a>
                <span>로그인</span>
              </a>
            </Link>
          </p>
        </div>
      </LinkWrapper>
      <DownloadWrapper>
        <p>앱을 다운로드하세요.</p>
        <div>
          <Link href="/">
            <a>
              <img
                src="/login/appstore.png"
                width="136px"
                height="40px"
                alt=""
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <img
                src="/login/googleplay.png"
                width="136px"
                height="40px"
                alt=""
              />
            </a>
          </Link>
        </div>
      </DownloadWrapper>
    </SignupWrapper>
  );
};

export default SignupForm;

const SignupWrapper = styled.div`
  color: #262626;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 12px;
  max-width: 350px;
`;

const MainWrapper = styled.div`
  width: 350px;
  height: 490px;
  background-color: #fff;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-radius: 1px;
  margin: 0 0 10px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  & > div {
    // height: 337px;
  }
`;

const LinkWrapper = styled.div`
  width: 350px;
  max-height: 64px;
  background-color: #fff;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-radius: 1px;
  margin: 0 0 10px;
  padding: 10px 0;
  & > div {
    display: flex;
    justify-content: center;
    & > p {
      font-size: 14px;
      margin: 15px;
      text-align: center;
      & > a {
        color: rgba(var(--d69, 0, 149, 246), 1);
        font-weight: 600;
      }
    }
  }
`;

const DownloadWrapper = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    margin: 12px 0;
    font-size: 14px;
  }
  & > div {
    margin: 10px 0 10px 0;
    & > a:first-of-type {
      margin-right: 8px;
    }
  }
`;

const H1 = styled.h1`
  display: block;
  width: 175px;
  height: 51px;
  margin: 22px auto 12px;
  overflow: hidden;
  white-space: nowrap;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const H2 = styled.h2`
  color: #8e8e8e;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  margin: 0 40px 10px;
  text-align: center;
`;

const LabelWrapper = styled.div`
  display: flex;
  border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
  border-radius: 3px;
  margin: 0 40px 6px;
  & > div {
    width: 8px;
    background: rgba(var(--b3f, 250, 250, 250), 1);
  }
`;

const Label = styled.label`
  display: flex;
  height: 36px;
  -webkit-box-flex: 1;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
`;

type SpanTypes = {
  value?: string;
};

const Span = styled.span<SpanTypes>`
  color: rgba(var(--f52, 142, 142, 142), 1);
  font-size: 12px;
  height: 36px;
  left: 8px;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-overflow: ellipsis;
  ${(props) =>
    props.value && 'transform: scale(.83333) translate(-26px, -10px) '}
`;

const Input = styled.input<SpanTypes>`
  width: 250px;
  background: #fafafa;
  background: rgba(var(--b3f, 250, 250, 250), 1);
  border: 0;
  flex: 1 0 auto;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: 9px 0 7px 8px;
  text-overflow: ellipsis;
  ${(props) => props.value && 'font-size: 12px; padding: 14px 0 2px 8px'}
`;

const ButtonWrapper = styled.div`
  margin: 8px 40px;
`;

const SignupButton = styled.button`
  background-color: rgba(var(--d69, 0, 149, 246), 1);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;
  & > div {
    min-width: 268px;
    height: 30px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  &:disabled {
    background-color: rgba(var(--d69, 0, 149, 246), 0.3);
    cursor: default;
  }
`;

const HorizonWrapper = styled.div`
  width: 268px;
  max-heigth: 15px;
  display: flex;
  margin: 10px 40px 18px;
  & > div {
    font-size: 12px;
  }
`;

const HorizonBar = styled.div`
  background-color: rgba(var(--b38, 219, 219, 219), 1);
  height: 1px;
  position: relative;
  top: 0.45em;
  flex-grow: 1;
`;

const HorizonText = styled.div`
  color: rgba(var(--f52, 142, 142, 142), 1);
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  margin: 0 18px;
`;

const FacebookButton = styled.button`
  width: 268px;
  height: 32px;
  background-color: #0095f6;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    color: #fff;
    font-weight: bold;
  }
`;

const FacebookIcon = styled.span`
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: 0;
  height: 16px;
  width: 16px;
`;

const ErrorWrapper = styled.div`
  color: #ed4956;
  font-size: 14px;
  line-height: 18px;
  margin: 10px 40px;
  & > p {
    margin: 0;
  }
`;

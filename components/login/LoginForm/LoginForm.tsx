/* eslint-disable @next/next/no-img-element */ //img
/* eslint-disable @next/next/link-passhref */ //link
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import styled from '@emotion/styled';

interface IFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInputs>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <LoginWrapper>
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
              <LabelWrapper>
                <Label htmlFor="username">
                  <Span value={username}>
                    전화번호, 사용자 이름 또는 이메일
                  </Span>
                  <Input
                    {...register('username', { required: true })}
                    autoCorrect="off"
                    maxLength={75}
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
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
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </Label>
                <div></div>
              </LabelWrapper>
              <ButtonWrapper>
                <LoginButton
                  disabled={
                    password.length < 6 ? true : !username ? true : false
                  }>
                  <div>로그인</div>
                </LoginButton>
              </ButtonWrapper>
              <HorizonWrapper>
                <HorizonBar />
                <HorizonText>또는</HorizonText>
                <HorizonBar />
              </HorizonWrapper>
              <ButtonWrapper>
                <FacebookButton>
                  <FacebookIcon
                    style={{
                      backgroundImage: `url(/instagramIcon.png)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '-414px -259px',
                    }}
                  />
                  <span>Facebook으로 로그인</span>
                </FacebookButton>
              </ButtonWrapper>
            </div>
            <Link href="/">
              <PasswordLink>비밀번호를 잊으셨나요?</PasswordLink>
            </Link>
          </Form>
        </div>
      </MainWrapper>
      <LinkWrapper>
        <div>
          <p>
            계정이 없으신가요?&nbsp;
            <Link href="/signup">
              <a>
                <span>가입하기</span>
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
    </LoginWrapper>
  );
};

export default LoginForm;

const LoginWrapper = styled.div`
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
  height: 380px;
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
    height: 337px;
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
  min-height: 51px;
  overflow: hidden;
  white-space: nowrap;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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
  value: string;
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

const LoginButton = styled.button`
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
  width: 100%;
  height: 19.2px;
  background-color: #fff;
  border: 0;
  cursor: pointer;
  & > span {
    color: #385185;
    font-weight: bold;
  }
`;

const FacebookIcon = styled.span`
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: 3px;
  height: 16px;
  width: 16px;
`;

const PasswordLink = styled.a`
  color: rgba(var(--fe0, 0, 55, 107), 1);
  font-size: 12px;
  line-height: 14px;
  margin-top: 12px;
  text-align: center;
  cursor: pointer;
`;

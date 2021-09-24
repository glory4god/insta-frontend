/* eslint-disable @next/next/no-img-element */ //img
/* eslint-disable @next/next/link-passhref */ //link
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import styled from '@emotion/styled';
import { EmailProps } from 'types/signup/types'
import { ICodeInputs } from 'types/signup/types'

const Certificaiton: React.FC<EmailProps> = ({email, setEmail}) => {
  const { register, formState: { errors }, handleSubmit } = useForm<ICodeInputs>();
  const [certificationCode, setCertificationCode] = useState('');

  const onSubmit: SubmitHandler<ICodeInputs> = (data) => {
    console.log(data);
  }

  const backForm = () => {
    setEmail("");
  }

  return (
    <SignupWrapper>
      <MainWrapper>
        <InfoWrapper>
            <span
            style={{
                backgroundImage: `url(/instagramIcon2.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '-426px -72px',
            }}></span>
            <div>
              <div>인증 코드 입력</div>
            </div>
            <div>
              <div>{email} 주소로 전송된 인증 코드를 입력하세요.&nbsp;
                <button>코드 재전송.</button>
              </div>
            </div>
        </InfoWrapper>
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <LabelWrapper>
                <Label htmlFor="certificationCode">
                  <Input
                    {...register('certificationCode', { required: true })}
                    autoCorrect="off"
                    placeholder="인증 코드"
                    maxLength={75}
                    name="certificationCode"
                    type="text"
                    value={certificationCode}
                    onChange={(e: { currentTarget: { value: React.SetStateAction<string>; }; }) => setCertificationCode(e.currentTarget.value)}
                  />
                </Label>
                <div></div>
                {/* <p>{errors.username && "username is required"}</p> */}
              </LabelWrapper>
              <ButtonWrapper> 
                <SignupButton
                  disabled={
                    certificationCode.length < 6 ? true : false
                  }>
                  <div>다음</div>
                </SignupButton>
              </ButtonWrapper>
              {/* <ErrorWrapper>
                <p>{errors.name && "이름이 없습니다."}</p>
              </ErrorWrapper> */}
            </div>
          </Form>
          <BackButtonWrapper>
						<button onClick={backForm}>돌아가기</button>
					</BackButtonWrapper>
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

export default Certificaiton;

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

const InfoWrapper = styled.div`
  display: flex;
  height: 185px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  margin-top: 18px;
  padding: 8px 28px;
  & > span {
    display: block;
    height: 72px;
    width: 92px;
  }
  & > div:first-of-type {
    margin-top: 16px;
    margin-bottom: 8px;
    & > div {
      text-align: center;
      font-weight: 600;
      color: #262626;
      font-size: 16px;
      line-height: 24px;
      maring: -6px 0;
    }
  }
  & > div:last-of-type {
    margin: 16px 0;
    & > div {
      text-align: center;
      font-weight: 400;
      color: #262626;
      font-size: 14px;
      line-height: 18px;
      maring: -3px 0 -4px;
      & > button {
        border: 0;
        color: #0095f6;
        display: inline;
        cursor: pointer;
        font-weight: 600;
        background: 0 0;
        padding: 0;
        position: relative;
      }
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8px 0;
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

const Input = styled.input`
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

const BackButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
	& > button {
		border: 0;
		color: #0095f6;
		display: inline;
		cursor: pointer;
		font-weight: 600;
		background: 0 0;
		padding: 0;
		position: relative;
	}
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


import Head from 'next/head';
import styled from '@emotion/styled';
import LoginImage from 'components/login/LoginImage';
import LoginForm from 'components/login/LoginForm';

const Login = () => {
  return (
    <>
      <Head>
        <title>instagram</title>
        <meta name="description" content="instagram" />
      </Head>

      <LoginPage />
    </>
  );
};

export default Login;

export const LoginPage = () => {
  return (
    <LoginMain role="main">
      <article>
        <LoginImage />
        <LoginForm />
      </article>
    </LoginMain>
  )
}

const LoginMain = styled.main`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-contnet: center;
  align-items: center;
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
  & > article {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: center;
    margin: 32px auto 0;
    max-width: 935px;
    padding-bottom: 32px;
    width: 100%;
  }
`;

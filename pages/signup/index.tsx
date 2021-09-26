import React, { useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import {
  SignupForm,
  Certification,
  PhonenumberCertification,
} from 'components/signup';

const Signup: React.FC = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  return (
    <>
      <Head>
        <title>instagram</title>
        <meta name="description" content="instagram" />
      </Head>

      <SignupMain role="main">
        <article>
          {!email && !phonenumber && (
            <SignupForm
              id={id}
              setId={(e) => setId(e.target.value)}
              name={name}
              setName={(e) => setName(e.target.value)}
              username={username}
              setUsername={(e) => setUsername(e.target.value)}
              password={password}
              setPassword={(e) => setPassword(e.target.value)}
              setEmail={(value) => setEmail(value)}
              setPhonenumber={(value) => setPhonenumber(value)}
            />
          )}
          {email && (
            <Certification
              email={email}
              backForm={() => setEmail("")}
            />
          )}
          {phonenumber && (
            <PhonenumberCertification
              phonenumber={phonenumber}
              backForm={() => setPhonenumber("")}
            />
          )}
        </article>
      </SignupMain>
    </>
  );
};

export default Signup;

const SignupMain = styled.main`
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

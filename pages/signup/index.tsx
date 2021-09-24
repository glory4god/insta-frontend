import React, { useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import SignupForm from 'components/signup/SignupForm';
import Certification from 'components/signup/Certification';
import PhonenumberCertification from 'components/signup/PhonenumberCertification';

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
              setId={setId}
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setEmail={setEmail}
              setPhonenumber={setPhonenumber}
            />
          )}
          {email && <Certification email={email} setEmail={setEmail} />}
          {phonenumber && (
            <PhonenumberCertification
              phonenumber={phonenumber}
              setPhonenumber={setPhonenumber}
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

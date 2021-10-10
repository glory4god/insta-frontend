import { FC } from 'react';
import NextHead from 'next/head';

const Head: FC = () => {
  return (
    <>
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          // httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </NextHead>
    </>
  );
};

export default Head;

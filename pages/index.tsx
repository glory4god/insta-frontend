import type { NextPage } from 'next';
import Head from 'next/head';

import { Container } from 'components/ui/Container';
import Footer from 'components/main/Footer';
import styled from '@emotion/styled';

const Main: NextPage = () => {
  return (
    <>
      <Head>
        <title>instagram</title>
        <meta name="description" content="instagram" />
      </Head>

      <Container>
        <main>
          <Section>
            <div>
              <div>스토리</div>
              <div>피드</div>
            </div>
            <div>
              <div>나</div>
              <div>추천</div>
              <Footer />
            </div>
          </Section>
        </main>
      </Container>
    </>
  );
};

export default Main;

const Section = styled.section`
  max-width: 935px;
  padding-top: 84px;
  display: flex;
  & > div:first-of-type {
    float: left;
    margin-right: 28px;
    max-width: 614px;
    width: 100%;
  }
  & > div:last-of-type {
    max-width: 293px;
  }
`

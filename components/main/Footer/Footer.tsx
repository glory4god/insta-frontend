import React from 'react';
import styled from '@emotion/styled';

const Footer = () => {

  return (
    <Wrapper>
      <div>
        {footer.map((arr) => {
          return <span key={arr}>{arr}</span>;
        })}
      </div>
      <span>@ 2021 Instagraom from Facebook</span>
    </Wrapper>
  );
};

export default Footer;

const footer = [
  '소개',
  '도움말',
  '홍보 센서',
  'API',
  '채용 정보',
  '개인정보처리방침',
  '약관',
  '위치',
  '인기 계정',
  '해시태그',
  '언어',
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
  color: #C7C7C7;
  padding-bottom: 38px;
  & > div {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    & > span:not(:last-of-type)::after {
      content: '·';
      margin: 0 .25em 0 .25em;
    }
  }
  & > span {
    display: flex;
  }
`;

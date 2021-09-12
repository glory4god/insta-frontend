import React from 'react';
import s from './Footer.module.css';

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.footer}>
        {footer.map((arr) => {
          return <span key={arr}>{arr}</span>;
        })}
      </div>
      <div className={s.footer}>
        <span>@ 2021 Instagraom from Facebook</span>
      </div>
    </div>
  );
};

export default Footer;

const footer = [
  '소개',
  '블로그',
  '채용 정보',
  '도움말',
  'API',
  '개인정보처리방침',
  '약관',
  '인기 계정',
  '해시태그',
  '위치',
  'Instagram Lite',
];

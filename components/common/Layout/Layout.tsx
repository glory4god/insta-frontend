import React from 'react';
import s from './Layout.module.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from 'lib/redux/login/loginSlice';
import { useRouter } from 'next/dist/client/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { login, id } = useSelector(selectLogin);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!login) {
      router.replace('/login');
    } else {
      // TODO: 로그인이면 여기서 로그인 유저에 대한 정보 담기
    }
  }, [login, router]);

  return (
    <>
      {router.asPath === '/login' || router.asPath === '/signup' ? 
      <section style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <div className={s.layout}>{children}</div>
        <Footer />
      </section> : (router.asPath === '/' ? 
      <>
        <header>
          <Navbar />
        </header>
        <div className={s.layout}>{children}</div>
      </> :
      <>
        <header>
          <Navbar />
        </header>
        <div className={s.layout}>{children}</div>
        <Footer />
      </>
      )}
    </>
  );
}

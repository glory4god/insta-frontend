import React from 'react';
import s from './Layout.module.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { login } = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      {router.asPath === '/login' || router.asPath === '/signup' || (router.asPath === '/' && !login) ? (
        <section
          style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div className={s.layout}>{children}</div>
          <Footer />
        </section>
      ) : router.asPath === '/' ? (
        <>
          <header>
            <Navbar />
          </header>
          <div className={s.layout}>{children}</div>
        </>
      ) : (
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

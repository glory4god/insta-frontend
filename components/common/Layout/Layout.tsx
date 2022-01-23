import React from 'react';
import s from './Layout.module.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import NewPost from 'components/modal/NewPost';
import { selectModal } from 'lib/redux/modal/modalSlice';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { login } = useSelector(selectUser);
  const { showModal } = useSelector(selectModal);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      {showModal.newPost && <NewPost />}
      {router.asPath === '/login' ||
        router.asPath === '/signup' ||
        (router.asPath === '/' && !login) ? (
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

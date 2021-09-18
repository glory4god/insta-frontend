import React from 'react';
import s from './Layout.module.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from 'lib/redux/login/loginSlice';
import { useRouter } from 'next/dist/client/router';
import { setUserData } from 'lib/redux/profile/profileSlice';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { login, name } = useSelector(selectLogin);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!login) {
      router.replace('/login');
    } else {
      dispatch(setUserData(name));
    }
  }, [login, name, router]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className={s.layout}>{children}</div>
      <Footer />
    </>
  );
}

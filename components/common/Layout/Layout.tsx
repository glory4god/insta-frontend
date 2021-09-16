import React from 'react';
import s from './Layout.module.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import { selectModal } from 'lib/redux/modal/modalSlice';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { showBoardModal } = useSelector(selectModal);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className={s.layout}>{children}</div>
      {!showBoardModal && <Footer />}
    </>
  );
}

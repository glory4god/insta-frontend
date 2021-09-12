import React, { FC } from 'react';
import s from './Container.module.css';

interface ContainerProps {
  className?: string;
  children?: any;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={s.container}>{children}</div>;
};

export default React.memo(Container);

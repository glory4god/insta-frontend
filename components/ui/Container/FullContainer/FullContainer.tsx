import React, { FC } from 'react';
import s from '../Container.module.css';

interface ContainerProps {
  className?: string;
  children?: any;
}

const FullContainer: FC<ContainerProps> = ({ children, className }) => {
  return <div className={s.fullContainer}>{children}</div>;
};

export default React.memo(FullContainer);

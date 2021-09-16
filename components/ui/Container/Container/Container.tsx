import React, { FC } from 'react';
import s from '../Container.module.css';
import cn from 'classnames';

interface ContainerProps {
  className?: string;
  children?: any;
  modalOn?: boolean;
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  modalOn = false,
}) => {
  return (
    <div className={cn(s.container, modalOn && s.blockScroll)}>{children}</div>
  );
};

export default React.memo(Container);

import React from 'react';
import Link from 'next/link';
import s from '../CommonModal.module.css';

import { selectModal, setModalInitial } from 'lib/redux/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import cn from 'classnames';

interface ModalProps {
  title: ModalTitle[];
}

type ModalTitle = {
  name: string;
  link: string | null;
};

const Modal: React.FC<ModalProps> = ({
  title = [{ name: '팔로워', link: null }] as ModalTitle[],
}) => {
  const {} = useSelector(selectModal);
  const dispatch = useDispatch();

  const closeModal = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.preventDefault();
    dispatch(setModalInitial());
  };

  return (
    <>
      <div
        className={s.outerContainer}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          closeModal(e);
        }}
      />
      <div className={s.absoluteModal}>
        {title.length === 1 ? (
          <>
            {title?.map((arr, idx) => {
              return (
                <div className={s.header2_bt} key={arr.name + idx}>
                  <Link href={`accounts/${arr.link}`}>
                    <a>
                      <p>
                        <b>{arr.name}</b>
                      </p>
                    </a>
                  </Link>
                </div>
              );
            })}
            <CloseSharpIcon
              onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                e.preventDefault();
                closeModal(e);
              }}
              className={s.out2}
              fontSize="large"
            />
          </>
        ) : (
          <>
            {title.map((arr, idx) => {
              return (
                <div
                  className={cn(
                    title.length - 1 !== idx ? s.header2_bt : s.header2,
                  )}
                  style={{ fontSize: '14px' }}
                  key={arr.name + idx}>
                  <Link href={`accounts/${arr.link}`}>
                    <a>
                      <p>{arr.name}</p>
                    </a>
                  </Link>
                </div>
              );
            })}
          </>
        )}
        {}

        {/* TODO: 테스트 데이터 만든 후에 방법적용 */}
        <div></div>
      </div>
    </>
  );
};

export default Modal;

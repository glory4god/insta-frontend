/* eslint-disable @next/next/no-img-element */
import React from 'react';
import s from './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={s.svg}>

      <symbol id="s--circle">
        <circle r="8" cx="40" cy="40"></circle>
      </symbol>

      <g className={s.gCircles}>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
        <g className={s.gCircle}>
          <use xlinkHref="#s--circle" className={s.uCircle} />
        </g>
      </g>
    </svg>
  )
};

export default Loading;
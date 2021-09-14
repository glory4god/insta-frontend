import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const sliders: { imageURL: string }[] = [
  { imageURL: '/login/slider1.jpg' },
  { imageURL: '/login/slider2.jpg' },
  { imageURL: '/login/slider3.jpg' },
  { imageURL: '/login/slider4.jpg' },
  { imageURL: '/login/slider5.jpg' },
]

const LoginImage: React.FC = () => {
  const [current, setCurrent] = useState(0)

  //useInterval hook 만들어서 사용
  useInterval(() => {
    setCurrent(current => current === 4 ? 1 : current + 1);
  }, 5000);

  function useInterval(callback: (() => void) | undefined, delay: number | undefined) {
    const savedCallback: any = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }
  return (
    <ImgWrapper style={{ backgroundImage: `url(/login/loginBackground.png)` }}>
      {sliders.map((slider, index) =>
        <Slider
          key={index}
          index={index}
          current={current}
          src={slider.imageURL}
          width={'240px'}
          height={'427px'}
          alt='' />
      )}
    </ImgWrapper>
  )
}

export default LoginImage;

type BannerProps = {
  index: number;
  current: number;
}

const ImgWrapper = styled.div`
  position: relative;
  align-self: center;
  background-position: 0 0;
  background-size: 454px 618px;
  flex-basis: 454px;
  height: 618px;
  margin-left: -35px;
  margin-right: -15px;
`;

const Slider = styled.img<BannerProps>`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  opacity: ${props => props.index === props.current ? 1 : 0};
  transform: translate(150px, 99px);
  transition: opacity 2s ease-in-out;
`;
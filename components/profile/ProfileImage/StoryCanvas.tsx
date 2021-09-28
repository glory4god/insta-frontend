import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled'

function StoryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let arcAngle: number = 0;
  let arcLength: number = 0;

  const drawLine = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      const gradient = context.createLinearGradient(455, 0, 0, 455);
      gradient.addColorStop(0, '#FF0000');
      gradient.addColorStop(1, '#FFFF00');

      context.beginPath();
      context.clearRect(0, 0, 455, 455);
      context.fillStyle = '#FAFAFAFD';
      context.closePath();

      for (let i = 0; i < 44; i += 2) {
        context.beginPath();
        context.arc(222, 222, 216,
          Math.PI * 2 * (arcAngle + 0.0005 * 35 * i),
          Math.PI * 2 * (arcAngle + 0.0005 * (35 * i + (5 + arcLength) * (i / 4 + 1))), false);
        context.lineWidth = 6;
        context.strokeStyle = gradient;
        context.stroke();
        context.closePath();
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: any = canvas.getContext('2d');
    const dpr = window.devicePixelRatio;

    canvas.width = 455 * dpr;
    canvas.height = 455 * dpr;

    // CSS에서 설정한 크기와 맞춰주기 위한 scale 조정
    context.scale(dpr, dpr);
    animation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animation = () => {
    if (!canvasRef.current) {
      return;
    }
    arcAngle += 0.008;
    if (arcAngle > 0.3) {
      arcLength = arcLength + 0.8;
    }
    drawLine();
    if (arcAngle < 1) {
      requestAnimationFrame(animation);
    }
  }

  return (
    <Canvas ref={canvasRef} width={'455'} height={'455'} />
  );
}

const Canvas = styled.canvas`
    width: 87px;
    height: 87px;
    position: absolute;
    transform: translate(1px, 1px);
    @media (min-width: 740px) {
      width: 168px;
      height: 168px;
      transform: translate(2px, 2px);
      }
  `;

export default StoryCanvas;
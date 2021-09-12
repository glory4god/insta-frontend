import React from 'react';
import Image from 'next/image';

interface BoardBoxProps {
  size: number;
  imageUrl: string;
}

const BoardBox: React.FC<BoardBoxProps> = ({ size, imageUrl }) => {
  return (
    <Image
      src={imageUrl}
      width={size}
      height={size}
      alt="게시글"
      layout="responsive"
    />
  );
};

export default BoardBox;

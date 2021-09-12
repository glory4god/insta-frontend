import React from 'react';
import s from './ProfileImage.module.css';
import cn from 'classnames';

interface ImageProps {
  size: 'profile' | 'story' | 's' | 'm' | 'l';
  border?: boolean;
  imageUrl: string;
}

const ProfileImage: React.FC<ImageProps> = ({
  border = false,
  size,
  imageUrl,
}) => {
  return (
    // FIXME: 테두리 색 칠하는건 어떻게 할지 생각해봐야할듯!
    <div className={cn(size === 'profile' && s.container)}>
      <div
        className={cn(
          border && s.border,
          size === 'profile' ? s.borderProfile : '',
          size === 'story' ? s.borderStory : '',
          size === 's' ? s.borderS : '',
          size === 'm' ? s.borderM : '',
          size === 'l' ? s.borderL : '',
        )}>
        <div
          className={cn(
            s.round,
            size === 'profile' && s.profile,
            size === 'story' && s.story,
            size === 's' && s.s,
            size === 'm' && s.m,
            size === 'l' && s.l,
          )}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}></div>
        {/* <Image
          className={s.round}
          // 추후에 imageUrl props로 대체
          src={imageUrl}
          width={size}
          height={size}
          alt="profile"
        /> */}
      </div>
    </div>
  );
};

export default ProfileImage;

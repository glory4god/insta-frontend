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
    // FIXME: 테두리 색 칠하는건 어떻게 할지 생각해봐야할듯!  => 해결 border props true
    // TODO: 스토리 사이드 색깔 나오는 효과 추가해야함

    // size
    // profile : 프로필 페이지 메인 이미지
    // story : main page or profile page story 이미지
    // s : navbar 오른쪽 상단 프로필 이미지
    // m : 메인 페이지 게시글 왼쪽 상단 프로필 이미지
    // l : 프로필 페이지 반응형 모바일 사이즈 크기
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
      </div>
    </div>
  );
};

export default ProfileImage;

import React from 'react';
import Link from 'next/link';
import s from '../AccountCommon.module.css';

import ProfileInput from 'components/ui/Input';
import { ProfileImage } from 'components/profile';
import { EditUserProfile } from 'types/accounts/types';

import cn from 'classnames';

const AccountEdit = () => {
  const [userProfile, setUserProfile] = React.useState<EditUserProfile>({
    id: '',
    name: '',
    webSite: '',
    introduce: '',
    email: '',
    phone: '',
    sex: '남성',
  });
  const selectBox = ['남성', '여성', '비공개'];

  return (
    <>
      {/* //FIXME: 이 부분 css 해결이 안돼 ...... */}
      <div className={s.header}>
        <div className={cn(s.tit, s.profile)}>
          <ProfileImage size="m" imageUrl={'/profile/winter.png'} />
        </div>
        <div className={s.content}>
          <span className={s.name}>yhy_814</span>
          <div>
            <Link href="">
              <a className={s.changeProfile}>프로필 사진 바꾸기</a>
            </Link>
          </div>
        </div>
      </div>

      {/* TODO: 지금은 하드코딩인데 객체로 바꾼 담에 map으로 간단히 할 수 있을듯! */}
      <div className={s.editbox}>
        <div className={s.tit}>이름</div>
        <div className={s.content}>
          <ProfileInput
            value={userProfile.name}
            onChange={(e) => {
              setUserProfile({ ...userProfile, name: e.target.value });
            }}
            size="s"
          />
          <p>
            이름은 14일 안에 두 번만 변경할 수 있습니다. 어어어어어어어어어어
          </p>
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>사용자 이름</div>
        <div className={s.content}>
          <ProfileInput
            value={userProfile.id}
            onChange={(e) => {
              setUserProfile({ ...userProfile, id: e.target.value });
            }}
            size="s"
          />
          <p>
            대부분의 경우 14일 이내에 사용자 이름을 다시 yhy_814(으)로 변경할 수
            있습니다.
          </p>
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>웹사이트</div>
        <div className={s.content}>
          <ProfileInput
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
                webSite: e.target.value,
              });
            }}
            value={userProfile.webSite}
            size="s"
          />
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>소개</div>
        <div className={s.content}>
          <ProfileInput
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
                introduce: e.target.value,
              });
            }}
            value={userProfile.introduce}
            size="m"
            area={'field'}
          />
          <p>
            <b>개인정보</b>
            <br />
            비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인 정보를
            입력하세요. 공개 프로필에는 포함되지 않습니다.
          </p>
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>이메일</div>
        <div className={s.content}>
          <ProfileInput
            onChange={(e) => {
              setUserProfile({ ...userProfile, email: e.target.value });
            }}
            value={userProfile.email}
            size="s"
          />
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>전화번호</div>
        <div className={s.content}>
          <ProfileInput
            onChange={(e) => {
              setUserProfile({ ...userProfile, phone: e.target.value });
            }}
            value={userProfile.phone}
            size="s"
          />
        </div>
      </div>
      <div className={s.editbox}>
        <div className={s.tit}>성별</div>
        {/* FIXME: 셀렉트 박스형식으로 성별 선택하는거로 바뀌면 좋을듯   =>  셀렉트 박스로 해결  */}
        <select
          value={userProfile.sex}
          // onChange={(e) =>
          //   // FIXME: e.target.value와 타입유추에서 해결방안 고려 ,,,
          //   setUserProfile({
          //     ...userProfile,
          //     sex: e.target.value,
          //   })
          // }
        >
          {selectBox.map((arr, key) => {
            return (
              <option value={arr} key={key}>
                {arr}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default AccountEdit;

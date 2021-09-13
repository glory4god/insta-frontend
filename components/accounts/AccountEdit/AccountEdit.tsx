import React from 'react';
import Link from 'next/link';
import s from './AccountEdit.module.css';

import ProfileInput from 'components/ui/Input';
import { ProfileImage } from 'components/profile';
import { EditUserProfile } from 'types/accounts/types';

const AccountEdit = () => {
  const [userProfile, setUserProfile] = React.useState<EditUserProfile>({
    id: '',
    name: '',
    webSite: '',
    introduce: '',
    email: '',
    phone: '',
    sex: '남',
  });
  return (
    <div className={s.editBox}>
      {console.log(userProfile)}
      {
        //FIXME: 이 부분 css 해결이 안돼 ......
        /* <div className={s.profile}>
        <ProfileImage size="m" imageUrl={'/profile/winter.png'} />
        <h3>yhy_814</h3>
        <Link href="">
          <a>프로필 바꾸기</a>
        </Link>
      </div> */
      }
      <div>
        <div>이름</div>
        <div>
          <ProfileInput
            value={userProfile.name}
            onChange={(e) => {
              setUserProfile(() => ({ ...userProfile, name: e.target.value }));
            }}
            size="s"
          />
          <p>
            이름은 14일 안에 두 번만 변경할 수 있습니다. 어어어어어어어어어어
          </p>
        </div>
      </div>
      <div>
        <div>사용자 이름</div>
        <div>
          <ProfileInput
            value={userProfile.id}
            onChange={(e) => {
              setUserProfile(() => ({ ...userProfile, id: e.target.value }));
            }}
            size="s"
          />
          <p>
            대부분의 경우 14일 이내에 사용자 이름을 다시 yhy_814(으)로 변경할 수
            있습니다.
          </p>
        </div>
      </div>
      <div>
        <div>웹사이트</div>
        <ProfileInput
          onChange={(e) => {
            setUserProfile(() => ({ ...userProfile, webSite: e.target.value }));
          }}
          value={userProfile.webSite}
          size="s"
        />
      </div>
      <div>
        <div>소개</div>
        <div>
          <ProfileInput
            onChange={(e) => {
              setUserProfile(() => ({
                ...userProfile,
                introduce: e.target.value,
              }));
            }}
            value={userProfile.introduce}
            size="m"
          />
          <p>
            <div>
              <b>개인정보</b>
            </div>
            <br />
            비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인 정보를
            입력하세요. 공개 프로필에는 포함되지 않습니다.
          </p>
        </div>
      </div>
      <div>
        <div>이메일</div>
        <ProfileInput
          onChange={(e) => {
            setUserProfile(() => ({ ...userProfile, email: e.target.value }));
          }}
          value={userProfile.email}
          size="s"
        />
      </div>
      <div>
        <div>전화번호</div>
        <ProfileInput
          onChange={(e) => {
            setUserProfile(() => ({ ...userProfile, phone: e.target.value }));
          }}
          value={userProfile.phone}
          size="s"
        />
      </div>
      <div>
        <div>성별</div>
        {/* FIXME: 셀렉트 박스형식으로 성별 선택하는거로 바뀌면 좋을듯 */}
        {/* <ProfileInput
          onChange={(e) => {
            setUserProfile(() => ({ ...userProfile, sex: e.target.value }));
          }}
          value={userProfile.sex}
          size="s"
        /> */}
      </div>
    </div>
  );
};

export default AccountEdit;

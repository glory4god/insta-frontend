import React, { useEffect } from 'react';
import s from '../AccountCommon.module.scss';

import ProfileInput from 'components/ui/Input';
import { ProfileImage } from 'components/profile';
import { EditUserProfile, Gender } from 'types/accounts/types';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateImageUrl } from 'lib/redux/user/userSlice';
import { accountEditMap } from 'lib/redux/accounts/accountsApis';

import cn from 'classnames';
import axios from 'axios';
import { NEXT_SERVER } from 'config';

const AccountEdit = () => {
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = React.useState<EditUserProfile>({
    username: '',
    name: '',
    webSite: '',
    introduce: '',
    email: '',
    phone: '',
    gender: '비공개',
  });
  const selectBox: Gender[] = ['남성', '여성', '비공개'];

  const accountMap = accountEditMap;

  // 구조 분해를 이용한 input 관리!! 이 부분 진짜 옛날에 왜 쓰는지 이해 안됐었는데 오늘 제대로 이해함 ..
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`${NEXT_SERVER}/v1/profile`, {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((response: { data: EditUserProfile }) => {
        setUserProfile({
          username: response.data.username,
          name: response.data.name,
          webSite: response.data.webSite,
          introduce: response.data.introduce,
          email: response.data.email,
          phone: response.data.phone,
          gender: response.data.gender
        })
      })
  }, []);

  const handleChange = async (event: any) => {
    const file = event.target.files[0];
    if (event.target.files && event.target.files.length > 0) {
      var formdata = new FormData();
      formdata.append('file', file, userInfo.username);
      axios
        .post(`${NEXT_SERVER}/v1/profile/image`, formdata, {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
          onUploadProgress: (event) => {
            console.log(
              `Current progress:`,
              Math.round((event.loaded * 100) / event.total),
            );
          },
        })
        .then((response) => {
          dispatch(updateImageUrl(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const inputImage = () => {
    let elementInputImage: HTMLElement | null = document.getElementById('inputImage');
    elementInputImage?.click();
  }

  const submitUserProfile = () => {
    axios
      .post(`${NEXT_SERVER}/v1/profile`, userProfile, {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((response) => {

      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <div className={s.header}>
        <div className={cn(s.tit, s.profile)}>
          <ProfileImage size="m" imageUrl={userInfo.profileImageUrl} />
        </div>
        <div className={s.content}>
          <span className={s.name}>{userInfo.username}</span>
          <div onClick={inputImage}>
            <div className={s.changeProfile}>프로필 사진 바꾸기</div>
          </div>
          <form style={{ display: 'none' }}>
            <input
              type='file'
              id='inputImage'
              accept="image/jpeg,image/png,image/heic,image/heif"
              onChange={handleChange}
            />
          </form>
        </div>
      </div>

      {/* TODO: 지금은 하드코딩인데 객체로 바꾼 담에 map으로 간단히 할 수 있을듯! 
          => 해결 map 함수와 구조분해를 이용하여 코드 리팩토링 
      */}
      {accountMap.map((arr, idx) => {
        return (
          <div key={idx} className={s.editbox}>
            <div className={s.tit}>{arr.tit}</div>
            <div className={s.content}>
              <ProfileInput
                name={arr.name}
                value={userProfile[arr.name]}
                onChange={onChange}
                size={arr.size}
                area={arr.area}
              />
              {arr.subTag && (
                <p>
                  {arr.tag && (
                    <>
                      <b>{arr.tag}</b>
                      <br />
                    </>
                  )}
                  {arr.subTag}
                </p>
              )}
            </div>
          </div>
        );
      })}
      {/* map으로 반복 완성 ... 지워도 여한이 없다 */}
      {/* <div className={s.editbox}>
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
      </div> */}
      <div className={s.editbox}>
        <div className={s.tit}>성별</div>
        {/* FIXME: 셀렉트 박스형식으로 성별 선택하는거로 바뀌면 좋을듯   =>  셀렉트 박스로 해결  */}
        <select value={userProfile.gender} name={'sex'} onChange={onChange}>
          {selectBox.map((arr, key) => {
            return (
              <option value={arr} key={key}>
                {arr}
              </option>
            );
          })}
        </select>
      </div>
      <div className={s.editbox} style={{ marginTop: '16px' }}>
        <div className={s.tit}></div>
        {/* FIXME: 셀렉트 박스형식으로 성별 선택하는거로 바뀌면 좋을듯   =>  셀렉트 박스로 해결  */}
        <div className={s.content}>
          <div className={s.submit}>
            <button onClick={submitUserProfile}>제출</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountEdit;

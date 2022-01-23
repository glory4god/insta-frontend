// const accountMenuBar = {
//   edit: '프로필 편집',
//   password_change: '비밀번호 변경',
//   manage_access: '앱 및 웹사이트',
//   emails: '이메일 및 SMS',
//   push: '푸시 알림',
//   contact: '연락처 관리',
//   security: '개인정보 및 보안',
//   activity: '로그인 활동',
//   professional: '프로페셔널 계정으로 전환',
// };
export const accountMenuBar = [
  {
    link: '/accounts/edit',
    name: '프로필 편집',
  },
  {
    link: '/accounts/password_change',
    name: '비밀번호 변경',
  },
  {
    link: '/accounts/manage_access',
    name: '앱 및 웹사이트',
  },
  {
    link: '/accounts/emails',
    name: '이메일 및 SMS',
  },
  {
    link: '/accounts/push',
    name: '푸시 알림',
  },
  {
    link: '/accounts/contact',
    name: '연락처 관리',
  },
  {
    link: '/accounts/security',
    name: '개인정보 및 보안',
  },
  {
    link: '/accounts/activity',
    name: '로그인 활동',
  },
  {
    link: '/accounts/professional',
    name: '프로페셔널 계정으로 전환',
  },
];

export function getAccountsIds() {
  return accountMenuBar.map((arr) => {
    return arr.link.substr(10);
  });
}

type AccountEditMap = {
  tit: string;
  name: 'name' | 'username' | 'webSite' | 'introduce' | 'email' | 'phone';
  // 이 부분을 각각 설정한 이유는 string literal type 에 관한 이야기! 객체의 key로 접근하려면 그냥 string이 아닌 string literal type으로 접근해야함
  tag?: string;
  subTag?: string;
  size: 's' | 'm';
  area: 'line' | 'field';
};

export const accountEditMap: AccountEditMap[] = [
  {
    tit: '이름',
    name: 'name',
    subTag: '이름은 14일 안에 두 번만 변경할 수 있습니다.',
    size: 's',
    area: 'line',
  },
  {
    tit: '사용자 이름',
    name: 'username',
    subTag: `대부분의 경우 14일 이내에 사용자 이름을 바꾸기 전 이름으로 변경할 수 있습니다.`,
    size: 's',
    area: 'line',
  },
  {
    tit: '웹사이트',
    name: 'webSite',
    size: 's',
    area: 'line',
  },
  {
    tit: '소개',
    name: 'introduce',
    tag: '개인정보',
    subTag:
      '비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인 정보를 입력하세요. 공개 프로필에는 포함되지 않습니다.',
    size: 's',
    area: 'field',
  },
  {
    tit: '이메일',
    name: 'email',
    size: 's',
    area: 'line',
  },
  {
    tit: '전화번호',
    name: 'phone',
    size: 's',
    area: 'line',
  },
];

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
    link: 'edit',
    name: '프로필 편집',
  },
  {
    link: 'password_change',
    name: '비밀번호 변경',
  },
  {
    link: 'manage_access',
    name: '앱 및 웹사이트',
  },
  {
    link: 'emails',
    name: '이메일 및 SMS',
  },
  {
    link: 'push',
    name: '푸시 알림',
  },
  {
    link: 'contact',
    name: '연락처 관리',
  },
  {
    link: 'security',
    name: '개인정보 및 보안',
  },
  {
    link: 'activity',
    name: '로그인 활동',
  },
  {
    link: 'professional',
    name: '프로페셔널 계정으로 전환',
  },
];

export function getAccountsIds() {
  return accountMenuBar.map((arr) => {
    return arr.link;
  });
}

export function getAccountsIds() {
  return Object.keys(accountMenuBar);
}
export function getAccountsValues() {
  return Object.values(accountMenuBar);
}

const accountMenuBar = {
  edit: '프로필 편집',
  password_change: '비밀번호 변경',
  manage_access: '앱 및 웹사이트',
  email: '이메일 및 SMS',
  push: '푸쉬 알림',
  contact_history: '연락처 관리',
  privacy_and_security: '공개 범위 및 보안',
};

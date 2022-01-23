import { NEXT_SERVER } from 'config';
import fetcher from 'lib/common/fetcher';

export const followChecker = async (userId: string, token: string) => {
  return (await fetcher(`${NEXT_SERVER}/v1/user/checkFollow/${userId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })) as { check: boolean };
};

import { NEXT_SERVER } from 'config';
import fetcher from 'lib/common/fetcher';
import { Follows } from 'types/profile/types';

export async function fetchFollows(username: string) {
  return (await fetcher(
    `${NEXT_SERVER}/v1/user/follows/${username}`,
  )) as Follows[];
}

export async function fetchFollowers(username: string) {
  return (await fetcher(
    `${NEXT_SERVER}/v1/user/followers/${username}`,
  )) as Follows[];
}

export async function fetchFavorites(boardId: string, token: string) {
  return (await fetcher(`${NEXT_SERVER}/v1/board/favorite/${boardId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })) as Follows[];
}

import { NEXT_SERVER } from 'config';
import fetcher from 'lib/common/fetcher';
import { Follows } from 'types/profile/types';

export async function fetchFollows(username: string) {
  return (await fetcher(
    `${NEXT_SERVER}/test/follows/${username}`,
  )) as Follows[];
}

export async function fetchFollowers(username: string) {
  return (await fetcher(
    `${NEXT_SERVER}/test/followers/${username}`,
  )) as Follows[];
}

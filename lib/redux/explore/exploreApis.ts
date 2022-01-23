import { NEXT_SERVER } from 'config';
import fetcher from 'lib/common/fetcher';
import { UserBoards } from 'types/profile/types';

export async function getAllBoard() {
  return await fetcher<UserBoards>(`${NEXT_SERVER}/v1/board`);
}

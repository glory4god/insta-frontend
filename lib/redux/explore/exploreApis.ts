import { NEXT_SERVER } from 'config';
import fetcher from 'lib/common/fetcher';
import { testBoardData } from 'lib/redux/profile/profileApis';
import { Board } from 'types/profile/types';

export async function getAllBoard() {
  return await fetcher<Board[]>(`${NEXT_SERVER}/v1/board`);
}

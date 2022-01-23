import { NEXT_SERVER } from 'config';
import { PostReply } from 'types/profile/types';

export const fetchDeleteGood = async (boardId: string, token: string) => {
  return await fetch(`${NEXT_SERVER}/v1/board/favorite/${boardId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchPostGood = async (boardId: string, token: string) => {
  return await fetch(`${NEXT_SERVER}/v1/board/favorite/${boardId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchGetComment = async (boardId: string) => {
  return await fetch(`${NEXT_SERVER}/v1/board/comment/${boardId}`);
};

export const fetchPostComment = async (
  boardId: string,
  token: string,
  post: PostReply,
) => {
  return await fetch(`${NEXT_SERVER}/v1/board/comment/${boardId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
};

export const fetchDeleteComment = async (boardId: string, token: string) => {
  return await fetch(`${NEXT_SERVER}/v1/board/comment/${boardId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default async function fetcher<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    //TODO: error handling
    throw new Error('ERROR!');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('[fether.ts] response body is not json type.');
  }
}

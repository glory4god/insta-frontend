export const formatNumber = (
  n: number | string | undefined,
): string | number => {
  if (n === undefined) {
    return 0;
  }

  if (typeof n === 'string') {
    var fn = +n;
  } else {
    var fn = n;
  }
  if (fn < 10000) {
    if (fn >= 1000) {
      // 네자리수는 1,111 이런식으로 콤마 필요
      const str = fn.toString();
      return `${str.slice(0, 1)},${str.slice(1, 4)}`;
    }
    return fn;
  } else if (fn < 1000000) {
    return Math.ceil(fn / 100) / 10 + '천';
  } else {
    return Math.ceil(fn / 100000) / 10 + '백만';
  }
};

export const postFormatNumber = (n: number | string) => {
  if (typeof n === 'string') {
    var fn = +n;
  } else {
    var fn = n;
  }
  const reg = /(^[+-]?\d+)(\d{3})/;
  let str = fn + '';

  while (reg.test(str)) str = str.replace(reg, '$1' + ',' + '$2');

  return str;
};
export function pressChecker<T extends { id: string }>(
  arr: T[],
  id: string,
): boolean {
  const ids = arr.map((l) => {
    return l.id;
  }) as string[];
  // console.log(ids.includes(id));
  return ids.includes(id);
}

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

export function idInListChecker<T extends { id: string }>(
  arr: T[],
  id: string,
): boolean {
  const ids = arr.map((l) => {
    return l.id;
  }) as string[];
  // console.log(ids.includes(id));
  return ids.includes(id);
}

export function idNotInList<T extends { id: string }>(
  arr: T[],
  id: string,
): T[] {
  return arr.filter((t) => {
    if (t.id !== id) {
      return t;
    }
  });
}

export const timeConvert = (time: number | string | any) => {
  const dateTime = new Date(time);
  const milliSeconds = new Date().getTime() - dateTime.getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `${Math.floor(seconds)}초 전`;;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (new Date().getFullYear() - dateTime.getFullYear() == 0) {
    return `${dateTime.getMonth() + 1}월 ${dateTime.getDate()}일`;
  } else {
    return `${dateTime.getFullYear()}년 ${dateTime.getMonth() + 1}월 ${dateTime.getDate()}일`;
  }
}
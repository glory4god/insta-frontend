export const formatNumber = (n: number | string) => {
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

export const formatNumber = (n: number | string) => {
  if (typeof n === 'string') {
    var fn = +n;
  } else {
    var fn = n;
  }
  if (fn < 10000) {
    return fn;
  } else if (fn < 1000000) {
    return Math.ceil(fn / 100) / 10 + '천';
  } else {
    return Math.ceil(fn / 100000) / 10 + '백만';
  }
};

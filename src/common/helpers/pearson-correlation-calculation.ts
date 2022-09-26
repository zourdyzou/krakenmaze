export const pearsonCorrelation = (prefs: any, p1: number, p2: number) => {
  const si = [];

  for (const key in prefs[p1]) {
    if (prefs[p2][key]) si.push(key);
  }

  const n = si.length;

  if (n === 0) return 0;

  let sum1 = 0;
  for (let i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];

  let sum2 = 0;
  for (let j = 0; j < si.length; j++) sum2 += prefs[p2][si[j]];

  let sum1Sq = 0;
  for (let k = 0; k < si.length; k++) {
    sum1Sq += Math.pow(prefs[p1][si[k]], 2);
  }

  let sum2Sq = 0;
  for (let a = 0; a < si.length; a++) {
    sum2Sq += Math.pow(prefs[p2][si[a]], 2);
  }

  let pSum = 0;
  for (let b = 0; b < si.length; b++) {
    pSum += prefs[p1][si[b]] * prefs[p2][si[b]];
  }

  const num = pSum - (sum1 * sum2) / n;
  const den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n));

  if (den === 0) return 0;

  return num / den;
};

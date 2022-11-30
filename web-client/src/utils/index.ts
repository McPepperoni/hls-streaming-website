export const secondToString = (s: number) => {
  //   console.log(new Date(s * 1000).toISOString().slice(11));

  if (s > 3600) return new Date(s * 1000).toISOString().slice(11, -5);

  return new Date(s * 1000).toISOString().slice(14, -5);
};

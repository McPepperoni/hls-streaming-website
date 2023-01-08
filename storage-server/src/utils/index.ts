export const compareArrayOne = (arr: any[], value: any) => {
  arr.forEach((v) => {
    if (v === value) return true;
  });

  return false;
};

export const compareArrayAll = (arr: any[], value: any) => {
  arr.forEach((v) => {
    if (v !== value) return false;
  });

  return true;
};

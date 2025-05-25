const toRoman = (num: number): string => {
  const map = [
    "", // 0 (not used)
    "I", // 1
    "II", // 2
    "III", // 3
    "IV", // 4
    "V", // 5
    "VI", // 6
    "VII", // 7
    "VIII", // 8
    "IX", // 9
  ];

  return map[num];
};

export default toRoman;

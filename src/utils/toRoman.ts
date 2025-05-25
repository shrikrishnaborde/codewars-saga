const toRoman = (num: number): string => {
  const map = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  return map[num];
};

export default toRoman;

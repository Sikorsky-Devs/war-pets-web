export const getPetAge = (age?: number) => {
  if (!age) return "Вік не відомий";
  const lastDigit = parseFloat(String(age).at(-1)!);
  if (lastDigit === 1) return `${age} рік`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${age} роки`;
  return `${lastDigit} років`;
};

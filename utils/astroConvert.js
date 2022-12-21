const getAstro = (month, day) => {
  let sign = "error";

  if (month === 1 && day < 20) sign = "Capricorn";
  if (month === 1 && day > 19) sign = "Aquarius";
  if (month === 2 && day < 19) sign = "Aquarius";
  if (month === 2 && day > 18) sign = "Pisces";
  if (month === 3 && day < 21) sign = "Pisces";
  if (month === 3 && day > 20) sign = "Aries";
  if (month === 4 && day < 20) sign = "Aries";
  if (month === 4 && day > 19) sign = "Taurus";
  if (month === 5 && day < 21) sign = "Taurus";
  if (month === 5 && day > 20) sign = "Gemini";
  if (month === 6 && day < 22) sign = "Gemini";
  if (month === 6 && day > 21) sign = "Cancer";
  if (month === 7 && day < 23) sign = "Cancer";
  if (month === 7 && day > 22) sign = "Leo";
  if (month === 8 && day < 23) sign = "Leo";
  if (month === 8 && day > 22) sign = "Virgo";
  if (month === 9 && day < 23) sign = "Virgo";
  if (month === 9 && day > 22) sign = "Libra";
  if (month === 10 && day < 23) sign = "Libra";
  if (month === 10 && day > 22) sign = "Scorpio";
  if (month === 11 && day < 23) sign = "Scorpio";
  if (month === 11 && day > 22) sign = "Saggitarius";
  if (month === 12 && day < 22) sign = "Saggitarius";
  if (month === 12 && day > 21) sign = "Capricorn";

  return sign;
};

module.exports = getAstro;

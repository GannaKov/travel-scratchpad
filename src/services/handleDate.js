const monthsOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const seasonsOption = ["Winter", "Spring", "Summer", "Autumn"];

export const handleMonth = (dateBeginn, dateEnd) => {
  const monthBeginn = parseInt(dateBeginn.slice(3, 5));
  const monthEnd = parseInt(dateEnd.slice(3, 5));

  const monthArr = [];
  if (monthBeginn === monthEnd) {
    monthArr.push(monthBeginn);
  }
  if (monthBeginn < monthEnd) {
    const indBeginn = monthsOption.findIndex((num) => num === monthBeginn); //indexOf(monthBeginn);
    const indEnd = monthsOption.findIndex((num) => num === monthEnd);
    const months = monthsOption.slice(indBeginn, indEnd + 1);
    monthArr.push(...months);
  }
  if (monthBeginn > monthEnd) {
    const indBeginn = monthsOption.findIndex((num) => num === monthBeginn); //indexOf(monthBeginn);
    const indEnd = monthsOption.findIndex((num) => num === monthEnd);
    const months1 = monthsOption.slice(indBeginn);
    const months2 = monthsOption.slice(0, indEnd + 1);
    monthArr.push(...months2, ...months1);
  }

  return monthArr;
};

export const handleYear = (dateBeginn, dateEnd) => {
  const yearsArr = [];
  const yearBeginn = dateBeginn.slice(6);
  const yearEnd = dateEnd.slice(6);
  if (yearBeginn != yearEnd) {
    yearsArr.push(yearBeginn, yearEnd);
  } else {
    yearsArr.push(yearBeginn);
  }
  return yearsArr;
};

export const handleSeasons = (monthArr) => {
  const seasonsArr = [];
  if (monthArr.includes(1) || monthArr.includes(2) || monthArr.includes(12)) {
    seasonsArr.push(seasonsOption[0]);
  }
  if (monthArr.includes(3) || monthArr.includes(4) || monthArr.includes(5)) {
    seasonsArr.push(seasonsOption[1]);
  }
  if (monthArr.includes(6) || monthArr.includes(7) || monthArr.includes(8)) {
    seasonsArr.push(seasonsOption[2]);
  }
  if (monthArr.includes(9) || monthArr.includes(10) || monthArr.includes(11)) {
    seasonsArr.push(seasonsOption[3]);
  }

  return seasonsArr;
};

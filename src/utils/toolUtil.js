const getAirlineLogo = airline => {
  const formattedAirline = airline.replaceAll (' ', '');
  try {
    return `/src/assets/airlines/${formattedAirline}.png`;
  } catch (e) {
    return `/src/assets/airlines/default.png`;
  }
};

const notFilledInto = (data) => {
  if (data.length === 0) {
    return true;
  }
  for (const element of data) {
    if (element) {
      for (const key in element) {
        if (element[key] === '') {
          return true;
        }
      }
    }
  }
  return false;
};


export {getAirlineLogo, notFilledInto}
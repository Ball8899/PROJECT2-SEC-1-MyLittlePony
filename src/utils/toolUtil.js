const getAirlineLogo = airline => {
  const formattedAirline = airline.replaceAll (' ', '');
  try {
    return `/src/assets/airlines/${formattedAirline}.png`;
  } catch (e) {
    return `/src/assets/airlines/default.png`;
  }
};

export {getAirlineLogo}
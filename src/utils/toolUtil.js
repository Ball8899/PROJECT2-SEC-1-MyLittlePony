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

const checkName = (data) => {
  const value = new RegExp ('^[a-zA-Z\u0E00-\u0E7F]{1,50}$');
  return value.test(data)
}

const checkDay = (data) => {
  const date = new Date(data)
  const currentDate = new Date()

  if (date < currentDate) {
    return true
  }
}

const checkPhoneNumber = (data) => {
  const phoneRegex = new RegExp ('^(?:\\+66|0)\\d{9}$');
  return phoneRegex.test(data)
}

export {getAirlineLogo, notFilledInto, checkName, checkDay, checkPhoneNumber}
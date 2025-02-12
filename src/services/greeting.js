export const getGreetingByTime = () => {
  const hours = new Date().getHours();
  if (hours >= 0 && hours < 12) {
    return "Buenos días";
  } else if (hours >= 12 && hours < 18) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
};

exports.generateId = () => {
  let today = new Date();
  let timeForToday = Date.parse(today);

  let randomString = Math.random()
    .toString(36)
    .substring(2);

  let finalRandomString = timeForToday + randomString;

  return finalRandomString;
};

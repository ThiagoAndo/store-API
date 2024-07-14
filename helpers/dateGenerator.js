function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let currentDate = `${Number(day) < 10 ? 0 : ""}${day}-${
    Number(month) < 10 ? 0 : ""
  }${month}-${year}h${new String(new Date(Date.now()))
    .slice(15, 24)
    .replaceAll(" ", "")}`;
  return currentDate;
}
exports.getCurrentDate = getCurrentDate;

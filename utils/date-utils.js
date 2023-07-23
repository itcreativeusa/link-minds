const { format } = require("date-fns");

function dateFormat(date) {
  return format(date, "yyyy/MM/dd HH:mm");
}

module.exports = dateFormat;

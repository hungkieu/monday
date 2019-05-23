var fs = require('fs');
class Logger {
  getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "/" + month + "/" + day + "-" + hour + ":" + min + ":" + sec;
  }

  text_log(msg) {
    return `[${this.getDateTime()}] ${msg}`;
  }

  // print in console
  t(msg) {
    console.log(this.text_log(msg));
  }

  log(msg, console = true) {
    if (console) this.t(msg);
    fs.appendFile('./logs/server.log', '\n' + this.text_log(msg), err => err && this.t(err));
  }
}

module.exports = new Logger

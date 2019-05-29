class HomeController {
  index(req, res) {
    function leapYear(year) {
      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    function weekStartInMonday(day) {
      if(day == 0) return 6;
      return day - 1;
    }

    var list = [];
    var today = new Date();
    var prev_month = new Date((new Date(today)).setMonth(today.getMonth() - 1)).getMonth();
    var begin_of_month = new Date(today.getFullYear(), today.getMonth(), 1);
    var months = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(leapYear(today.getFullYear())) months[1] = 29;
    var first_index = weekStartInMonday(begin_of_month.getDay());
    for(let i = 1; i <= months[today.getMonth()]; i++) {
      list[first_index + i - 1] = i;
    }
    for(let i = 0; i < first_index; i++) {
      list[i] = months[prev_month] - first_index + i + 1;
    }
    var end_index = list.length - 1;
    for(let i = 1; i < 42 - end_index; i++) {
      list[i + end_index] = i;
    }

    res.render('home/index', {title: 'Monday', list, first_index, end_index});
  }
}

module.exports = new HomeController;

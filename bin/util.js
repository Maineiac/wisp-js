
exports.formatTime = function(seconds) {
    var r,s;
    var time = Math.floor(seconds);
    var timestr = `${time}s`;
    if (time >= 60) {
      r = time%60;
      time = Math.floor(time / 60);
      timestr = `${time}m ${r}s`;
    }
    if (time >= 60) {
      s = r;
      r = time%60;
      time = Math.floor(time / 60);
      timestr = `${time}h ${r}m ${s}s`;
    }
    return timestr;
}
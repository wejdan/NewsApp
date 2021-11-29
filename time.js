function clock() {
  

    var h = new Date().getHours();
    var m = new Date().getMinutes();
    var s = new Date().getSeconds();
    var am = "AM";

    if (h > 12) {
        h = h - 12;
        var am = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;



    $('.hours').html(h);
    $('.minutes').html(m);
    $('.seconds').html(s);
    $('.phase').html(am);



}

var interval = setInterval(clock, 1000);
var sections = [$("#landing"), $("#about"), $("#contact"), $("#login")];
var nav_sections = [$(".nav_landing"), $(".nav_about"), $(".nav_contact"), $(".nav_login")];

$(".nav_landing").click(function () {
    hideSections($("#landing"));
    updateNav(this);
});

$(".nav_about").click(function () {
    hideSections($("#about"))
    updateNav(this);
});

$(".nav_contact").click(function () {
    hideSections($("#contact"))
    updateNav(this);
});

$(".nav_login").click(function () {
    hideSections($("#login"))
    updateNav(this);
});

var updateNav = function (current) {
    for (let sect of nav_sections) {
        sect.removeClass("current_nav");
    }

    $(current).addClass("current_nav");
}

var hideSections = function (current) {
    for (let sect of sections) {
        sect.css("display", "none");
    }

    current.css("display", "flex");
}

$(".nav_landing").click();
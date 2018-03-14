var sections = [$("#dash"), $("#ads"), $("#settings")];
var nav_sections = [$(".nav_dash"), $(".nav_ads"), $(".nav_settings"), $(".nav_logout")];

$(".nav_dash").click(function () {
    hideSections($("#dash"));
    updateNav(this);
});

$(".nav_ads").click(function () {
    hideSections($("#ads"))
    updateNav(this);
});

$(".nav_settings").click(function () {
    hideSections($("#settings"))
    updateNav(this);
});

$(".nav_logout").click(function () {
    window.location.href = 'index.html';
});

$(".IS_BAD_REMOVE").click(function () {
    alert("Not working");
})

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

$(".nav_dash").click();
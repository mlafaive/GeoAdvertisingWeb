var sections = [$("#dash"), $("#ads"), $("#settings"), $("#temp-ad")];
var nav_sections = [$(".nav_dash"), $(".nav_ads"), $(".nav_settings"), $(".nav_logout"), $(".nav_temp-ad")];

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

$(".nav_temp-ad").click(function () {
    hideSections($("#temp-ad"))
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



var mixedChart = new Chart($("#ad-chart"), {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Daily Interest',
            backgroundColor: ["#0be88166", "#ef577766", "#00d8d666", "#ff5e5766", "#575fcf66"],
            hoverBackgroundColor: ["#0be881bb", "#ef5777bb", "#00d8d6bb", "#ff5e57bb", "#575fcfbb"],
            data: [25, 48, 41, 53, 72],
        }, {
            label: 'Daily Sales',
            data: [21, 40, 35, 42, 54],
            backgroundColor: ["#ffdd59aa"],
            borderColor: ["#ffa801"],
            // Changes this dataset to become a line
            type: 'line'
        }],
        labels: ['3/10', '3/11', '3/12', '3/13', '3/14']

    }

});
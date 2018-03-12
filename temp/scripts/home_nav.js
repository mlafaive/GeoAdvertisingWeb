home_page = $("#HOME")
about_page = $("#ABOUT")
instruction_page = $("#INSTRUCTIONS")
game_page = $("#GAME")

$("#l0").css("color", "white");
$("#l0").css("border-bottom-color", "white");

var hideAll = function () {
    home_page.css("display", "none");
    about_page.css("display", "none");
    instruction_page.css("display", "none");
    game_page.css("display", "none");
    $("header").css("position", "fixed");

    $("#l0").css("color", "rgba(255,255,255,.5)");
    $("#l0").css("border-bottom-color", "rgba(255,255,255,0)");

    $("#l1").css("color", "rgba(255,255,255,.5)");
    $("#l1").css("border-bottom-color", "rgba(255,255,255,0)");

    $("#l2").css("color", "rgba(255,255,255,.5)");
    $("#l2").css("border-bottom-color", "rgba(255,255,255,0)");

    $("#l3").css("color", "rgba(255,255,255,.5)");
    $("#l3").css("border-bottom-color", "rgba(255,255,255,0)");
    $("#gameFrame").remove();
}

function pageNavigation(page) {
    hideAll();
    if (page == 0) {
        home_page.css("display", "block");
        $("#l0").css("color", "white");
        $("#l0").css("border-bottom-color", "white");
    } else if (page == 1) {
        about_page.css("display", "block");
        $("#l1").css("color", "white");
        $("#l1").css("border-bottom-color", "white");
        $("header").css("position", "absolute");
    } else if (page == 2) {
        $("header").css("position", "absolute");
        instruction_page.css("display", "block");
        $("#l2").css("color", "white");
        $("#l2").css("border-bottom-color", "white");
    } else if (page == 3) {
        game_page.css("display", "block");
        $("header").css("position", "absolute");
        $("#l3").css("color", "white");
        $("#l3").css("border-bottom-color", "white");
        $('<iframe src="game.html" width="820px" height="820px" id="gameFrame"></iframe>').appendTo('#game_iframe');
    }
}

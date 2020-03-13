$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.name);
    });
});

$("#atHome").on("click", function () {
    // reroute to meetup.html
    window.location.pathname = "/viewRecipes";
    $.get("/api/post_recipe", function (data) {
        console.log(data);
    })
})

// Route 
$("#inPublic").on("click", function () {
    // reroute to meetup.html
    window.location.pathname = "/viewMeetups";
    $.get("/api/post_meetup", function (data) {
        console.log(data);
    })
})


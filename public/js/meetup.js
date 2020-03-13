$(document).ready(function () {
    $.get("/api/post_meetup", function (recipes) {
        console.log(recipes);
        // stuff to do on the page
    });

    const postMeetupForm = $("form#meetup");
    const locationInput = $("#location");
    const dateInput = $("#date");
    const timeInput = $("#time");
    const messageInput = $("#message");
    const authorInput = $("#author")

    //this needs to be the ID of the button you click when you want to drink inPublic
    const inPublic = $("#inPublic");


    // // On click of the "At home", pulls the data from the api-route for all the meetups
    // inPublic.on("click", function (event) {
    //     event.preventDefault();
    //     $.get("/api/post_meetup", function (meetups) {
    //         console.log(meetups);
    //     });

    // })

    postMeetupForm.on("submit", function (event) {
        event.preventDefault();
        console.log("meetup.js is working");
        const meetupData = {
            location: locationInput.val().trim(),
            date: dateInput.val().trim(),
            time: timeInput.val().trim(),
            message: messageInput.val().trim(),
            author: authorInput.val().trim(),
        };

        // I don't think we need this?...but we're running with it!
        if (!meetupData.location || !meetupData.date || !meetupData.time || !meetupData.message || !meetupData.author) {
            return;
        }


        // If we have all appropriate data, run the postRecipe function
        postMeetup(meetupData.location, meetupData.date, meetupData.time, meetupData.message, meetupData.author);
        locationInput.val("");
        dateInput.val("");
        timeInput.val("");
        messageInput.val("");
        authorInput.val("");

    });

    //Function that posts user recipe
    function postMeetup(location, date, time, message, author) {
        $.post("/api/post_meetup", {
            location: location,
            date: date,
            time: time,
            message: message,
            author: author
        })
            .then(function (data) {
                // Need to change route to where ever we want users redirected after meetup has been posted
                window.location.replace("/viewMeetups.html");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
        // .catch(handleLoginErr);  
    }

})
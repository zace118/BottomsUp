$(document).ready(function () {
    const postMeetupForm = $("form#meetup");
    const locationInput = $("#location");
    const dateInput = $("#date");
    const timeInput = $("#time");
    const messageInput = $("#message");

    //this needs to be the ID of the button you click when you want to drink inPublic
    const inPublic = $("#inPublic");

    // On click of the "At home", pulls the data from the api-route for all the meetups
    inPublic.on("click", function (event) {
        event.preventDefault();
        $.get("/api/post_meetup", function (data) {
            meetups = data;
            console.log(meetups)
        });

    })

    postMeetupForm.on("submit", function (event) {
        event.preventDefault();
        const meetupData = {
            location: locationInput.val().trim(),
            date: dateInput.val().trim(),
            time: timeInput.val().trim(),
            message: messageInput.val().trim()
        };

        // I don't think we need this?...but we're running with it!
        if (!meetupData.location || !meetupData.date || !meetupData.time || !meetupData.message) {
            return;
        }


        // If we have all appropriate data, run the postRecipe function
        postMeetup(meetupData.location, meetupData.date, meetupData.time, meetupData.message);
        locationInput.val("");
        dateInput.val("");
        timeInput.val("");
        messageInput.val("");

    });

    //Function that posts user recipe
    function postMeetup(location, date, time, message) {
        $.post("/api/post_recipe", {
            location: location,
            date: date,
            time: time,
            message: message
        })
            .then(function (data) {
                // Need to change route to where ever we want users redirected after meetup has been posted
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

})
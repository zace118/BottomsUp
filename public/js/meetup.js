$(document).ready(function () {
    $.get("/api/post_meetup", function (meetups) {
        console.log(meetups);
        if (meetups.length < 10) {
            for (let i = meetups.length - 1; i >= 0; i--) {
                console.log("if console.log: " + meetups.length);

                let whereData = meetups[i].location;
                let dataDate = meetups[i].date;
                let dataTime = meetups[i].time;
                let whenData = `${dataDate}, ${dataTime}`;
                let whoData = meetups[i].author;
                let whatData = meetups[i].message;

                //Generates the div tag to begin creating the cards.
                const parentDiv = $("<div>");
                // Adds class and ID to parentDiv
                parentDiv
                    .addClass("card")
                    .attr("id", "meetup" + i);
                // .attr("style", "width:13rem;");


                // Generates the h2 tag for the location
                const hTwo = $("<h2><b>Where: </b></h2>");
                //Adds #where
                hTwo.attr("id", "where" + i);

                // Generates the h5 tag for the date and time
                const hFive = $("<h5><b>When: </b></h5 > ");
                //Adds #when
                hFive.attr("id", "when" + i);

                // Generates the p tag for the message
                const pMessage = $("<p><b>What: </b></p > ");
                // Adds #what
                pMessage.attr("id", "what" + i);

                // Generates the p tag for the author
                const pAuthor = $("<p><b>Posted by: </b></p > ");
                // Adds #who
                pAuthor.attr("id", "who" + i);




                // Creating the card dynamically
                $(parentDiv).append(hTwo).append(hFive).append(pMessage).append(pAuthor);

                // Appending the cards to the .leftcolumn in the html
                $(".leftcolumn").append(parentDiv);

                // Pasting all the info onto the cards, dynamically
                $("#where" + i).append(whereData);
                $("#when" + i).append(whenData);
                $("#what" + i).append(whatData);
                $("#who" + i).append(whoData);
            }
        }
        else {
            for (let i = meetups.length - 1; i > meetups.length - 10; i--) {
                console.log("else console.log: " + meetups[i]);
                let dataLocation = meetups[i].location;
                let dataDate = meetups[i].date;
                let dataTime = meetups[i].time;
                let dataMessage = meetups[i].message;
                let dataAuthor = meetups[i].author;
            }

        }
    });

    const postMeetupForm = $("form#meetup");
    const locationInput = $("#location");
    const dateInput = $("#date");
    const timeInput = $("#time");
    const messageInput = $("#message");
    const authorInput = $("#author")



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
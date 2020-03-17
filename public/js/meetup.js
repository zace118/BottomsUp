$(document).ready(function () {
    $.get("/api/post_meetup", function (meetups) {
        if(meetups.length == 0) { 
                const parentDiv = $("<div>There are no current Meetups</div>");
                
                parentDiv
                    .addClass("card")
                
                $(".leftcolumn").append(parentDiv);

            
        
        }

        else {
        // This if statement will only post the most recent 10
        for (let i = meetups.length - 1; i >= 0; i--) {
            if (meetups[i].date >= moment().format('L')) {
                
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


                // Generates the p tag for the message
                const whatGen = $("<h3><b>What: </b></h3> ");
                // Adds #what
                whatGen.attr("id", "what" + i);

                // Generates the h5 tag for the date and time
                const whenGen = $("<h3><b>When: </b></h3> ");
                //Adds #when
                whenGen.attr("id", "when" + i);

                // Generates the h2 tag for the location
                const whereGen = $("<h3><b>Where: </b></h3>");
                //Adds #where
                whereGen.attr("id", "where" + i);

                // Generates the p tag for the author
                const whoGen = $("<h3><b>Posted by: </b></h3> ");
                // Adds #who
                whoGen.attr("id", "who" + i);




                // Creating the card dynamically
                $(parentDiv).append(whatGen).append(whereGen).append(whenGen).append(whoGen);

                // Appending the cards to the .leftcolumn in the html
                $(".leftcolumn").append(parentDiv);
                $(".leftcolumn").append(`<button meetup=${meetups[i].id} type="button" class="btn btn-danger addcomment" data-toggle="modal" data-target="#staticBackdrop">
                Add Comment
              </button>`)

              // call the db for all the comments
              //loop the comments adding after the button

              $.get("/api/comment/" + meetups[i].id).then(function(comments){
                  console.log("back comments: ", comments)
                 
                  $("#meetup"+i).append(`<div class=comments>Comments:</div>`)
                  comments.map(c=>{
                  $("#meetup"+i).append(`<h6>${c.message} - ${c.author}</h6>`)
                  })
              })

                // Pasting all the info onto the cards, dynamically
                $("#where" + i).append(whereData);
                $("#when" + i).append(whenData);
                $("#what" + i).append(whatData);
                $("#who" + i).append(whoData);

                $(".addcomment").on("click", function(){
                    var meetupId = $(this).attr("meetup")
                    $("#submitComment").attr("meetupid", meetupId)
                })

               

            }
        
    
        else {
           
                
                const parentDiv = $("<div>There are no current Meetups");
                
                parentDiv
                    .addClass("card")
                
                $(".leftcolumn").append(parentDiv);

            
        }
        }
    }
    });


    $("#submitComment").on("click", function(){
        var newC ={
            message: $("#messageComment").val(),
            author: $("#authorComment").val(), 
        }
        var meetupId = $(this).attr("meetupid")
        // create the comment in the db
        // id meetup and the name and the comment 
        // ajax call 
        $.ajax({
            method:"POST",
            url:"/api/comment/" + meetupId,
            data: newC
        }).then(function(data){
            console.log("i am back", data)
           // $('.modal').modal('toggle')
            location.reload()
         // call render the comments
        })
  
    })

    // ------------The next half of the main function------------
    // Setting variables with jQuery grabbing certain elements on the HTML page
    const postMeetupForm = $("form#meetup");
    const locationInput = $("#location");
    const dateInput = $("#date");
    const timeInput = $("#time");
    const messageInput = $("#message");
    const authorInput = $("#author")


    // On click function of the submit button that creates the object of informatino that we'll need for line 150, inputting each as an argument of the function
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
    }

});
$(document).ready(function () {
    $.get("/api/post_recipe", function (recipes) {
        console.log(recipes);

        // This if statement will only post the most recent 10
        if (recipes.length < 10) {
            for (let i = recipes.length - 1; i >= 0; i--) {
                console.log("if console.log: " + recipes.length);
                let titleData = recipes[i].title;
                let spiritData = recipes[i].spirit;
                let recipeData = recipes[i].recipe;
                let authorData = recipes[i].author;

                //Generates the div tag to begin creating the cards.
                const parentDiv = $("<div>");
                // Adds class and ID to parentDiv
                parentDiv
                    .addClass("card")
                    .attr("id", "recipe" + i);
                // .attr("style", "width:13rem;");


                // Generates the h1 tag for the drink name/title
                const nameGen = $("<h3><b>Drink name: </b></h3>");
                //Adds #drinkName
                nameGen.attr("id", "drinkName" + i);

                // Generates the h3 tag for the spirit type
                const spiritGen = $("<h3><b>Spirit type: </b></h3> ");
                //Adds #spiritType
                spiritGen.attr("id", "spiritType" + i);

                // Generates the h3 tag for the recipe
                const recipeGen = $("<h3><b>Recipe: </b></h3> ");
                // Adds #recipeBody
                recipeGen.attr("id", "recipeBody" + i);

                // Generates the h3 tag for the author
                const authorGen = $("<h3><b>Posted by: </b></h3>");
                // Adds #author
                authorGen.attr("id", "author" + i);




                // Creating the card dynamically
                $(parentDiv).append(nameGen).append(authorGen).append(spiritGen).append(recipeGen);

                // Appending the cards to the .leftcolumn in the html
                $(".leftcolumn").append(parentDiv);

                // Pasting all the info onto the cards, dynamically
                $("#drinkName" + i).append(titleData);
                $("#spiritType" + i).append(spiritData);
                $("#recipeBody" + i).append(recipeData);
                $("#author" + i).append(authorData);

            }
        }
        // If there are more than 10 objects in the recipes array, it will only post the most recent 10
        else {
            for (let i = recipes.length - 1; i > recipes.length - 11; i--) {
                console.log("else console.log: " + recipes.length);
                let titleData = recipes[i].title;
                let spiritData = recipes[i].spirit;
                let recipeData = recipes[i].recipe;
                let authorData = recipes[i].author;

                //Generates the div tag to begin creating the cards.
                const parentDiv = $("<div>");
                // Adds class and ID to parentDiv
                parentDiv
                    .addClass("card")
                    .attr("id", "recipe" + i);
                // .attr("style", "width:13rem;");


                // Generates the h1 tag for the drink name/title
                const nameGen = $("<h3><b>Drink name: </b></h3>");
                //Adds #drinkName
                nameGen.attr("id", "drinkName" + i);

                // Generates the h3 tag for the spirit type
                const spiritGen = $("<h3><b>Spirit type: </b></h3> ");
                //Adds #spiritType
                spiritGen.attr("id", "spiritType" + i);

                // Generates the h3 tag for the recipe
                const recipeGen = $("<h3><b>Recipe: </b></h3> ");
                // Adds #recipeBody
                recipeGen.attr("id", "recipeBody" + i);

                // Generates the h3 tag for the author
                const authorGen = $("<h3><b>Posted by: </b></h3>");
                // Adds #author
                authorGen.attr("id", "author" + i);




                // Creating the card dynamically
                $(parentDiv).append(nameGen).append(authorGen).append(spiritGen).append(recipeGen);

                // Appending the cards to the .leftcolumn in the html
                $(".leftcolumn").append(parentDiv);

                // Pasting all the info onto the cards, dynamically
                $("#drinkName" + i).append(titleData);
                $("#spiritType" + i).append(spiritData);
                $("#recipeBody" + i).append(recipeData);
                $("#author" + i).append(authorData);
            }
        }
    });

    const postRecipeForm = $("form#recipe");
    const drinkNameInput = $("#drinkName");
    const recipeInput = $("#recipeBody");
    const spiritInput = $("#category");
    const authorInput = $("#author")


    postRecipeForm.on("submit", function (event) {
        event.preventDefault();
        console.log("recipe.js is working");
        const recipeData = {
            title: drinkNameInput.val().trim(),
            recipe: recipeInput.val().trim(),
            spirit: spiritInput.val().trim(),
            author: authorInput.val().trim()
        };


        if (!recipeData.title || !recipeData.recipe || !recipeData.spirit || !recipeData.author) {
            return;
        }


        // If we have all appropriate data, run the postRecipe function
        postRecipe(recipeData.title, recipeData.recipe, recipeData.spirit, recipeData.author);
        drinkNameInput.val("");
        recipeInput.val("");
        spiritInput.val("");
        authorInput.val("");
    });

    //Function that posts user recipe
    function postRecipe(title, recipe, spirit, author) {
        $.post("/api/post_recipe", {
            title: title,
            recipe: recipe,
            spirit: spirit,
            author: author
        })
            .then(function (data) {
                // Need to change route to where ever we want users redirected after recipe has been posted
                window.location.replace("/viewRecipes.html");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
        // .catch(handleLoginErr);
    }
});

$(document).ready(function () {
    const postRecipeForm = $("form#recipe");
    const drinkNameInput = $("#drinkName");
    const recipeInput = $("#recipeBody");
    const spiritInput = $("#category");

    //this needs to be the ID of the button you click when you want to drink at home
    const atHome = $("#atHome");

    // On click of the "At home", pulls the data from the api-route for all recipes
    atHome.on("click", function (event) {
        event.preventDefault();
        $.get("/api/post_recipe", function (data) {
            recipes = data;
            console.log(recipes)
        });

    })

    postRecipeForm.on("submit", function (event) {
        event.preventDefault();
        const recipeData = {
            title: drinkNameInput.val().trim(),
            recipe: recipeInput.val().trim(),
            spirit: spiritInput.val().trim()
        };

        // I don't think we need this?...but we're running with it!
        if (!recipeData.title || !recipeData.recipe || !recipeData.spirit) {
            return;
        }


        // If we have all appropriate data, run the postRecipe function
        postRecipe(recipeData.title, recipeData.recipe, recipeData.spirit);
        drinkNameInput.val("");
        recipeInput.val("");
        spiritInput.val("");
    });

    //Function that posts user recipe
    function postRecipe(title, recipe, spirit) {
        $.post("/api/post_recipe", {
            title: title,
            recipe: recipe,
            spirit: spirit
        })
            .then(function (data) {
                // Need to change route to where ever we want users redirected after recipe has been posted
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

})
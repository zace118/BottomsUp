$(document).ready(function () {
    const postRecipeForm = $("form#recipe");
    const drinkNameInput = $("#drinkName");
    const recipeInput = $("#recipeBody");
    const spiritInput = $("#category");

    // When the signup button is clicked, we validate the email and password are not blank
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
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

})
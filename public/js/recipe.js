$(document).ready(function () {
    $.get("/api/post_recipe", function (recipes) {
        console.log(recipes);
        // stuff to do on the page
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

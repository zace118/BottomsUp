// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
        db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(function() {
                res.redirect(307, "/api/login");
            })
            .catch(function(err) {
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.user.name,
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    // Route for posting a recipe to the database
    // app.post("/api/post_recipe", passport.authenticate("local"), function (req, res) {
    app.post("/api/post_recipe", function(req, res) {

        // console.log(req.body);
        // console.log(db.user);
        db.SubmitRecipe.create({
            title: req.body.title,
            recipe: req.body.recipe,
            spirit: req.body.spirit,
            author: req.body.author
        }).then(function(dbPost) {
            // return the result to the user with res.json
            res.json(dbPost);
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    // Route for posting a meetup to the database
    app.post("/api/post_meetup", function(req, res) {
        // console.log(req.body);
        // console.log(db.user);
        db.SubmitMeetup.create({
            location: req.body.location,
            date: req.body.date,
            time: req.body.time,
            message: req.body.message,
            author: req.body.author
        }).then(function(dbPost) {
            // return the result to the user with res.json
            res.json(dbPost);
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    // Route for posting a meetup to the database
    app.post("/api/comment/:id", function(req, res) {

        console.log("POST COMMENT: ", req.params, req.body);
        // console.log(db.user);
        db.SubmitComment.create({
            message: req.body.message,
            author: req.body.author,
            SubmitMeetupId: parseInt(req.params.id)
        }).then(function(dbComment) {
            console.log(dbComment)
                // return the result to the user with res.json
            res.json(dbComment);
        }).catch(function(err) {
            console.log(err)
            res.status(401).json(err);
        });
    });

    // Route for getting the user data
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's name, email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.user.name,
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    // Route for getting the all the posted recipes data
    // app.get("/api/post_recipe", passport.authenticate("local"), function (req, res) {
    app.get("/api/post_recipe", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.SubmitRecipe.findAll({}).then(function(recipe) {
            console.log(recipe);
            // We have access to the todos as an argument inside of the callback function
            res.json(recipe);
        });
    });

    // app.get("/api/post_meetup", passport.authenticate("local"), function (req, res) {
    app.get("/api/post_meetup", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.SubmitMeetup.findAll({}).then(function(meetup) {
            console.log(meetup);
            // We have access to the todos as an argument inside of the callback function
            res.json(meetup);
        });
    });
    // app.get("/api/post_meetup", passport.authenticate("local"), function (req, res) {
    app.get("/api/comment/:id", function(req, res) {
        console.log("comment get", req.params)
        // findAll returns all entries for a table when used with no options
        db.SubmitComment.findAll({ where: { SubmitMeetupId: req.params.id } }).then(function(comments) {
            console.log(comments.dataValues);
            // We have access to the todos as an argument inside of the callback function
            res.json(comments);
        });
    });
};
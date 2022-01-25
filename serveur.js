let express = require("express");

let app = express();

let bodyParser = require("body-parser");

let session = require("express-session");

// Moteur de template

app.set("view  engine", "ejs");

// Routes

app.get("/", (request, response) => {
  let message = require("./models/message");

  message.all(function (messages) {
    response.render("pages/index.ejs", { messages: messages });
  });

  //console.log(request.session)
});

app.post("/", (request, response) => {
  if (request.body.message === undefined || request.body.message === "") {
    request.resultat("error", "vous n'avez pas posté de message");

    response.redirect("/");
  } else {
    message.create(request.body.message, function () {
      request.flash("success", "merci");

      response.redirect("/");
    });
  }
});

app.get("/resultat/:id", (request, response) => {
  let message = require(".dashboard");

  message.find(request.params.id, function (message) {
    response.render("./", { message: message });
  });
});

app.listen(4000);
